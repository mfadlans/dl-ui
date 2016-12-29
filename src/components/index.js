
export function configure(config) {
    config.globalResources(
        './dialog/dialog',
        './form/pagination',

        './form/basic/checkbox',
        './form/basic/datepicker',
        './form/basic/dropdown',
        './form/basic/multiline',
        './form/basic/numeric',
        './form/basic/radiobutton',
        './form/basic/textbox',
        './form/basic/auto-suggest',

        './customs/auto-suggests/budget-auto-suggest',
        './customs/auto-suggests/buyer-auto-suggest',
        './customs/auto-suggests/category-auto-suggest',
        './customs/auto-suggests/currency-auto-suggest',
        './customs/auto-suggests/delivery-order-auto-suggest',
        './customs/auto-suggests/delivery-order-auto-suggest-by-supplier',
        './customs/auto-suggests/division-auto-suggest',
        './customs/auto-suggests/finishing-printing-construction-auto-suggest-by-material-by-process-type',
        './customs/auto-suggests/finishing-printing-material-auto-suggest-by-process-type',
        './customs/auto-suggests/lamp-standard-auto-suggest',
        './customs/auto-suggests/machine-auto-suggest',
        './customs/auto-suggests/purchase-order-auto-suggest',
        './customs/auto-suggests/purchase-order-external-auto-suggest',
        './customs/auto-suggests/purchase-request-auto-suggest',
        './customs/auto-suggests/supplier-auto-suggest',
        './customs/auto-suggests/thread-auto-suggest',
        './customs/auto-suggests/unit-auto-suggest',
        './customs/auto-suggests/unit-payment-order-auto-suggest',
        './customs/auto-suggests/unit-receipt-note-auto-suggest',
        './customs/auto-suggests/uom-auto-suggest',
        './customs/auto-suggests/uster-auto-suggest',
        './customs/auto-suggests/vat-auto-suggest',

        './customs/collections/delivery-order/delivery-order-item-collection',
        './customs/collections/purchase-order/purchase-order-item-collection',
        './customs/collections/production-order/production-order-detail-collection',
        './customs/collections/purchase-order-external/purchase-order-external-item-collection',
        './customs/collections/purchase-request/purchase-request-item-collection',
        './customs/collections/unit-payment-order/unit-payment-order-item-collection',
        './customs/collections/unit-payment-price-correction-note/unit-payment-price-correction-note-collection',
        './customs/collections/unit-payment-quantity-correction-note/unit-payment-quantity-correction-note-collection',
        './customs/collections/unit-receipt-note/unit-receipt-note-item-collection'
    );
}
