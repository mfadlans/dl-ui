import { inject, bindable, computedFrom } from 'aurelia-framework';

export class Profile {
    @bindable data = {};
    @bindable error = {};
    constructor(router, service) {
    }
}
