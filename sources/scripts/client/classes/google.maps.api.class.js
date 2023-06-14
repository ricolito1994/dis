import { MainService } from "./main.service.class.js";
import { LoadingModal } from "../controller/loading.modal.controller.class.js";

export class GoogleMapsAPI {
	
	constructor ( GOOGLE_MAPS_OBJECT ){
		this.GOOGLE_MAPS_OBJECT = GOOGLE_MAPS_OBJECT;
		this.API_KEY = this.GOOGLE_MAPS_OBJECT.API;
		this.BASE_LOCATION = {
			lat : this.GOOGLE_MAPS_OBJECT.LAT,
			lng : this.GOOGLE_MAPS_OBJECT.LNG
		};
		this.additionalHooks = this.GOOGLE_MAPS_OBJECT['ADDITIONAL_HOOKS'];
		this.myPanorama = "";
		this.markers = [];
		this.markersForSearch = [];
		//console.log(this.GOOGLE_MAPS_OBJECT);
		  
		if (!window._GoogleMapsApi) {
		  this.callbackName = '_GoogleMapsApi.mapLoaded';
		  window._GoogleMapsApi = this;
		  window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
		}
		this.loadMapsCallback();
	}
	
	relocate ( isRelocateHome , objectLocation ){
		if (this.infowindow){
			this.infowindow.close();
		}
		
		if (isRelocateHome){
			this.map.panTo (this.myCenter);
			for ( let ms in this.markersForSearch ){
				this.markersForSearch[ms].setMap( null )
			}
		}
		else{
			this.infowindow = new google.maps.InfoWindow({
				content: `<div><B>${objectLocation.args.FIRST_NAME} ${objectLocation.args.FAMILY_NAME}</B></div>
						  <div><B>${objectLocation.args.ADDRESS}</B></div>`,
			});
			let marker = this.markers [ this.markers.findIndex ( x => x.markerID == objectLocation.args.MKID ) ];
			//console.log(marker);
			this.infowindow.open(this.map,marker['marker']);
			this.map.panTo (objectLocation.myLocation);
		}
	}
	
	mapLoaded() {
		if (this.resolve) {
		  this.resolve();
		}
	}
	
	load() {
		if (!this.promise) {
		  this.promise = new Promise(resolve => {
			this.resolve = resolve;
			if (typeof window.google === 'undefined') {
			  const script = document.createElement('script');
			  script.src = `https://maps.googleapis.com/maps/api/js?key=${this.API_KEY}&callback=${this.callbackName}&libraries=places`;
			  script.async = true;
			  document.body.append(script);
			} else {
			  this.resolve();
			}
		  });
		}
		return this.promise;
	}
	
	static getMyMarker ( params ) {
		class MyMarker extends google.maps.OverlayView {
			constructor(params) {
				super();
				this.position = params.position;
				const content = document.createElement('div');
				content.classList.add('marker');
				content.innerHTML = params.label;
				content.style.position = 'absolute';
				content.style.transform = 'translate(-50%, -100%)';

				const container = document.createElement('div');
				container.style.position = 'absolute';
				container.style.cursor = 'pointer';
				container.appendChild(content);

				this.container = container;
				  
			}
				
			addEvent ( eventName , event , eventObject ){
				this.container.addEventListener(eventName , event.bind(eventObject) , false );
			}
				
			onAdd() {
				this.getPanes().floatPane.appendChild(this.container);
			}

			onRemove() {
				this.container.remove();
			}

			draw() {
				const pos = this.getProjection().fromLatLngToDivPixel(this.position);
				this.container.style.left = pos.x + 'px';
				this.container.style.top = pos.y + 'px';
			}
		}
		return new MyMarker (params);
	}
	
	loadLocations (  ){
		let load = new LoadingModal ({
			modalID :  `loading-modal-load`,
			controllerName : `loadingmodal`,
			template : `/dis/sources/templates/modal/loading.modal.template.html`,
			parent : this.GOOGLE_MAPS_OBJECT["ADDITIONAL_HOOKS"]["parent"],
		});
		load.render();
		setTimeout ( async  ( ) => {
			try{
				let location = await this.additionalHooks.parent.loadLocations ();
				for ( let l in location ){
					let loc = location[l];
					//console.log(loc);
					/* let markerLocs = new google.maps.Marker(
						{
							position: {
								lat : parseFloat(loc.LATITUDE),
								lng : parseFloat(loc.LONGITUDE),
							},
							map: this.map,
							animation: google.maps.Animation.DROP,
							label :{
								text:"BARANGAY MANSILINGAN",
								fontSize: "20px",
								fontWeight: "bold",
								textShadow :`2px 2px #ff0000`,
								color:'#123',
							},
						}
					); */
					let markerLocs = GoogleMapsAPI.getMyMarker({
						position: {
							lat : parseFloat(loc.LATITUDE),
							lng : parseFloat(loc.LONGITUDE),
						},
						label : loc.VALUE.content,
					});
					markerLocs.setMap(this.map)
					//this.additionalHooks.parent['MKID'] = '';
					console.log(markerLocs.addListener);
					for( let i in this.additionalHooks.MARKERS.events ){
						let me = this.additionalHooks.MARKERS.events[i];
						//this.additionalHooks.parent['MKID'] = loc.MKID;
						//markerLocs.addListener (i, me.bind(this.additionalHooks.parent , loc.MKID) );
						markerLocs.addEvent(i,me);
					}
							
					/* infowindow.open({
						anchor : markerLocs,
						map,
						shouldFocus: false,
					}); */
					this.markers.push ({
						lat : parseFloat(loc.LATITUDE) ,
						lng : parseFloat(loc.LONGITUDE),
						marker : markerLocs,
						markerID : loc.MKID,
					});
				}
			}
			catch(e){
				alert("refresh your browser");
			}
			load.onClose();
		},2000);
	}
	
