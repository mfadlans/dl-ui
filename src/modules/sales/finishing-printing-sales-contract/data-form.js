import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
var moment = require('moment');
import { Service } from './service';

var BuyersLoader = require('../../../loader/buyers-loader');
var ComodityLoader = require('../../../loader/comodity-loader');
var OrderTypeLoader = require('../../../loader/order-type-loader');
var ProductLoader = require('../../../loader/products-loader');
var MaterialConstructionLoader = require('../../../loader/material-loader');
var YarnMaterialLoader = require('../../../loader/yarn-material-loader');
var UomLoader = require('../../../loader/uom-loader');
var QualityLoader = require('../../../loader/quality-loader');

@inject(BindingEngine, Element, Service)
export class DataForm {
  @bindable readOnly = false;
  // @bindable data;
  // @bindable error;
   @bindable data = {};
  @bindable error = {};


  @bindable title;

  lampHeader = [{ header: "Standar Lampu" }];
  
  pointSystemOptions = [10, 4];

  tagsFilter = { tags: { "$regex": "material", "$options": "i" } };
    
  constructor(bindingEngine, element, service) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;

    // this.filterMaterial = {
    //   "tags" :"material"
    // };
  }

  @computedFrom("data.dataId")
  get isEdit() {
    return (this.data.dataId || '').toString() != '';
  }

  @computedFrom("data.orderType")
  get isPrinting(){
      this.printing=false;
      if(this.data.orderType){
        if(this.data.orderType.name.toLowerCase()=="printing"){
          this.printing=true;
        }
      }
    
    return this.printing;
  }

  @computedFrom("data.pointSystem")
  get point(){
    this.pointSyst=false;
    if(this.data.pointSystem===4){
      this.pointSyst=true;
    }
    return this.pointSyst;
  }
  
  @computedFrom("data.buyer")
  get buyerType(){
    this.ekspor=false;
    if(this.data.buyer){
      if(this.data.buyer.type.toLowerCase()=="ekspor"||this.data.buyer.type.toLowerCase()=="export"){
          this.ekspor=true;
        }
    }
      return this.ekspor;
  }

  @computedFrom("data.buyer")
  get isFilterPayment(){
    this.filterpayment = {
        "isExport": false
      };
      if(this.data.buyer){
        if(this.data.buyer.type.toLowerCase()=="ekspor"||this.data.buyer.type.toLowerCase()=="export"){
              this.filterpayment = {
                "isExport": true
              };
            }
      }
      return this.filterpayment;
  }
  
    orderChanged(e){
        var selectedOrder=e.detail || {};
        if(selectedOrder){
            this.data.orderTypeId=selectedOrder._id ? selectedOrder._id : "";
            if (!this.readOnly) {
                this.data.designMotive={};
                this.designMotiveChanged({});
            }
        }
      console.log('order type changed')
      }

  


  // materialChanged(e) {
  //   // var selectedMaterial = e.detail || {};
  //   // if (selectedMaterial) {
  //   //   this.data.materialId = selectedMaterial._id ? selectedMaterial._id : "";
  //   // }
  //   console.log('material changed')
  //   console.log(this.data)
  // }

  productChanged(e) {
        console.log('product changed')
        console.log(this.data)
    }

  designMotiveChanged(e){
    var selectedMotive = e.detail || {};
    if (selectedMotive) {
      this.data.designMotiveId = selectedMotive._id ? selectedMotive._id : "";
    }
  }

  constructionChanged(e) {
    var selectedConstruction = e.detail || {};
    if (selectedConstruction) {
      this.data.materialConstructionId = selectedConstruction._id ? selectedConstruction._id : "";
    }
  }

  termOfPaymentChanged(e){
    var selectedPayment=e.detail || {};
    if (selectedPayment) {
      this.data.termOfPaymentId = selectedPayment._id ? selectedPayment._id : "";
    }
    
  }

  comodityChanged(e){
    var selectedComodity = e.detail || {};
    if (selectedComodity) {
      this.data.comodityId = selectedComodity._id ? selectedComodity._id : "";
    }
  }

  pointChanged(e){
    var selectedPoint= e.srcElement.value;
    this.isPoint=false;
    if(selectedPoint==4){
      this.isPoint=true;
    }
    this.data.pointLimit=0;
  }

  uomChanged(e) {
    var selectedUom = e.detail;
    if (selectedUom) {
      this.data.uomId = selectedUom._id;
      if (this.data.details) {
        for (var i of this.data.details) {
          i.uom = selectedUom;
          i.uomId = selectedUom._id;
        }
      }
    }
  }

  buyerChanged(e) {
    var selectedBuyer = e.detail;
    if (selectedBuyer) {
      this.data.buyerId = selectedBuyer._id ? selectedBuyer._id : "";
      if(selectedBuyer.type.toLowerCase()=="ekspor"||selectedBuyer.type.toLowerCase()=="export"){
        this.filterpayment = {
          "isExport": true
        };
      }
      else{
        this.filterpayment = {
          "isExport": false
        };
      }
      if (!this.readOnly) {
          this.data.agent={};
          this.agentChanged({});
          this.data.termOfPayment={};
          this.termOfPaymentChanged({});
          this.data.designMotive={};
          this.designMotiveChanged({});
          this.data.remark="";
          this.data.useIncomeTax=false;
          this.data.termOfShipment="";
      }
          
    }
  }

  comodityChanged(e) {
    console.log('comodity changed')
  }

  orderChanged(e) {
    console.log('order changed')
  }

  agentChanged(e) {
    var selectedAgent = e.detail|| {};
    if (selectedAgent) {
      this.data.agentId = selectedAgent._id ? selectedAgent._id : "";
      if(!this.readOnly){
        this.data.comission="";
      }
    }
    else{
      this.data.comission="";
    }
  }

  yarnChanged(e) {
    var selectedYarn = e.detail || {};
    if (selectedYarn) {
      this.data.yarnMaterialId = selectedYarn._id ? selectedYarn._id : "";
    }
  }

  bankChanged(e) {
    var selectedAccount = e.detail || {};
    if (selectedAccount) {
      this.data.accountBankId = selectedAccount._id ? selectedAccount._id : "";
    }
  }

  useIncomeTaxChanged(e) {
        this.data.details.length=0;
    }

  qualityChanged(e){
    var selectedQuality = e.detail || {};
    if (selectedQuality) {
      this.data.qualityId = selectedQuality._id ? selectedQuality._id : "";
    }
  }

  bind() {
    this.data = this.data || {};
    this.data.details = this.data.details || [];
  }


  get detailHeader(){
    if(!this.data.useIncomeTax){
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }];
    }
    else{
      return [{ header: "Warna" }, { header: "Harga" }, { header: "Mata Uang" }, {header: "Include PPn?"}]; 
    }
  } 
  
  get addDetail(){
    return (event) => {
      var newDetail=   {
            currency: this.data.accountBank.currency,
            color: '',
            price: 0,
            UseIncomeTax : false
          };
      this.data.details.push(newDetail);
    };
  }

  get buyersLoader() {
        return BuyersLoader;
    }

  get comodityLoader() {
    return ComodityLoader;
  }

  get orderTypeLoader() {
    return OrderTypeLoader;
  }

  get productLoader() {
        return ProductLoader;
    }

  get materialConstructionLoader() {
    return MaterialConstructionLoader;
  }

  get yarnMaterialLoader() {
    return YarnMaterialLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  get qualityLoader() {
    return QualityLoader;
  }
}
