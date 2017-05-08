import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class View {

    poExId = "";
    isVoid = false;
    isArriving = false;
    hasCancel = true;
    hasEdit = false;
    hasDelete = false;
    hasUnpost = false;
    prId = "";

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    async activate(params) {
        var locale = 'id-ID';
        var moment = require('moment');
        moment.locale(locale);
        var id = params.id;

        this.poExId = id;

        this.data = await this.service.getById(id);

        if (!this.data.isPosted) {
            this.hasEdit = true;
            this.hasDelete = true;
        } else {
            if (!this.data.isUsed) {
                this.hasUnpost = true;
            }
        }

        this.data.supplier.toString = function () {
            return [this.code, this.name]
                .filter((item, index) => {
                    return item && item.toString().trim().length > 0;
                }).join(" - ");
        }




        // if (this.data.items) {
        //     this.data.items.forEach(item => {
        //         item.showDetails = false
        //     })

        //     if(this.data.status.value === 0)
        //         this.isVoid = true;

        //     if(this.data.items.find(po => { return po.status.value > 3 }) != undefined)
        //         this.isArriving = true;
        // }

      console.log(this.data);
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data._id });
    // }

    // deleteCallback() {
    //     this.service.delete(this.data).then(result => {
    //         this.cancelCallback(event);
    //     });
    // }

    showDetail(item) {
        if (item.showDetails)
            item.showDetails = false;
        else
            item.showDetails = true;
    }

    // cancelCallback(event) {
    //     this.service.cancel(this.poExId).then(result => {
    //         this.router.navigateToRoute('list');
    //     }).catch(e => {
    //         this.error = e;
    //     })
    // }

    unpost() {
        this.service.unpost(this.poExId).then(result => {
            this.cancelCallback(event);
        }).catch(e => {
            this.error = e;
        })
    }

    close() {
        this.service.close(this.poExId).then(result => {
            this.cancelCallback(event);
        }).catch(e => {
            this.error = e;
        })
    }
}
