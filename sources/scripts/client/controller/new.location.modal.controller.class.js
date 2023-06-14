import { Modal } from "../classes/modal.controller.class.js";
import { SearchModal } from "./search.modal.controller.class.js";
import { MainService } from "../classes/main.service.class.js";
export class NewLocationModalController extends Modal{

	constructor ( modalData ){
		super ( modalData );
		this.LAT = this.modalData.args.POS.LAT;
		this.LNG = this.modalData.args.POS.LNG;
		this.IS_UPDATE = false;
		this.LOC_TYPE = "HH";
		this.LOC_NAME = "";
		this.LOC_CHART = {
			HH : {
				icon : '🏠',
				search : 'household',
			},
			B: {
				icon : '🏬',
				search : 'business',
			},
			H: {
				icon : '🏥',
				search : 'establishment',
			},
			S: {
				icon : '🏫',
				search : 'establishment',
			},
			P: {
				icon : '🅿',
				search : 'purok',
			}
		}
	}
	
	searchNames (){
		
	}
	
	onSelectName(){
	}
	
	constructs(){
	}
	
	initialize(){	
	}
	
	save ( ){
		this.bindChildObject(this,true);
		/* let request1 = {
				type: "POST",
				url : this.mainService.urls["generic"].url,
				data : {
					data : {
						request : 'generic',
						REQUEST_QUERY : [
							{
								sql : "select * from jblcf_inventory.warehouse where WAREHOUSE_CODE = ? ",
								db : 'DB',
								query_request : 'GET',
								index : 'res',
								values : [
									this.warehouseprofile.WAREHOUSE_CODE,
								]
							},	
						]
					}
							
				}
		};
		this.mainService.serverRequest( request1 , ( res ) => {
			res = JSON.parse(res).res;
			MainService.EventObject[this.modalData.arg.parent.controllerName].dispatch (this.modalData.arg.onSearchEvent, {
				detail : {
					query : {
								
					}
				} 
			});
			this.parent.onClose();
				
				
			
		}); */
		//console.log(this.modalData);
		MainService.EventObject[this.modalData.parent.controllerName].dispatch (`${this.modalData.parent.controllerName}:${this.modalData.args.save}`, {
			detail : {
				query : {
					LAT : this.modalData.args.POS.LAT,
					LNG : this.modalData.args.POS.LNG,
					ICN : this.LOC_CHART[this.LOC_TYPE].icon,
				}
			} 
		});
		this.onClose();
	}
	
	delete(){
	}
	
	open(){
	}
	
}