import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
var DivisionLoader = require('../../../loader/division-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var CategoryLoader = require('../../../loader/category-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var VatLoader = require('../../../loader/vat-loader');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable title;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];

    columns = [ { header: "Nomor Bon Unit - Nomor Surat Jalan ", value: "UnitReceiptNote.no" }];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    // bind() {
    //     if (this.data && this.data.supplier)
    //         this.data.supplier.toString = function () {
    //             return this.code + " - " + this.name;
    //         };
    // }
    bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    // if (this.data && this.data.supplier)
    //         this.data.supplier.toString = function () {
    //             return this.code + " - " + this.name;
    //         };

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }


    @computedFrom("data.division", "data.supplier", "data.category", "data.paymentMethod", "data.currency", "data.vatRate", "data.useIncomeTax")
    get filter() {
        var filter = {
            divisionId: this.data.divisionId,
            supplierId: this.data.supplierId,
            categoryId: this.data.categoryId,
            paymentMethod: this.data.paymentMethod,
            currencyCode: (this.data.currency || {}).code || "",
            vatRate: this.data.vatRate,
            useIncomeTax: this.data.useIncomeTax
        }
        return filter;
    }

    supplierChanged(e) {
        var selectedSupplier = e.detail || {};
        if (selectedSupplier) {
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
            this.data.items = [];
            this.resetErrorItems();
        }

    }
    divisionChanged(e) {
        var selectedDivision = e.detail || {};
        if (selectedDivision) {
            this.data.divisionId = selectedDivision._id ? selectedDivision._id : "";
            this.data.items = [];
            this.resetErrorItems();
        }
    }
    currencyChanged(e) {
        var selectedCurrency = e.detail || {};
        if (selectedCurrency) {
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.paymentMethod = selectedPayment ? selectedPayment : "";
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    categoryChanged(e) {
        var selectedCategory = e.detail || {};
        if (selectedCategory) {
            this.data.categoryId = selectedCategory._id ? selectedCategory._id : "";
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    vatChanged(e) {
        var selectedVat = e.detail || {};
        this.data.vatRate = this.data.vatRate ? this.data.vatRate : 0;
        this.data.useIncomeTax = this.data.useIncomeTax ? this.data.useIncomeTax : false;
        if (selectedVat) {
            this.data.vatRate = selectedVat.rate ? selectedVat.rate : 0;
            this.data.items = [];
            this.resetErrorItems();
        }
    }

    useVatChanged(e) {
        this.data.items = [];
        this.data.vat = {};
        this.data.vatRate = 0;
        this.data.vatNo = "";
        this.data.vatDate = null;
    }

    useIncomeTaxChanged(e) {
        this.data.items = [];
        this.data.incomeTaxNo = "";
        this.data.incomeTaxDate = null;
    }

    get divisionLoader() {
      return DivisionLoader;
    }

    get supplierLoader() {
      return SupplierLoader;
    }

    get categoryLoader() {
      return CategoryLoader;
    }

    get currencyLoader() {
      return CurrencyLoader;
    }

    get vatLoader() {
      return VatLoader;
    }

    addItem() {
        this.data.items = this.data.items ? this.data.items : [];
        this.data.items.push({ showDetails: false });
    }

    removeItem(item) {
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }

    get addItems() {
    return (event) => {
      this.data.items.push({})
    };
  }

  get removeItems() {
    return (event) => console.log(event);
  }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }

} 
