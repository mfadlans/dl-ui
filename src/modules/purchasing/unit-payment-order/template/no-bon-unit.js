import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

var UnitReceiptNoteBySupplierByUnit = require('../../../../loader/unit-receipt-note-by-supplier-by-unit-loader');

export class NoPurchaseRequest {
  // @bindable readOnly = false;
  // @bindable prReadOnly = false;
  // @bindable purchaseRequest;

  columns = [
    {header: "Barang", value: "product"}, 
    {header: "Jumlah", value: "deliveredQuantity"}, 
    {header: "Satuan", value: "deliveredUom"}, 
    {header: "Harga Satuan", value: "pricePerDealUnit"}, 
    {header: "Total Harga", value: ""}, ];
  
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    console.log(this.data);

    
  }

  // purchaseRequestFilter = { isPosted: true  };

  get unitReceiptNoteBySupplierByUnit() {
        return UnitReceiptNoteBySupplierByUnit;
    }

  controlOptions = {
    control: { 
      length: 12
    }
  };
} 
