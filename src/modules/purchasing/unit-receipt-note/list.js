import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';


@inject(Router, Service)
export class List {
    data = [];
    dataToBePrinting = [];
    keyword = '';
    info = { page: 1, keyword: '' };

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }

    context = ["detail", "cetak"]

    columns = [
      { field: "no", title: "Nomor Bon Unit" },
      { field: "date", title: "Tanggal Bon Unit", formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      } },
      { field: "unit.division.name", title: "Unit" },
      { field: "supplier.name", title: "Supplier" },
      { field: "deliveryOrder.no", title: "List Nomor Surat Jalan" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    today = new Date();

    isPrint = false;

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "print":
                this.service.getPdfById(data._id);
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }

    // async activate() {
    //     this.info.keyword = '';
    //     var result = await this.service.search(this.info);
    //     this.data = result.data;
    //     this.info = result.info;
    // }

    // loadPage() {
    //     var keyword = this.info.keyword;
    //     this.service.search(this.info)
    //         .then(result => {
    //             this.data = result.data;
    //             this.info = result.info;
    //             this.info.keyword = keyword;
    //         })
    // }

    // changePage(e) {
    //     var page = e.detail;
    //     this.info.page = page;
    //     this.loadPage();
    // }

    // addIsPrint() {
    //     this.dataToBePrinting = [];
    //     for (var poExternal of this.data) {
    //         poExternal.isPrint = false;
    //     }
    // }

    // pushDataToBePrinting(item) {

    //     if (item.isPrint) {
    //         this.dataToBePrinting.push(item);
    //     }
    //     else {
    //         var index = this.dataToBePrinting.indexOf(item);
    //         this.dataToBePrinting.splice(index, 1);
    //     }

    //     this.calculateTotal();
    // }

    // back() {
    //     this.router.navigateToRoute('list');
    // }

    // view(data) {
    //     this.router.navigateToRoute('view', { id: data._id });
    // }



    // tooglePrintTrue() {
    //     this.isPrint = true;

    //     this.newStatus();
    // }

    // tooglePrintFalse() {
    //     this.isPrint = false;

    //     this.newStatus();
    // }

    // newStatus() {
    //     this.dataToBePrinting = [];

    //     for (var item of this.data) {
    //         item.isPrint = false;
    //     }
    // }

    // getPDF(data) {
    //     this.service.getPdfById(data._id);
    // }
}
