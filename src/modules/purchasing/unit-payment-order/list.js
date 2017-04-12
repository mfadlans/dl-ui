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
      { field: "no", title: "Nomor Surat Perintah Bayar" },
      { field: "date", title: "Tanggal Surat Perinta Bayar", formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      } },
      { field: "dueDate", title: "Tanggal Jatuh Tempo", formatter: function(value, data, index) {
        return moment(value).format("DD MMM YYYY");
      } },
      { field: "division.name", title: "Divisi" },
      { field: "category.name", title:"Kategori" },
      { field: "supplier.name", title: "Supplier" },
      { field: "items", title: "List Nomor Bon Unit - Nomor SJ"},
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
            select: ["no", "date", "supplier.name", "division.name", "items.unitReceiptNote.no", "items.unitReceiptNote.deliveryOrder.no", "category.name"]
        }

        return this.service.search(arg)
            .then(result => {
              var data = {}
                data.total = result.info.total;
                data.data = result.data;
                data.data.forEach(s => {
                  s.items.toString = function(){
                        var str = "<ul>";
                        for (var item of this) {
                            str += `<li>${item.unitReceiptNote.no}-${item.unitReceiptNote.deliveryOrder.no}</li>`;
                        }
                        str += "</ul>";
                        return str;
                  }
                })
              // this.data.unitReceiptNote.toString = function () {
              //   return [this.no, this.deliveryOrder.no]
              //           .filter((item, index) => {
              //               return item && item.toString().trim().length > 0;
              //           }).join(" - ");
              //   }
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

    async activate(params) {
        this.info.keyword = '';
        var result = await this.service.search(this.info);
        this.data = result.data;
        this.info = result.info;

        console.log(this.data);
    }

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
