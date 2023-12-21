import { Modal } from "../classes/modal.controller.class.js";

export class DateRangeModal extends Modal {

	constructor (modalData){
		super (modalData);
        this.dateFrom = this.mainService.getCurrentDate();
        this.dateTo = this.mainService.getCurrentDate();
        this.params = this.modalData.params;
	}
	
    async submit() {
        this.bindChildObject(this,true);
        let paramMethods = this.params.paramsMethod;
            paramMethods['DATE_FROM'] = this.dateFrom;
            paramMethods['DATE_TO'] = this.dateTo;
        let result = await this.params.asyncRequest(paramMethods);
        this.params.next(result, this.modalData.parent, {
            DATE_FROM : this.dateFrom,
            DATE_TO : this.dateTo,
        });
    }
	
	constructs(){
	}
	
	initialize(){	
	}
}