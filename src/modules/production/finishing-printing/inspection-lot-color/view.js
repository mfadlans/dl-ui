import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id); 
    
    this.data.kanban.toString = function () {
      return [this.productionOrder.orderNo, this.cart.cartNumber]
          .filter((item, index) => {
              return item && item.toString().trim().length > 0;
          }).join(" - ");
    }
  }

  cancelCallback(event) {
    this.router.navigateToRoute('list');
  }

  editCallback(event) {
    this.router.navigateToRoute('edit', { id: this.data._id });
  }   
   
  deleteCallback(event) {
    this.service.delete(this.data)
        .then(result => {
          this.cancelCallback();
        });
  }  
}