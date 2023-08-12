import { Modal } from "../classes/modal.controller.class.js"
import { DataTableService } from "../classes/datatable.service.class.js";
import { ServerRequest } from "../classes/serverrequest.service.class.js";
import { LoadingModal } from "./loading.modal.controller.class.js";
import { SearchModal } from "./search.modal.controller.class.js";
import { MainService } from "../classes/main.service.class.js";

export class PurokModalController extends Modal {
	
	constructor ( modalData ){
		super ( modalData );
		this.brgyname = session_data.BARANGAY_NAME;
		this.tenYearsAgo = this.mainService.minusDays(this.mainService.getCurrentDate(),3650)
		this.isUpdate = this.modalData.isUpdate;	
		this.PRK_LEADER_NAME = this.modalData.args.ID ? this.modalData.args.PRK_LEADER_NAME  : "";
		this.RESIDENT_PRK_LD_ID = this.modalData.args.PRK_LEADER ? this.modalData.args.PRK_LEADER : "";
		this.IS_PRK_LEADER = 1;
		this.prkvars = {
			PRK_NAME : "",
			PRK_ID : this.mainService.makeid(15),
			PRK_LEADER : '',
		}
	
		//console.log(modalData);
		
		for (let md in this.prkvars){
			let sel = this.modalData.args[md];
			if (sel){
				this.prkvars[md] = sel;
			}
		}
	
	}
	
	constructs(){
	}
	
	viewMember( arg ){
	}
	
	init(){
	}
	
	searchPrkLeader( ){
		let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/bps/sources/templates/modal/search.modal.template.html",
			params : {
				type : 'resident',
				action : 'link',
				controller : this.controllerName,
				evt : ':onSelectPrkLeader',
				//arg : args,
			},
			instanceID : this.mainService.generate_id_timestamp("md"),
			parent : this,
		});
		ssm.render();
	}
	
	onSelectPrkLeader ( ...args ) {
		let res = args[0].detail.query;
		this.prkvars.PRK_LEADER = res.RESIDENT_ID;
		this.RESIDENT_PRK_LD_ID = res.RESIDENT_ID;
		this.PRK_LEADER_NAME = `${res.FULLNAME}`;
		this.IS_PRK_LEADER = 1;
		res.modal.onClose();
		//this.binds(this.controllerName,`#${this.modalID}`);
		this.bindChildObject ( this , false );
	}
	
	removePrkLeader(){
		this.prkvars.PRK_LEADER = ``;
		this.PRK_LEADER_NAME = ``;
		this.IS_PRK_LEADER = 0;
		//this.binds(this.controllerName,`#${this.modalID}`);
		this.bindChildObject ( this , false );
	}
	
	changebox(){
		this.bindChildObject(this,this.elem);
	}
	
	
	save(){
		this.bindChildObject(this,true);
		let saveparams = ( ServerRequest.queryBuilder( this.mainService.object2array(this.prkvars) , this.isUpdate ? "UPDATE" : "INSERT" ) );
		//console.log(saveparams)
		
		let sql1 = !this.isUpdate ? `INSERT INTO barangay_prk_setup ${saveparams.initial} VALUES ${saveparams.seconds}` :
									`UPDATE barangay_prk_setup ${saveparams.initial} where PRK_ID = "${this.prkvars.PRK_ID}"`;
		let sql2 = `UPDATE dis.barangay_res_setup SET IS_PRK_LEADER = ? WHERE RESIDENT_ID = ?`;
		
		
		let dataQuery = {
			type: "POST",
			url : this.mainService.urls["generic"].url,
			data : {
				data : {
					request : 'generic',
					REQUEST_QUERY : [
						
						{
							sql : sql1,
							db : 'DB',
							query_request : "INSERT",
							values : saveparams.values
						},	
						{
							sql : sql2,
							db : 'DB',
							query_request : "UPDATE",
							values : [this.IS_PRK_LEADER, this.RESIDENT_PRK_LD_ID]
						},	
					]
				}
						
			}
			
		};
		//console.log(this.isUpdate)
		this.mainService.serverRequest( dataQuery , ( res ) => {
			MainService.EventObject[this.modalData.parent.controllerName].dispatch (`${this.modalData.onSearchEvent}` , {
				detail : {
					query : {
							
					}
				} 
			});
			this.onClose();
		} 
		, ( err ) => {
			//err
			console.log(err)
		});	
		
	}
	
}