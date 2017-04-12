import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

var PurchaseRequestLoader = require('../../../../loader/purchase-request-loader');

export class NoPurchaseRequest {
  // @bindable readOnly = false;
  // @bindable prReadOnly = false;
  // @bindable purchaseRequest;

  columns = [
    {header: "Barang", value: "product"}, 
    {header: "Jumlah", value: "defaultQuantity"}, 
    {header: "Satuan", value: "uom"}, 
    {header: "Jumlah", value: "dealQuantity"}, 
    {header: "Satuan", value: "dealUom"}, 
    {header: "Konversi", value: "conversion"}, 
    {header: "Harga", value: "priceBeforeTax"},
    {header: "Incl Ppn?", value: "useIncomeTax"}, 
    {header: "Ket.", value: "remark"} ];
  
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    console.log(this.data);

  }

  purchaseRequestFilter = { isPosted: true  };

  get purchaseRequestLoader() {
        return PurchaseRequestLoader;
    }

  // purchaseRequestChanged(newValue) {
  //   this.data.purchaseRequest = newValue;
  //   if (this.data.purchaseRequest) {
  //     var _items = [];
  //     this.data.purchaseRequestId = this.data.purchaseRequest._id;

  //     this.data.purchaseRequest.items.map((item) =>{
  //       var _item = {};
  //       _item.product = item.product;
  //       _item.defaultQuantity = item.defaultQuantity;
  //       _item.uom = item.uom;
  //       _item.dealUom = item.dealUom;
  //       _item.conversion = item.conversion;
  //       _item.priceBeforeTax = item.priceBeforeTax;
  //       _item.useIncomeTax = item.useIncomeTax;
  //       _item.remark = item.remark;
  //       _item.push(_item);
  //     })
  //     this.data.items = _items;
  //   }
  //   else {
  //     this.data.purchaseRequest = {};
  //     this.data.purchaseRequestId = {};
  //     this.data.items = [];
  //   }
  // }

  controlOptions = {
    control: { 
      length: 12
    }
  };
} 
