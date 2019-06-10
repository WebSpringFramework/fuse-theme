import { FuseUtils } from '@fuse/utils';

export class Order
{
    code: string;
    channel: string;
    customer: any;
    shipping_address: any;
    billing_address: any;
    shipping_method: any;
    shipping_carrier: any;
    shipping_cost: any;
    shipped_date: any;
    items: any[];
    payments: any; 


    // id: string;
    reference: string;
    subtotal: string;
    tax: string;
    discount: string;
    total: string;
    date: string;
    // // customer: any;
    // products: any[];
    status: any[];
    // payment: any;
    // shippingDetails: any[];

    /**
     * Constructor
     *
     * @param order
     */
    constructor(order?)
    {
        order = order || {};
        
        this.code = order.code || 'vazio';
        this.channel = order.channel || 'vazio';
        this.customer = order.customer || {};
        this.billing_address = order.billing_address || {};
        this.shipping_address = order.shipping_address || {};
        this.shipping_method = order.shipping_method || 'vazio';
        this.shipping_carrier = order.shipping_carrier || 'vazio';
        this.shipping_cost = order.shipping_cost || 'vazio';
        this.shipped_date = order.shipped_date || 'vazio';    
        this.items = order.items || [];
        this.payments = order.payments || {};


        // this.id = order.id || FuseUtils.generateGUID();
        this.reference = order.reference || FuseUtils.generateGUID();
        this.subtotal = order.subtotal || 0;
        this.tax = order.tax || 0;
        this.discount = order.discount || 0;
        this.total = order.total || 0;
        this.date = order.date || '';
        // // this.customer = order.customer || {};
        // this.products = order.items || [];
        this.status = order.status || [];
        // this.payment = order.payment || {};
        // // this.shippingDetails = order.shippingDetails || [];
    }
}
