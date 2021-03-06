import { bindable, bindingMode, noView, inject, computedFrom } from "aurelia-framework";

@inject(Element)
export class _Control {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) label;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) error;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) readOnly;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) options;

  constructor(element) {
    this.element = element;
  }

  bind() {
    // console.log("control:bound");
  }
}
