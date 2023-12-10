import { Modal } from "../classes/modal.controller.class.js"
import { DataTableService } from "../classes/datatable.service.class.js";
import { ServerRequest } from "../classes/serverrequest.service.class.js";
import { LoadingModal } from "./loading.modal.controller.class.js";
import { SearchModal } from "./search.modal.controller.class.js";
import { ResidentsModalController } from "./residents.modal.controller.class.js";

export class ResidentsSectionController extends Modal {
	
	constructor ( modalData ){
		super ( modalData );
		this.brgyname = session_data.BARANGAY_NAME;
		this.fullname = "";
		this.address = "";
		this.isFamilyLeader = "";
		this.familyLeader = {
			id : "",
			fname : "",
		}
		this.purok = {
			id : "",
			name : "",
		}
	}
	
	onLinkPurok( arg ){
		let args = arg.detail.query;
		this.purok.id = args.PRK_ID;
		this.purok.name = args.PRK_NAME;
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		this.init();
		args.modal.onClose();
	}
	
	onLinkFL ( arg ){
		let args =arg.detail.query;
		this.familyLeader.id = args.RESIDENT_ID;
		this.familyLeader.fname = args.FULLNAME;
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		this.init();
		args.modal.onClose();
		
	}
	
	removePrk(){
		this.purok.id = "";
		this.purok.name = "";
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		this.init();
	}
	
	removeFml(){
		this.familyLeader.id = "";
		this.familyLeader.fname = "";
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		this.init();
	}
	
