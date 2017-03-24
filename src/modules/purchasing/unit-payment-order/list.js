import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';


@inject(Router, Service)
export class List { 
    data = [];
    dataToBePrinting = [];
    keyword = '';
    info = { page: 1, keyword: '' };

    today = new Date();

    isPrint = false;

    context = ["detail", "cetak"]

    columns = [
      { field: "division.name", title: "Divisi" },
      { field: "supplier.name", title: "Supplier" },
      { field: "date", title: "Tgl Surat Perinta Bayar", formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      } },
      { field: "no", title: "No. Surat Perintah Bayar" },
      { field: "vatNo", title: "List Nomor Bon Unit-Nomor SJ" },
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

    constructor(router, service) {
        this.service = service;
        this.router = router;
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

    // back() {
    //     this.router.navigateToRoute('list');
    // }

    // view(data) {
    //     this.router.navigateToRoute('view', { id: data._id });
    // }

    create() {
        this.router.navigateToRoute('create');
    }
    // getPDF(data) {
    //     this.service.getPdfById(data._id);
    // }
}
