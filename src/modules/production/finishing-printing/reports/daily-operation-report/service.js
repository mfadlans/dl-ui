import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/daily-operation-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getReport(sdate, edate, machine) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (machine) {
            if (query === '') query = `machine=${machine._id}`;
            else query = `${query}&machine=${machine._id}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, machine) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (machine) {
            if (query === '') query = `machine=${machine._id}`;
            else query = `${query}&machine=${machine._id}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.getXls(endpoint);
    }
}