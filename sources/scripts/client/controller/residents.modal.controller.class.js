import { Modal } from "../classes/modal.controller.class.js"
import { DataTableService } from "../classes/datatable.service.class.js";
import { ServerRequest } from "../classes/serverrequest.service.class.js";
import { LoadingModal } from "./loading.modal.controller.class.js";
import { SearchModal } from "./search.modal.controller.class.js";
import { MainService } from "../classes/main.service.class.js";

export class ResidentsModalController extends Modal {
	
	constructor ( modalData ){
		super ( modalData );
		this.brgyname = session_data.BARANGAY_NAME;
		this.tenYearsAgo = this.mainService.minusDays(this.mainService.getCurrentDate(),3650)
		this.isUpdate = this.modalData.isUpdate;	
		//console.log(this.modalData)
		this.residentVars = {
			FIRSTNAME : "",
			LASTNAME : "",
			MIDDLENAME : "",
			IS_FAMILY_LEADER : 0,
			HAS_SCHOLARSHIP : 0,
			ADDRESS : `${session_data.CITY_M} ${session_data.PROVINCE}`,
			BIRTHDAY : this.tenYearsAgo,
			//AGE : 0,
			PUROK : "",
			RESIDENT_ID : this.mainService.makeid(15),
			FULLNAME : "",
			HH_LEADER : "",
			BLOOD_TYPE : "O+",
			COMORDIBITY : [],
			VACCINATION : [],
			EMERGENCY : {
				NAME: '',
				CONTACT_NUMBER : '',
				ADDRESS : '',
			},
		}

		this.PUROK_NAME = this.modalData.args['PUROK_NAME'] ? this.modalData.args['PUROK_NAME'] : "" ;
		this.hh_leader = this.modalData.args['hh_leader'] ? this.modalData.args['hh_leader'] : "" ;
		if(!this.modalData.instanceID){
			this.houseHoldMembers = [];
			this.removedHHMembers = [];
		}
		for (let md in this.residentVars){
			let sel = this.modalData.args[md];
			if (sel){
				try {
					sel =  JSON.parse(sel);
				} catch (e) {
				}
				finally {
					this.residentVars[md] = sel;
				}
			}
		}
		
		if (this.modalData.args['ID']) {
			this.residentVars['ID'] = this.modalData.args['ID'];
		}
		//console.log('this.residentVars', this.residentVars);
		
		if ( this.modalData.brgyargs ){
			this.residentVars.HH_LEADER =  this.modalData.brgyargs.HH_LEADER;
			this.residentVars.PUROK =  this.modalData.brgyargs.PUROK;
			this.residentVars.ADDRESS  =  this.modalData.brgyargs.ADDRESS;
			this.PUROK_NAME = this.modalData.brgyargs.PUROK_NAME;
			this.hh_leader =  this.modalData.brgyargs.hh_leader_;
		}
		
		//console.log(this.modalData.args['hh_members'])
		if ( this.modalData.args['hh_members'] ){
			for ( let r in this.modalData.args['hh_members'] ){
				let rsss = this.modalData.args['hh_members'][r];  
				if (!rsss.age){
					rsss['age'] = this.mainService.calculateAge( rsss.BIRTHDAY.split("-") , this.mainService.getCurrentDate().split("-") );
				}
			}
			
			this.houseHoldMembers =  this.modalData.args['hh_members'];
		}
		
		this.comordibities = [
			'',
			'Cancer',
			'Diabetes',
			'Asthma',
			'Arthritis',
			'COPD',
			'Kidney Disease',
			'Mental Health Issues',
			'Hypertension',
			'Obesity',
			'Sensory impairment',
			'Joint disease',
		];

		this.vaccines = [
			'',
			'ASTRAZENECA',
			'PHIZER BIONTECH',
			'SINOVAC',
			'SPUTNIC V',
			'JHONSON AND JHONSON`S',
			'MODERNA VACCINE',
		];
		//console.log(this.houseHoldMembers );
		
		this.calcAge({load:true});
	}
	
	constructs(){
		let qrid = "qrcode";
		if(this.modalData.instanceID){
			/* qrid = `qrcode${this.modalData.instanceID}`
			$("#residents-modal").attr("id",this.modalData.instanceID);
			//console.log($("#"+this.params.instanceID).data("controller"))
			$("#"+this.modalData.instanceID).data("controller",this.modalData.instanceID); */
			qrid  = "qrcode2"
		}
		else{
			if (this.residentVars.IS_FAMILY_LEADER == 0){
				$("#fam-members-tbl-container").css("display","none");
				//$("#ResidentModalAddress").attr("disabled",true);
				$("#fam-leader-container").show(300);
			}else{
				$("#fam-members-tbl-container").css("display","block");
				//$("#ResidentModalAddress").removeAttr("disabled");
				$("#fam-leader-container").hide(300);
			}
		}

		var qrcode = new QRCode(qrid);
		qrcode.makeCode(this.residentVars.RESIDENT_ID);
		this.setComordibity();
		this.setVaccine();
		//if(!this.modalData.instanceID)
		//	this.addMembers();
	}
	
