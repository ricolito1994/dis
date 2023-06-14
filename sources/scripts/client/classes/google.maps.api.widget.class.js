import { Modal } from "../classes/modal.controller.class.js";
import { GoogleMapsAPI } from "../classes/google.maps.api.class.js";
import { NewLocationModalController } from "../controller/new.location.modal.controller.class.js";
//import { SearchModal } from "./search.modal.controller.class.js";

export class GoogleMapsAPIWidget extends Modal{
	
	constructor ( modalData ){
		super (modalData);
		this.SearchPlacesBar = "";
	}
	
	constructs (){
		this.modalData.args[ "ADDITIONAL_HOOKS" ] = {
			//LOCATIONS_DATA : this.loadLocations(),
			parent : this,
			MARKERS : {
				events : {
					click  : this.newLocation,
					//rightclick : this.removeMarker,
				}
				
			}
		}
		this.gmap = new GoogleMapsAPI ( this.modalData.args );
		this.gmap.loadLocations();
	}	
	
	/* result from a query */
	loadLocations ( ){
		/* return new Promise ( ( resolve , reject ) => {
			let requestCheck = {
				type: "POST",
				url : this.mainService.urls["generic"].url,
				data : {
					data : {
						request : 'generic',
						REQUEST_QUERY : [
							{
								sql : `select * FROM bps.person WHERE COMPANY_CODE = ?`,
								db : 'DB',
								query_request : "GET",
								index : "t",
								values : [session_data.COMPANY_CODE]
							},	
						]
					}
							
				}
			};
			this.mainService.serverRequest ( requestCheck , ( args ) => {
				let res = JSON.parse ( args );
				if (res.t.length > 0)
					resolve ( res.t );
				else
					reject ("lamas suso");
			});
		}); */
		return new Promise ( ( resolve , reject ) => {
			let locations = [];
			let DefaultLocation = {
				LATITUDE : this.modalData.args.LAT,
				LONGITUDE : this.modalData.args.LNG,
				VALUE : {
					content : 
						`<div style="font-size:20px;text-align:center"><img width="40" src="/dis/sources/complist/mansilingan_bcd/logos/${session_data.BARANGAY_LOGO}"></div>
						<div class="shadow-marker" style="font-size:15px;text-align:center;">${session_data.BARANGAY_NAME}</div>`,
				}
			};
			
			locations.push ( DefaultLocation );
			
			if (true)
				resolve ( locations );
			else
				reject ( "error" );
			
		})
	}
	
	
	removeLocation ( mkid ){
		/* return new Promise ( ( resolve , reject ) => {
			let requestCheck = {
				type: "POST",
				url : this.mainService.urls["generic"].url,
				data : {
					data : {
						request : 'generic',
						REQUEST_QUERY : [
							{
								sql : `delete FROM bps.person WHERE MKID = ? AND COMPANY_CODE = ?`,
								db : 'DB',
								values : [mkid , session_data.COMPANY_CODE]
							},	
						]
					}
							
				}
			};
			this.mainService.serverRequest ( requestCheck , ( args ) => {
				resolve( "deleted" );
			});
		}); */
		
	}
	
	changeFilter(){
		this.bindChildObject(this,this.elem);
	}
	
	newLocation ( ...args ){
		//console.log(args);
		let nl = new NewLocationModalController({
			modalID :  "new-location-modal",
			controllerName : "NewLocationModalController",
			template : "/dis/sources/templates/modal/new.location.modal.template.html",
			parent : this,
			args : {
				close : "onCloseAddLoc",
				save : "onSaveLoc",
				MKID : args[0].id,
				LOC_ID : args[0]['LOC_ID'] ? false : args[0]['LOC_ID'],
				POS : {
					LAT : args[0].gm ? args[0].gm.latLng.lat() : 0,
					LNG : args[0].gm ? args[0].gm.latLng.lng() : 0,
				}
			}
		});
		nl.render();
		//console.log(args);
	}
	
	onSaveLoc ( args ){
		let result = args.detail.query;
		this.gmap.newLocation(result);
		console.log(args);
	}
	
	onCloseAddLoc ( ){
	}
	
	
	
	onSearchLocation (...args){
		/* //console.log(args);
		let details = args[0].detail.query.arguments;
		this.gmap.relocate ( false , {
			myLocation : {
				lat : parseFloat(details.LATITUDE),
				lng : parseFloat(details.LONGITUDE),
			},
			args : details
		} ); */
	}
	
	removeMarker( ...args ){
		/* //console.log(args);
		setTimeout ( async ( )=> {
			let lat = (args[1].latLng.lat());
			let lng = (args[1].latLng.lng());
			let mkd = args [0];
			//console.log(mkd);
			let indx = this.gmap.markers.findIndex ( x => x.lat == lat && x.lng == lng );
			if (confirm("Are you sure you want to remove this location?")){
				await this.removeLocation( mkd );
				this.gmap.markers[ indx ][ 'marker' ].setMap (null);
			}
		},300); */
	}
	
	
	returnBaseLocation ( ){
		//this.SearchPlacesBar =  this.modalData.args.DEFAULT_LOCATION;
		this.gmap.relocate(true);
		this.bindChildObject ( this , false );	
	}
	
	searchLocation ( ){
		/* let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/bps/sources/templates/modal/search.modal.template.html",
			params : {
				type : "location",
				action : 'link',
				controller : 'GoogleMapsWidgetAPIController',
				evt : ':onSearchLocation',
			},
			parent : this,
		});
		ssm.render(); */
	}
	
	init(){
	}
}	