import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"


export class Details {
  total;

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    console.log(this.data);

    this.data.product.toString = function () {
      return [this.code, this.name]
        .filter((item, index) => {
          return item && item.toString().trim().length > 0;
        }).join(" - ");
    }

    //count total from deliveredQuantity * priceDealPerUnit
    this.total = 0;
    this.total = this.data.deliveredQuantity * this.data.pricePerDealUnit;

  }

  controlOption = {
    control: {
      length: 12
    }
  }

}
