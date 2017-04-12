import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';


@inject(Router, Service)
export class List {
    data = [];
    keyword = '';

    today = new Date();
    info = { page: 1, keyword: '' };

    isPrint = false;

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }

    context = ["detail", "cetak"]

    columns = [
      { field: "no", title: "Nomor Koreksi" },
      { field: "date", title: "Tanggal Koreksi", formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      } },
      { field: "unitPaymentOrder.dueDate", title: "Tanggal Jatuh Tempo", formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      } },
      { field: "correctionType", title: "Jenis Koreksi" },
      { field: "unitPaymentOrder.no", title: "Nomor Surat Perintah Bayar" },
      { field: "unitPaymentOrder.division.name", title: "Divisi" },
      { field: "unitPaymentOrder.category.name", title: "Divisi" },
      { field: "unitPaymentOrder.supplier.name", title: "Supplier" },
    ];

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            select: [
            "no", "date", "unitPaymentOrder.dueDate", "correctionType", "unitPaymentOrder.no", "unitPaymentOrder.division.name", "unitPaymentOrder.category.name","unitPaymentOrder.supplier.name"
        ]
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

    // getPDFRetur(data) {
    //     this.service.getPdfReturById(data._id);
    // }
}
