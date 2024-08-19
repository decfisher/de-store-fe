export interface Product {
    id: string;
    name: string;
    quantity: number;
    price: number;
    discount: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum Discount {
    NONE = 'None',
    BOGOF = 'Buy One Get One Free',
    THREE_FOR_TWO = '3 for 2',
    FREE_DELIVERY = 'Free Delivery',
}