import { Discount } from "@/models/product";

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