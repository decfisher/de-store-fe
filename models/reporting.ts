// Responses
export interface TotalRevenueResponse {
    start: Date;
    end: Date;
    total_revenue: TotalRevenue[];
}

export interface LoyaltyUsageResponse {
    start: Date;
    end: Date;
    loyalty_usage: LoyaltyUsage[];
}

export interface DiscountUsageResponse {
    start: Date;
    end: Date;
    discount_usage: DiscountUsage[];
}

export interface ProductPurchaseResponse {
    start: Date;
    end: Date;
    most_popular_products: ProductPurchase[];
}

export interface ProductRevenueResponse {
    start: Date;
    end: Date;
    total_revenue_by_product: ProductRevenue[];
}

// Models
export interface TotalRevenue {
    total_revenue: number;
}

export interface LoyaltyUsage {
    loyalty_discount_type: string;
    count: number;
}

export interface DiscountUsage {
    discount_type: string;
    count: number;
}

export interface ProductPurchase {
    name: string;
    total_purchased: number;
}

export interface ProductRevenue {
    name: string;
    total_revenue: number;
}