import { Modal } from "../classes/modal.controller.class.js"

export class ResidentsDashboardController extends Modal {
	
	constructor ( modalData ){
		super ( modalData );
		this.fullname = "-";
		this.address = "-";
	}
	
	
	constructs(){
		var html5QrcodeScanner = new Html5QrcodeScanner(
				"qrcode", { fps: 10, qrbox: 250 });
		html5QrcodeScanner.render(this.ScanSuccess.bind(this),this.ScanError.bind(this));
	}
	
	ScanSuccess(decodedText, decodedResult) {
		// Handle on success condition with the decoded text or result.
		let dataQuery = {
			type: "POST",
			url : this.mainService.urls["generic"].url,
			data : {
				data : {
					request : 'generic',
					REQUEST_QUERY : [
						{
							sql : `SELECT *,CONCAT(w.LASTNAME,' ',w.FIRSTNAME) FNAME FROM dis.barangay_res_setup w
							WHERE w.RESIDENT_ID = ?`,
							db : 'DB',
							query_request : 'GET',
							index : 'result',
							values : [`${decodedText}`],
						},	
					]
				}
						
			}
		};
		
		this.mainService.serverRequest( dataQuery , ( res ) => {
			let stds = (JSON.parse(res))['result'][0];
			if(stds){
				alert(`Scan Success!`);
				
				//console.log(`Scan result: ${decodedText}`, decodedResult);
				this.fullname = stds.FNAME;
				this.address = stds.ADDRESS;
				//console.log(this);
				this.binds(this.controllerName,'#'+this.modalID);
				this.bindChildObject ( this , false );
			}
			else{
				alert("Data not found!");
			}
		});
	}
	ScanError(errorText){
		//alert(`${errorText}`);
	}
	
	init(){
		
	}

}
	