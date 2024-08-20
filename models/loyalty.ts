export interface LoyaltyRecord {
    id: string;
    name: string;
    active: boolean;
    last_active: Date;
}

export enum LoyaltyType {
    FIFTY_PERCENT_OFF = '50% Off Basket',
    ONE_ITEM_FREE = 'One Item Free',
    FREE_PRODUCT_NEXT_PURCHASE = 'One Product Free on Next Shop',
}