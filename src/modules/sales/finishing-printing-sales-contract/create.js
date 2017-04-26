import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Create {

    constructor(router, service) {
        this.router = router;
        this.service = service;
        // this.data = {};
        // this.error = {};
    }

    activate(params) {

    }

    bind() {
        this.data = this.data || {};
        this.error = {};
    }

    cancelCallback(event) {
      this.router.navigateToRoute('list');
    }
    

    saveCallback(event) {
        this.service.create(this.data)
            .then(result => {
                this.cancelCallback();
            })
            .catch(e => {
                this.error = e;
            })
    }
}
