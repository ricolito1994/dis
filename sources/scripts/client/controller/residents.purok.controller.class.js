import { Modal } from "../classes/modal.controller.class.js"
import { DataTableService } from "../classes/datatable.service.class.js";
import { ServerRequest } from "../classes/serverrequest.service.class.js";
import { LoadingModal } from "./loading.modal.controller.class.js";
import { SearchModal } from "./search.modal.controller.class.js";
import { PurokModalController } from "./purok.modal.controller.class.js"

export class ResidentsPurokController extends Modal {
	
	constructor ( modalData ){
		super ( modalData );
		this.brgyname = session_data.BARANGAY_NAME;
		this.PRK_NAME = "";
		this.PRK_LEADER = "";
		this.PRK_LEADER_NAME = "";
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
					head : "PUROK",
					elements : [
						{
							createElement : "span",
							attributes : [
								{
									attribute : "innerText",
									value : ( selData ) => {
										return selData['PRK_NAME'];
									},
								}
							]
						}
					]
				},
				{
					head : "PRK LEADER",
					sort : {
						asc : ['PRK_LEADER_NAME'],
						dsc : ['-PRK_LEADER_NAME'],
					},
					sortBy : 'asc',
					elements : [
						{
							createElement : "b",
							attributes : [
								{
									attribute : "innerText",
									value : ( selData ) => {
										
										return `${selData['PRK_LEADER_NAME']}`;
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
									value : ( args ) => {
										//this.openitem(arg);
										//this.openwarehouse(arg);
										this.openPurok(args);
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
	
	onUpdateTable(){
		this.changeFilter()
	}
	
	openPurok(args){
		console.log(args)
		let usm = new PurokModalController({
			modalID :  "purok-modal",
			controllerName : "PurokModalController",
			template : "/dis/sources/templates/modal/purok.modal.template.html",
			parent : this,
			isUpdate : args.PRK_ID ? true : false,
			args : args.PRK_ID ? args : {},
			//instanceID : this.mainService.generate_id_timestamp("res"),
			onSearchEvent : `${this.controllerName}:onUpdateTable`,
		});
		usm.render();
	}
	
	onLinkPL ( arg ){
		let args =arg.detail.query;
		this.PRK_LEADER = args.RESIDENT_ID
		this.PRK_LEADER_NAME = args.FULLNAME;
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		this.init();
		args.modal.onClose();
	}
	
	removePurokLeader(){
		this.PRK_LEADER = ``
		this.PRK_LEADER_NAME = ``;
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		this.init();
	}
	
	choosePurokLeader( arg ){
		let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/dis/sources/templates/modal/search.modal.template.html",
			params : {
				type :  'resident',
				action : 'link',
				controller : this.controllerName,
				evt : ':onLinkPL',
				//arg : args,
			},
			instanceID : this.mainService.generate_id_timestamp("sm"),
			parent : this,
		});
		ssm.render();
	}
	
	init(){
		//console.log(this.PRK_NAME)
		let dataQuery = {
			type: "POST",
			url : this.mainService.urls["generic"].url,
			data : {
				data : {
					request : 'generic',
					REQUEST_QUERY : [
						{
							sql : `SELECT *,IF(CONCAT(RES.FIRSTNAME,' ',RES.LASTNAME) IS NOT NULL , CONCAT(RES.FIRSTNAME,' ',RES.LASTNAME) , '-') PRK_LEADER_NAME FROM 
									dis.barangay_prk_setup PRK LEFT JOIN dis.barangay_res_setup  RES ON RES.RESIDENT_ID = PRK.PRK_LEADER 
									WHERE PRK.PRK_NAME LIKE ?`+(this.PRK_LEADER !== ''?` and PRK.PRK_LEADER = ? ` : '')+`order by PRK.ID desc`,
							db : 'DB',
							query_request : 'GET',
							index : 'result',
							values : 
								this.PRK_LEADER !== '' ? [`%${this.PRK_NAME}%`,`${this.PRK_LEADER}`] : [`%${this.PRK_NAME}%`]
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
			
			},300);
		} 
		, ( res ) => {
			//err
			console.log(res);
		});	
	}

}
	