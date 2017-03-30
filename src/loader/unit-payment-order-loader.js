import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const resource = 'unit-payment-orders/read-all';

const empty = {
    no: ''
}

'use strict';

module.exports = function(keyword, filter) {

  var config = Container.instance.get(Config);
  var endpoint = config.getEndpoint("purchasing");

  return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(paymentOrder => {
                        paymentOrder.toString = function () {
                            return `${this.no}`;
                        }
                        return paymentOrder;
                    })
                })
        
};








// export default class UnitPaymentOrderAutoSuggestReact extends AutoSuggestReact {
//     constructor(props) {
//         super(props);
//     }

//     init(props) {
//         var options = Object.assign({}, UnitPaymentOrderAutoSuggestReact.defaultProps.options, props.options);
//         var initialValue = Object.assign({}, empty, props.value);
//         initialValue.toString = function () {
//             return `${this.no}`;
//         };
//         this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
//     }
// }

// UnitPaymentOrderAutoSuggestReact.propTypes = {
//     options: React.PropTypes.shape({
//         readOnly: React.PropTypes.bool,
//         suggestions: React.PropTypes.oneOfType([
//             React.PropTypes.array,
//             React.PropTypes.func
//         ])
//     })
// };

// UnitPaymentOrderAutoSuggestReact.defaultProps = {
//     options: {
//         readOnly: false,
//         suggestions: function (keyword, filter) {
//             var config = Container.instance.get(Config);
//             var endpoint = config.getEndpoint("purchasing");

//             return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
//                 .then(results => {
//                     return results.data.map(paymentOrder => {
//                         paymentOrder.toString = function () {
//                             return `${this.no}`;
//                         }
//                         return paymentOrder;
//                     })
//                 })
//         }
//     }
// };