import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');

var SupplierLoader = require('../../../loader/supplier-loader');
var CurrencyLoader = require('../../../loader/currency-loader');
var VatLoader = require('../../../loader/vat-loader');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly;
    @bindable data;
    @bindable error;
    @bindable title;
    // @bindable purchaseRequest;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }

    termPaymentOptions = ['CASH', 'KREDIT', 'DP (DOWN PAYMENT) + BP (BALANCE PAYMENT)', 'DP (DOWN PAYMENT) + TERMIN 1 + BP (BALANCE PAYMENT)', 'RETENSI'];
    
    freightCostByOptions = ['Penjual', 'Pembeli'];

    PRColumns = [
      { header: "Nomor PR", value: "purchaseRequest.no" },
    ]


    // addItem() {
    //     this.data.items = this.data.items ? this.data.items : [];
    //     this.data.items.push({ showDetails: false });
    // }

    // removeItem(item) {
    //     var itemIndex = this.data.items.indexOf(item);
    //     this.data.items.splice(itemIndex, 1);
    // }


    supplierChanged(e) {
        // var selectedSupplier = e.detail;
        var selectedSupplier = this.data.supplier;
        if (selectedSupplier)
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
    }

    currencyChanged(e) {
        // var selectedCurrency = e.detail;
        var selectedCurrency = this.data.currency;
        if (selectedCurrency) {
            var currencyRate = parseInt(selectedCurrency.rate ? selectedCurrency.rate : 1, 10);
            this.data.currencyRate = currencyRate;
        }
        else
            this.data.currencyRate = 0;
    }

    paymentMethodChanged(e) {
        var selectedPayment = e.srcElement.value;
        if (selectedPayment) {
            this.data.paymentMethod = selectedPayment;
            if (this.data.paymentMethod == "CASH") {
                this.data.paymentDueDays = 0;
            }
            else {
                this.data.paymentDueDays = 30;
            }
        }
    }

    vatChanged(e) {
        var selectedVat = this.data.vat;
        if (selectedVat) {
            this.data.vatRate = selectedVat.rate ? selectedVat.rate : 0;
            // this.data.vatRate = this.data.vate.rate ? this.data.vat.rate : 0;
            this.data.useVat = true;
        }
        else {
            this.data.vatRate = 0;
            this.data.useVat = false;
        }
        console.log(this.data)
    }

    useIncomeTaxChanged(e) {
        // var selectedUseIncomeTax = e.srcElement.checked || false;
        var selectedUseIncomeTax = this.data.useIncomeTax;
        if (!selectedUseIncomeTax) {
            for (var po of this.data.items) {
                for (var poItem of po.items) {
                    poItem.useIncomeTax = false;
                    poItem.pricePerDealUnit = poItem.priceBeforeTax;
                }
            }
        }
    }

    get addItems() {
    return (event) => {
      this.data.items.push({})
    };
  }

  get removeItems() {
    return (event) => console.log(event);
  }


    get supplierLoader(){
      return SupplierLoader;
    }

    get currencyLoader(){
      return CurrencyLoader;
    }

    get vatLoader(){
      return VatLoader;
    }

} 
