export interface Product {
    sku: string,
    name: string,
    description: string,
    status: string,
    qty: Number,
    price: Number,
    promotional_price: Number,
    cost: Number,
    weight: Number,
    height: Number,
    width: Number,
    length: Number,
    brand: string,
    ean: string,
    nbm: string,
    categories: Object[],
    images: string[],
    specifications: Object[],
    variations: Object[],
    variation_attributes: string[]
}