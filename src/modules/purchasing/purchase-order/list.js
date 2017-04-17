import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    rowFormatter(data, index) {
        if (data.isPosted)
            return { classes: "success" }
        else
            return {}
    }
    context = ["detail"]

    columns = [
        { field: "purchaseRequest.no", title: "Nomor PR" },
        {
            field: "purchaseRequest.date", title: "Tanggal PR", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        {
            field: "purchaseRequest.expectedDeliveryDate", title: "Tanggal Diminta Datang", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "unit.division.name", title: "Divisi" },
        { field: "unit.name", title: "Unit" },
        { field: "category.name", title: "Kategori" },
        { field: "_createdBy", title: "Staff Pembelian" },
        {
            field: "isPosted", title: "Status Post",
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
            select: ["purchaseRequest.no", "purchaseRequest.date", "purchaseRequest.expectedDeliveryDate", "unit.division.name", "unit.name", "category.name", "_createdBy", "isPosted"],
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
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}
