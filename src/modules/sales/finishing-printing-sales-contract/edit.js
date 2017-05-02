import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.data.agent.toString = function () {
          return [this.code, this.name]
            .filter((item, index) => {
             return item && item.toString().trim().length > 0;
        }).join("-");
    }
    }

    // view(data) {
    //     this.router.navigateToRoute('view', { id: this.data._id });
    // }

    cancelCallback(event) {
      this.router.navigateToRoute('view', { id: this.data._id });
    }

    saveCallback(event) {
        this.service.update(this.data).then(result => {
            this.cancelCallback();
        }).catch(e => {
            this.error = e;
        })
    }

    
}
