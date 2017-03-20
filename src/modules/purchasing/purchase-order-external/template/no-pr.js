import { inject, bindable, computedFrom } from 'aurelia-framework';

var PurchaseRequestPostedLoader = require('../../../../loader/purchase-request-posted-loader');

export class NoPurchaseRequest {
  @bindable readOnly = false;
  @bindable prReadOnly = false;
  @bindable purchaseRequest;
  
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }

  get purchaseRequestPostedLoader() {
        return PurchaseRequestPostedLoader;
    }

  controlOptions = {
    control: { 
      length: 12
    }
  };
} 
