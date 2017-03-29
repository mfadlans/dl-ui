import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

var PurchaseRequestPostedLoader = require('../../../../loader/purchase-request-posted-loader');

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

  get purchaseRequestPostedLoader() {
        return PurchaseRequestPostedLoader;
    }

  controlOptions = {
    control: { 
      length: 12
    }
  };
} 