	loadMapsCallback (){
		this.load().then(() => {
		   this.myCenter = new google.maps.LatLng(this.BASE_LOCATION.lat, this.BASE_LOCATION.lng);
			
		   var mapOptions= {
			center: this.myCenter,
			zoom:15, 
			scrollwheel: true,
			draggable: true,
			//mapTypeId:google.maps.MapTypeId.ROADMAP
			 mapTypeId: "satellite",
		  };
		  
		  let map = new google.maps.Map(document.querySelector('#maps-container'),mapOptions);
		  this.map = map;
		  this.map.setTilt(45);
		  const input = document.getElementById("pac-input");
		  const searchBox = new google.maps.places.SearchBox(input);
		
		  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		 
		  
		  searchBox.addListener("places_changed", ( ...args ) => {
			  const places = searchBox.getPlaces();
			  
			   if (places.length == 0) {
				  return;
			   }
			   const bounds = new google.maps.LatLngBounds();
			  // Create a marker for each place.
			  for ( let ms in this.markersForSearch ){
				  this.markersForSearch[ms].setMap(null)
			  }
			   //console.log(places);

			   for ( let p in places ){
				  let place = places [p];
				  if (!place.geometry || !place.geometry.location) {
					console.log("Returned place contains no geometry");
					return;
				  }
				  
				  const icon = {
					url: place.icon ,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25),
				  };
				  this.markersForSearch.push(
					new google.maps.Marker({
					  map,
					  icon,
					  title: place.name,
					  position: place.geometry.location,
					})
				  );
				 
				  if (place.geometry.viewport) {
					bounds.union(place.geometry.viewport);
				  } else {
					bounds.extend(place.geometry.location);
				  }
			   }
			   map.fitBounds(bounds);
		  });
		  google.maps.event.addListener(map, 'rightclick', (event) => {
				let mapZoom = map.getZoom();
				let startLocation = event.latLng;
				//console.log(startLocation.lat(),startLocation.lng());
				setTimeout(() => {
					if(mapZoom == map.getZoom()){
						//console.log(event.latLng.lat(),event.latLng.lng())
						const infowindow = new google.maps.InfoWindow({
							content: "<b>-</b>",
						});
						/* 
						let markerLocs = new google.maps.Marker({
							position: startLocation,
							map: map,
						});
						markerLocs.addListener ( "click" , ( args ) => {
							console.log(args);
							alert("WEW");
						});
						markerLocs.addListener ( "rightclick" , ( args ) => {
							let lat = (args.latLng.lat());
							let lng = (args.latLng.lng());
							let indx = this.markers.findIndex ( x => x.lat == lat && x.lng == lng );
							if (confirm("Are you sure you want to remove this location?"))
								this.markers[ indx ][ 'marker' ].setMap (null);
						});  */
						if ( !confirm ( "Do you want to add this location?" ) )
							return;
						
						this.GOOGLE_MAPS_OBJECT['ADDITIONAL_HOOKS'].parent.newLocation({
							gm : event,
							id : MainService.MAKE_ID(40),
						});
						
					}
				}, 100);
			});
		});
	}	
	
	newLocation( event ){
		try{
			let markerLocs = GoogleMapsAPI.getMyMarker({
				position: {
					lat : parseFloat(event.LAT),
					lng : parseFloat(event.LNG),
				},
				/* label : `<div style="font-size:20px;text-align:center">🏠</div>
					<div class="shadow-marker" style="font-size:12px;text-align:center;">LOCATION</div>`, */
				label : `<div style="font-size:20px;text-align:center">${event.ICN}</div>`,
			});
			let mkid = MainService.MAKE_ID(40);
			//console.log(event);
			markerLocs.setMap(this.map);
							
			for( let i in this.additionalHooks.MARKERS.events ){
				let me = this.additionalHooks.MARKERS.events[i];
				markerLocs.addListener (i, me.bind(this.additionalHooks.parent,mkid) );
			}
			//console.log(markerLocs);				
			this.markers.push ({
				lat : event.LAT,
				lng : event.LNG,
				marker : markerLocs,
				markerID : mkid,
			});
		}
		catch(e){
			console.log(e);
		}
	}
	
}