import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
var UnitLoader = require('../../../loader/unit-loader');
var SupplierLoader = require('../../../loader/supplier-loader');
var DeliveryOrderLoader = require('../../../loader/delivery-order-loader');

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    get deliveryOrderLoader() {
      return DeliveryOrderLoader;
    }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    @computedFrom("data.supplier")
    get filter() {
        var filter = {
            unitId: this.data.unitId,
            supplierId: this.data.supplier._id
        }
        return filter;
    }

    bind() {
        if (this.data && this.data.supplier)
            this.data.supplier.toString = function () {
                return this.code + " - " + this.name;
            };
    }

    supplierChanged(e) {
        var selectedSupplier = e.detail || {};
        if (selectedSupplier) {
            this.data.supplierId = selectedSupplier._id ? selectedSupplier._id : "";
            if (!this.readOnly) {
                this.data.items = [];
                this.data.deliveryOrder = {};
                this.deliveryOrderChanged({});
            }
        }
    }

    unitChanged(e) {
        var selectedUnit = e.detail || {};
        if (selectedUnit) {
            this.data.unitId = selectedUnit._id ? selectedUnit._id : "";
            if (!this.readOnly) {
                this.data.items = [];
                this.data.deliveryOrder = {};
                this.deliveryOrderChanged({});
            }
        }
    }

    deliveryOrderChanged(e) {
        var selectedDo = e.detail || {};
        if (selectedDo) {
            this.data.deliveryOrderId = selectedDo._id;
            var selectedItem = selectedDo.items || []
            var _items = [];
            for (var item of selectedItem) {
                for (var fulfillment of item.fulfillments) {
                    var _item = {};
                    if (fulfillment.purchaseOrder.unitId == this.data.unitId) {
                        _item.product = fulfillment.product;
                        _item.deliveredUom = fulfillment.purchaseOrderUom;
                        _item.purchaseOrder = fulfillment.purchaseOrder;
                        _item.purchaseOrderId = fulfillment.purchaseOrderId;
                        _item.purchaseOrderQuantity = fulfillment.purchaseOrderQuantity;
                        _item.currency = fulfillment.purchaseOrder.currency;
                        _item.currencyRate = fulfillment.purchaseOrder.currencyRate;

                        var total = fulfillment.realizationQuantity
                            .map(qty => qty.deliveredQuantity)
                            .reduce((prev, curr, index) => {
                                return prev + curr;
                            }, 0);

                        _item.deliveredQuantity = fulfillment.deliveredQuantity - total;

                        for (var _poItem of fulfillment.purchaseOrder.items) {
                            if (_poItem.product._id == fulfillment.product._id) {
                                _item.pricePerDealUnit = _poItem.pricePerDealUnit;
                                break;
                            }
                        }
                        if (_item.deliveredQuantity > 0)
                            _items.push(_item);
                    }
                }
            }
            this.data.items = _items;
        }
        else {
            this.data.items = [];
        }
        this.resetErrorItems();
    }

    resetErrorItems() {
        if (this.error) {
            if (this.error.items) {
                this.error.items = [];
            }
        }
    }
} 