	changefamilyleaderstat(){
		if(!this.modalData.instanceID){
			this.bindChildObject(this,true);
			if (this.residentVars.IS_FAMILY_LEADER == 1){
				if (this.hh_leader!=""){
					alert("cannot be a family leader!")
					this.residentVars.IS_FAMILY_LEADER = 0;
					this.bindChildObject(this,false);
					return;
				}
				$("#ResidentModalAddress").removeAttr("disabled");
				$("#fam-members-tbl-container").show(300);
				$("#fam-leader-container").hide(300);
			}
			else{
				if (this.houseHoldMembers.length > 0){
					alert("please remove all members first!")
					this.residentVars.IS_FAMILY_LEADER = 1;
					this.bindChildObject(this,false);
					return;
				}
				$("#ResidentModalAddress").attr("disabled",true);
				$("#fam-members-tbl-container").hide(300);
				$("#fam-leader-container").show(300);
			}
			return;
		}
		this.residentVars.IS_FAMILY_LEADER = 0;
		alert ("Cannot set as family leader!");
		this.bindChildObject(this,false);
	}

	addComordibity () {
		this.residentVars.COMORDIBITY.push('');
		this.setComordibity();
	}

	removeComordibity (params) {
		this.residentVars.COMORDIBITY.splice(params.index, 1);
		this.setComordibity();
	}

	setComordibity ( ) {
		let table = document.querySelector('#comordibity-table');
		table.innerHTML = "";
		for (let j in this.residentVars.COMORDIBITY) {
			
			let select = document.createElement('select');
			select.dataset.valuectrl = `residentVars.COMORDIBITY.${j}`;
			select.dataset.event = `${this.controllerName}.change.changeComordibity`;
			select.className = 'form-control';

			for (let i in this.comordibities) {
				let sel = this.comordibities[i];
				let option = document.createElement('option');
				option.dataset.params = `{'index':${i}}`;
				option.innerHTML = sel;
				select.appendChild(option);
			}
			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let removeButton = document.createElement('button');
				removeButton.classList='btn btn-danger';
				removeButton.innerText = 'x';
				removeButton.dataset.params = '{"index":"'+j+'"}' ;
				removeButton.dataset.event = `${this.controllerName}.click.removeComordibity`;
			td1.appendChild(select);
			td2.appendChild(removeButton);
			tr.appendChild(td1);
			tr.appendChild(td2);
			
			table.appendChild(tr);

			//this.residentVars.COMORDIBITY.push('');
			
		}
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
	}


	addVaccine () {
		this.residentVars.VACCINATION.push({
			VACCINE_DATE : '0000-00-00',
			VACCINE : '',
			//DOSE : this.residentVars.VACCINE.length,	
		});
		this.setVaccine();
	}

	removeVaccination (params) {
		this.residentVars.VACCINATION.splice(params.index, 1);
		this.setVaccine();
	}


	setVaccine ( ) {
		let table = document.querySelector('#vaccine-table');
		table.innerHTML = "";
		for (let j in this.residentVars.VACCINATION) {
			
			let select = document.createElement('select');
			let date = document.createElement('input');
				date.type = 'date';
				date.className = 'form-control';
				date.dataset.valuectrl = `residentVars.VACCINATION.${j}.VACCINE_DATE`
			select.dataset.valuectrl = `residentVars.VACCINATION.${j}.VACCINE`;
			select.dataset.event = `${this.controllerName}.change.changeValues`;
			select.className = 'form-control';
			this.residentVars.VACCINATION[j].DOSE = j;
			for (let i in this.vaccines) {
				let sel = this.vaccines[i];
				let option = document.createElement('option');
				option.dataset.params = `{'index':${i}}`;
				option.innerHTML = sel;
				select.appendChild(option);
			}
			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let td3 = document.createElement('td');
			let removeButton = document.createElement('button');
				removeButton.classList='btn btn-danger';
				removeButton.innerText = 'x';
				removeButton.dataset.params = '{"index":"'+j+'"}' ;
				removeButton.dataset.event = `${this.controllerName}.click.removeVaccination`;
			td1.appendChild(select);
			td2.appendChild(date);
			td3.appendChild(removeButton);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			table.appendChild(tr);

			//this.residentVars.COMORDIBITY.push('');
			
		}
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
	}

	

