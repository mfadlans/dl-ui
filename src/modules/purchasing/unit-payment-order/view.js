import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    isCorrection = false;
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

            this.isCorrection = this.data.items
                .map((item) => {
                    return item.unitReceiptNote.items
                        .map((urnItem) => urnItem.correction.length > 0)
                        .reduce((prev, curr, index) => {
                            return prev || curr
                        }, false);
                })
                .reduce((prev, curr, index) => {
                    return prev || curr
                }, false);

          

        }
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    editCallback(event) {
        this.router.navigateToRoute('edit', { id: this.data._id });
    }

    deleteCallback() {
        this.service.delete(this.data).then(result => {
            this.cancelCallback(event);
        });
    }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }
}