	choosePurok( arg ){
		let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/dis/sources/templates/modal/search.modal.template.html",
			params : {
				type : "purok",
				action : 'link',
				controller : this.controllerName,
				evt : ':onLinkPurok',
				//arg : args,
			},
			instanceID : this.mainService.generate_id_timestamp("sm"),
			parent : this,
		});
		ssm.render();
	}
	
	chooseFamilyLeader( arg ){
		let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/bps/sources/templates/modal/search.modal.template.html",
			params : {
				type :  'resident_leader',
				action : 'link',
				controller : this.controllerName,
				evt : arg.onevt ? arg.onevt : ':onLinkFL',
				//arg : args,
				
			},
			instanceID : this.mainService.generate_id_timestamp("sm"),
			parent : this,
		});
		ssm.render();
	}
	
	constructs(){
		this.dataTable = new DataTableService({
			template : "/dis/sources/templates/section/datatable.template.section.html",
			controller : this,
			controllername : this.controllerName,
			tableID : "dttable",
			service : this.mainService,
			parentDiv : ".resident-table-container",
			filterElems : [],
			fields : [
				{
					head : "IMAGE",
					elements : [
						{
							createElement : "img",
							attributes : [
								{
									attribute : "src",
									value : ( selData ) => {
										//console.log(selData);
										if (selData['ITEM_IMAGE']=='')
											return '/dis/sources/images/prof.jpg';
										else
											return selData['ITEM_IMAGE'];
									},
								},
								{
									attribute : "style",
									value : ( selData ) => {
										return "width:10%;border:1px solid #ccc;";
									},
								}
								
							]
						}
					]
				},
				{
					head : "FULLNAME",
					sort : {
						asc : ['emplast'],
						dsc : ['-emplast'],
					},
					sortBy : 'asc',
					elements : [
						{
							createElement : "b",
							attributes : [
								{
									attribute : "innerText",
									value : ( selData ) => {
										return `${selData['FIRSTNAME']} ${selData['LASTNAME']} ${selData['MIDDLENAME']}`;
									},
								}
							]
						}
					]
				},
				{
					head : "ADDRESS",
					elements : [
						{
							createElement : "span",
							attributes : [
								{
									attribute : "innerText",
									value : ( selData ) => {
										return selData['ADDRESS'];
									},
								}
							]
						}
					]
				},
				
				
				{
					head : "ACTION",
					elements : [
						{	
							createElement : "a",
							attributes : [
								{
									attribute: "href",
									value : "javascript:void(0);",
								},
								{
									attribute: "className",
									value : "btn btn-primary",
								},
								{
									type : "event",
									attribute : "click",
									value : ( argss ) => {
										//this.openitem(arg)
										let dataQuery = {
											type: "POST",
											url : this.mainService.urls["generic"].url,
											data : {
												data : {
													request : 'generic',
													REQUEST_QUERY : [
														{
															sql : `select  RS.FULLNAME,RS.RESIDENT_ID,RS.BIRTHDAY from dis.barangay_res_setup RS
																	where RS.HH_LEADER = ?`,
															db : 'DB',
															index : 'hh_members',
															query_request : "GET",
															values : [argss.RESIDENT_ID]
														},	
														{
															sql : `select * from barangay_prk_setup where PRK_ID = ?`,
															db : 'DB',
															index : 'prk',
															query_request : "GET",
															values : [argss.PUROK]
														},
														{
															sql : `select FULLNAME,HH_LEADER,RESIDENT_ID from barangay_res_setup where RESIDENT_ID = ?`,
															db : 'DB',
															index : 'hh_leader',
															query_request : "GET",
															values : [argss.HH_LEADER]
														},
														
													]
												}	
											}
											
										};
										//console.log(dataQuery)
										this.mainService.serverRequest( dataQuery , ( res ) => {
											setTimeout ( ( ) =>{
												let hhmems = JSON.parse(res);
												console.log(hhmems)
												argss['hh_members'] = hhmems['hh_members'];
												if ( hhmems['prk'][0] )
													argss['PUROK_NAME'] = hhmems['prk'][0]['PRK_NAME'];
												if ( hhmems['hh_leader'][0] )
													argss['hh_leader'] = hhmems['hh_leader'][0]['FULLNAME'];
												this.openResidentModal(argss);	
											},100);
										},err=>{
												
										});
										
									},
								}
							],
							children : [
								{
									createElement : "i",
									attributes : [
										{
											attribute: "className",
											value : "icon-search",
										}
									]
								}
							]
						},
						{	
							createElement : "span",
							attributes:[
								{
									attribute:"innerHTML",
									value : "&nbsp;"
								}
							]
						},
						
						{	
							createElement : "span",
							attributes:[
								{
									attribute:"innerHTML",
									value : "&nbsp;"
								}
							]
						},
						
					]
				},
			],

		});
		this.init();
	}
	
	changeFilter(){
		this.bindChildObject(this,this.elem);
		this.init();
	}
	
	openResidentModal( args ){
		let nl = new ResidentsModalController({
			modalID :  "residents-modal",
			controllerName : "ResidentsModalController",
			template : "/dis/sources/templates/modal/residents.modal.template.html",
			parent : this,
			isUpdate : !args.ID ? false : true,
			args : args.ID ? args : {},
			onSearchEvent : `${this.controllerName}:onUpdateResidents`,
		});
		nl.render();
	}
	
	onUpdateResidents( arg ){
		//console.log("WEW");
		this.changeFilter();
	}
	
	init(){
		//console.log(this.familyLeader.id)
		let valsQuery = [
			'%'+this.fullname+'%',
			'%'+this.address+'%',
		];
		
		if ( this.isFamilyLeader !== "" )
			valsQuery.push ( this.isFamilyLeader )
		
		if ( this.purok.id !== "" )
			valsQuery.push ( this.purok.id )
		
		if ( this.familyLeader.id !== "" )
			valsQuery.push ( this.familyLeader.id )
		
		
		let dataQuery = {
			type: "POST",
			url : this.mainService.urls["generic"].url,
			data : {
				data : {
					request : 'generic',
					REQUEST_QUERY : [
						{
							sql : `SELECT * FROM dis.barangay_res_setup w WHERE CONCAT(LASTNAME,' ',FIRSTNAME,' ',MIDDLENAME) LIKE ? and w.ADDRESS like ?`+
								   ( ( this.isFamilyLeader !== "" ) ? ` and w.IS_FAMILY_LEADER = ?` : "") +
								   ( ( this.purok.id !== "" ) ? ` and w.PUROK = ?` : "") +
								   ( ( this.familyLeader.id !== "" ) ? ` and w.HH_LEADER = ?` : "") +
								   ` ORDER BY w.ID ASC `
								   ,
							db : 'DB',
							query_request : 'GET',
							index : 'result',
							values : valsQuery,
						},	
					]
				}
						
			}
		};
		
		this.mainService.serverRequest( dataQuery , ( res ) => {
			
			setTimeout( ( ) => {
				let stds = (JSON.parse(res))['result'];
				
				let d = stds.length >= 130 ? 130 : Math.round( stds.length / 1 );
				console.log(stds);
				this.dataTable.setTableData(stds);
				
				this.dataTable.setPaginateCtr(d);
				this.dataTable.construct();
				//load.onClose();
			
			},110);
		} 
		, ( res ) => {
			//err
			console.log(res);
		});	
	}
}