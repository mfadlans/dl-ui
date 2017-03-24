import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class Edit {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
      this.error = {};
    }

    async activate(params) {
        var id = params.id;
        this.data = await this.service.getById(id);

        this.data.supplier.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
        this.data.vat.toString = function () {
            return [this.name, this.rate]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { id: this.data._id });
    }

    saveCallback(event) {
        this.service.update(this.data).then(result => {
            this.cancelCallback(event);
        }).catch(e => {
            this.error = e;
        })
    }
}
