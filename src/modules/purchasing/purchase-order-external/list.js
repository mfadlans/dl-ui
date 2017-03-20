import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    dataToBePosting = [];

    rowFormatter(data, index) {
      if (data.isPosted)
        return { classes: "success" }
      else
        return {}
    }

    context = ["detail", "print"];

    columns = [
      {
        field: "isPosting", title: "Post",
        checkbox: true, sortable: false,
        formatter: function (value, data, index) {
          this.checkboxEnabled = !data.isPosted;
          return ""
        }
      },
      { field: "no", title: "Nomor PO External" },
      { field: "date", title: "Tanggal PO External",
          formatter: function (value, data, index) {
          return moment(value).format("DD MMM YYYY");
        }
       },
      { field: "supplier.name", title: "Nama Supplier" },
      { field: "purchaseRequest.no", title: "Nomor Purchase Request" },
      { field: "isPosted", title: "Status Post",
        formatter: function (value, row, index) {
          return value ? "SUDAH" : "BELUM";
        }
       }
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
        // var data = {}
        //         data.total = result.info.total;
        //         data.data = result.data;
        //         data.data.forEach(s => {
        //             s.no.toString = function () {
        //                 var str = "<ul>";
        //                 for (var item of s.no) {
        //                     str += `<li>${item.items}</li>`;
        //                 }
        //                 str += "</ul>";
        //                 return str;
        //             }
        //         });
        return {
          total: result.info.total,
          data: result.data
        }
      });
  }

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

  contextShowCallback(index, name, data) {
    switch (name) {
      case "print":
        return data.isPosted;
      default:
        return true;
    }
  }

  posting() {
    if (this.dataToBePosted.length > 0) {
      this.service.post(this.dataToBePosted).then(result => {
        this.table.refresh();
      }).catch(e => {
        this.error = e;
      })
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

    // pushDataToBePosting(item) {
    //     if (item.isPosting) {
    //         this.dataToBePosting.push(item);
    //     }
    //     else {
    //         var index = this.dataToBePosting.indexOf(item);
    //         this.dataToBePosting.splice(index, 1);
    //     }
    // }

    // back() {
    //     this.router.navigateToRoute('list');
    // }

    // posting() {
    //     if (this.dataToBePosting.length > 0) {
    //         this.service.post(this.dataToBePosting).then(result => {
    //             this.info.keyword = '';
    //             this.loadPage();
    //         }).catch(e => {
    //             this.error = e;
    //         })
    //     }
    // }

    

    // view(data) {
    //     this.router.navigateToRoute('view', { id: data._id });
    // }

    

    // tooglePostingTrue() {
    //     this.isPosting = true;
    //     this.isPrint = false;
    // }

    // tooglePostingFalse() {
    //     this.isPosting = false;
    //     this.isPrint = false;
    // }

    // exportPDF(data) {
    //     this.service.getPdfById(data._id);
    // }  
}
