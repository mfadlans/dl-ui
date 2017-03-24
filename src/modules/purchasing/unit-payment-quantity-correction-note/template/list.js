import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"


export class listItem {

  @bindable listItem;
  

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    console.log(this.data);
  }  

  controlOptions = {
    control: {
      length: 12
    }
  };

  
}
