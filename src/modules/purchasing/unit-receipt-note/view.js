import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var id = params.id;

        this.data = await this.service.getById(id);
        if (this.data.items) {
            this.data.items.forEach(item => {
                item.showDetails = false
            })
        }

        this.data.unit.toString = function () {
          return [this.division.name, this.name]
            .filter((item, index) => {
              return item && item.toString().trim().length > 0;
            }).join(" - ");
        }
        this.data.supplier.toString = function () {
          return [this.code, this.name]
            .filter((item, index) => {
              return item && item.toString().trim().length > 0;
            }).join(" - ");
        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // cancel(event) {
    //     this.router.navigateToRoute('list');
    // }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    // delete(event) {
    //     this.service.delete(this.data).then(result => {
    //         this.cancel(event);
    //     });
    // }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