	changeComordibity ( ...args ) {
	
		let alreadySelected = this.residentVars.COMORDIBITY.findIndex (x => x === args[1].srcElement.value);

		if (alreadySelected > -1) {
			alert("already selected")
			return;
		}
		
		this.changeValues();
	}
	
	calcAge( args ){
		if ( !args.load ){
			this.bindChildObject(this,true);
		}
		this.currentAge = this.mainService.calculateAge( this.residentVars.BIRTHDAY.split("-") , this.mainService.getCurrentDate().split("-") );
		if ( !args.load ){
			this.bindChildObject(this,false);
		}
	}
	
	printHealthCard(){
		this.mainService.openTab("POST","/dis/sources/templates/reports/district.five.health.card.template.php",
		{
			data : this.residentVars,
		},"blank_");
	}
	
	
	addMembers(){
		let tbody = document.querySelector ( "#members-hh-table > tbody" );
			tbody.innerHTML = "";
		let tbodyContents = "";
		for ( let i in this.houseHoldMembers ){
			let m = this.houseHoldMembers[i];
			tbodyContents += 
			`<tr>
				<td>${m.FULLNAME}</td>
				<td>${m.BIRTHDAY}</td>
				<td>${m.age}</td>
				<td>
					<a  style="color:red" href="javascript:void(0)" data-params='{"RESIDENT_ID":"${m.RESIDENT_ID}"}' data-event="ResidentsModalController.click.removeMember"><i class="icon-remove"></i> Remove</a>
				</td>
			</tr>`;
		}
		tbody.insertAdjacentHTML("beforeend",tbodyContents);
	}
	
	removeMember( arg ){
		if ( !confirm ( "Do you want to remove this member?" ) )
			return;
		//console.log(this.removedHHMembers)
		let index = this.houseHoldMembers.findIndex(x=>x.RESIDENT_ID == arg.RESIDENT_ID);
		let rem = this.houseHoldMembers[index]
		//console.log(this.houseHoldMembers,index,rem,arg.MEMBER_ID,arg)
		this.removedHHMembers.push(this.houseHoldMembers[index])
		//console.log(this.removedHHMembers)
		//setTimeout ( ( ) => {
			this.houseHoldMembers.splice ( index , 1 );
			this.addMembers();
			this.binds(this.controllerName,'#'+this.modalID);
			this.bindChildObject ( this , false );
		//},1000);
	}
	
	viewMember( arg ){
		
	}
	
	init(){
	}
	
	onSelectBrgyHead( arg ){
		let hd = arg.detail.query;
		this.residentVars.HH_LEADER = hd.RESIDENT_ID;
		this.residentVars.ADDRESS = hd.ADDRESS;
		this.residentVars.PUROK = hd.PUROK;
		this.PUROK_NAME = hd.PRK_NAME;
		this.hh_leader = hd.FULLNAME;
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		hd.modal.onClose();
	}
	
	removeBrgyHead( ){
		if ( !confirm ("Are you sure you want to remove?") )
			return;
		
		this.residentVars.HH_LEADER = "";
		this.hh_leader = "";
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
	}
	
