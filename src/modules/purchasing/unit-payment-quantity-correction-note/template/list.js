import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"


export class listItem {

  @bindable item;


  activate(context) {
    console.log("item")
    this.context = context;
    this.listItem = context.data;
    this.error = context.error; 
  }

  controlOptions = {
    control: {
      length: 12
    }
  };


}
