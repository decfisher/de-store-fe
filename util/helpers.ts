import { LoyaltyType } from '@/models/loyalty';
import { Discount } from '@/models/product';

export function formatToGBP(amount: number): string {
    return `£${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function formatDiscountCode(discount: string): string {
    if (discount === 'BOGOF') {
        return Discount.BOGOF;
    }

    if (discount === 'THREE_FOR_TWO') {
        return Discount.THREE_FOR_TWO;
    }

    if (discount === 'FREE_DELIVERY') {
        return Discount.FREE_DELIVERY;
    }

    if (discount === 'NONE') {
        return Discount.NONE;
    }

    return discount;
}

export function formatLoyaltyDiscount(loyalty: string): string {
    if (loyalty === 'FIFTY_PERCENT_OFF') {
        return LoyaltyType.FIFTY_PERCENT_OFF;
    }

    if (loyalty === 'ONE_ITEM_FREE') {
        return LoyaltyType.ONE_ITEM_FREE;
    }

    if (loyalty === 'FREE_PRODUCT_NEXT_PURCHASE') {
        return LoyaltyType.FREE_PRODUCT_NEXT_PURCHASE;
    }

    return loyalty;
}

export function formatDateString(dateInput: Date | string): string {
    // Convert to Date object if it's a string
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
        return '---'
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} at ${hours}:${minutes}`;
}