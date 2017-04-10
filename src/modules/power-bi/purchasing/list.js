import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';


@inject(Router, Service)
export class List {
    data = [];
    listReport = [
        "5316a960-fe55-46ee-a6ca-0f4ce2bf76c3",//Durasi PR
        "05486f63-28cd-49c1-a944-4629db6f5775",//Durasi PO Internal - PO Eksternal
        "aa2828c7-c136-411d-85fc-a27173629e0b",//Durasi PO Eksternal - Surat Jalan
        "f2dec423-9b47-42e3-9d82-6103c8132015",//Total Nilai Pembelian
        "b8e30ee2-eb32-485c-933b-f9fd91093d1f",//Supplier Tepat Waktu
        "0bee3506-5950-485b-9cda-6132e44c5764",//Perbandingan Purchase Order
        "2b455aa7-9d41-4c0c-883b-730454e428cd",//Top Ten Supplier per Total SPB
    ];
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    activate() {
        this.service.search('')
            .then(data => {
                for (var report of this.listReport) {
                    var _data = data.find((_data) => _data.id === report);
                    if (_data) {
                        this.data.push(_data);
                    }
                }
            })
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data.id });
    }
}