	searchResident( arg ){
		//console.log(arg)
		let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/bps/sources/templates/modal/search.modal.template.html",
			params : {
				type : arg.search ? arg.search : 'resident',
				action : 'link',
				controller : this.controllerName,
				evt : arg.onevt ? arg.onevt : ':onAddMembers',
				//arg : args,
				brgyargs : {
					HH_LEADER : this.residentVars.RESIDENT_ID,
					hh_leader_ : this.residentVars.FULLNAME,
					PUROK : this.residentVars.PUROK,
					PUROK_NAME : this.PUROK_NAME,
					ADDRESS : this.residentVars.ADDRESS,
				},
			},
			instanceID : this.mainService.generate_id_timestamp("sm"),
			parent : this,
		});
		ssm.render();
	}
	
	searchPurok ( arg ){
		let ssm = new SearchModal ({
			modalID :  "search-modal",
			controllerName : "searchmodal",
			template : "/bps/sources/templates/modal/search.modal.template.html",
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
	
	onAddMembers( arg ){
		let mems = arg.detail.query;
		let index = this.houseHoldMembers.findIndex(x=>x.RESIDENT_ID == mems.RESIDENT_ID);
		//console.log(mems);
		if ( index > -1 || (mems.HH_LEADER != "" && mems.HH_LEADER != this.residentVars.RESIDENT_ID) ){
			alert ("Has already added as family member!");
			return;
		}
		
		if ( mems.RESIDENT_ID == this.residentVars.RESIDENT_ID ){
			alert ( "Are you silly ? you cannot add yourself as a member!" )
			return;
		}
		
		mems.modal.onClose();
		
		this.houseHoldMembers.push ({
			FULLNAME : mems.FULLNAME,
			BIRTHDAY : mems.BIRTHDAY,
			age : this.mainService.calculateAge( mems.BIRTHDAY.split("-") , this.mainService.getCurrentDate().split("-") ),
			RESIDENT_ID : mems.RESIDENT_ID,
		});
		
		this.addMembers();
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
	}
	

	
	onLinkPurok ( arg ){
		/* if (this.residentVars.IS_FAMILY_LEADER == 0){
			alert ( "Cannot change purok!" );
			return;
		} */
		let ms = arg.detail.query;
		this.residentVars.PUROK = ms.PRK_ID;
		this.PUROK_NAME = ms.PRK_NAME;
		this.residentVars.ADDRESS = `${this.PUROK_NAME} ${this.residentVars.ADDRESS}` ;
		this.binds(this.controllerName,'#'+this.modalID);
		this.bindChildObject ( this , false );
		ms.modal.onClose();
	}
	
	changeValues(){
		this.bindChildObject(this,true);
	}
	
	save(){
		this.bindChildObject(this,true);
		let origEmergency = this.residentVars.EMERGENCY;
		this.residentVars.EMERGENCY = JSON.stringify(this.residentVars.EMERGENCY);
		this.residentVars.FULLNAME = `${this.residentVars.LASTNAME} ${this.residentVars.FIRSTNAME} ${this.residentVars.MIDDLENAME}`;
		let saveparams = ( ServerRequest.queryBuilder( this.mainService.object2array(this.residentVars) , this.isUpdate ? "UPDATE" : "INSERT" ) );
		
		console.log(saveparams);
	
		let sqlformems = "";
		let valformems = [];
		
		let sqlformres = "";
		let valformres = [];
		
		let sqlforremovedmems = "";
		let valforremovedmems = [];

		for ( let rhh in this.removedHHMembers ){
			let rhhsel = this.removedHHMembers[rhh];
			//console.log(this.removedHHMembers,rhh)
			sqlforremovedmems += `UPDATE dis.barangay_res_setup SET  HH_LEADER = ? WHERE RESIDENT_ID = ?;`;
			valforremovedmems.push ("");
			valforremovedmems.push (rhhsel.RESIDENT_ID);
		}
		//console.log(this.houseHoldMembers)
		for ( let mm in this.houseHoldMembers ){
			let selm = this.houseHoldMembers[mm];
			
			sqlformres += `UPDATE dis.barangay_res_setup SET PUROK = ? , HH_LEADER = ?, ADDRESS = ? WHERE RESIDENT_ID = ?;`;
			valformres.push (this.residentVars.PUROK);
			valformres.push (this.residentVars.RESIDENT_ID);
			valformres.push (this.residentVars.ADDRESS);
			valformres.push (selm.RESIDENT_ID);

		}
		
		//console.log(saveparams)
		
		let sql1 = !this.isUpdate ? `INSERT INTO barangay_res_setup ${saveparams.initial} VALUES ${saveparams.seconds}` :
									`UPDATE barangay_res_setup ${saveparams.initial} where RESIDENT_ID = "${this.residentVars.RESIDENT_ID}"`;
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
						/*{
							sql : sqlformres,
							db : 'DB',
							query_request : "INSERT",
							values : valformres
						},	
						{
							sql : sqlforremovedmems,
							db : 'DB',
							query_request : "UPDATE",
							values : valforremovedmems
						},	*/
					]
				}			
			}	
		};
		for(let dq in dataQuery.data.data.REQUEST_QUERY){
			if ( dataQuery.data.data.REQUEST_QUERY[dq].values.length == 0 )
				dataQuery.data.data.REQUEST_QUERY.splice ( dq , 1 );
		}
		
		//console.log(dataQuery)
		this.mainService.serverRequest( dataQuery , ( res ) => {
			MainService.EventObject[this.modalData.parent.controllerName].dispatch (`${this.modalData.onSearchEvent}` , {
				detail : {
					query : {
					}
				} 
			});
			alert("success!");
			//this.onClose();
			this.residentVars.EMERGENCY = origEmergency;
		} 
		, ( res ) => {
			//err
		});	
	}
	
}