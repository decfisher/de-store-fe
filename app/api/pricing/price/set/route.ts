import { NextRequest, NextResponse } from 'next/server';

export async function PATCH (req: NextRequest) {
    try {
        const { productId, price } = await req.json();

        const response = await fetch(`${process.env.PRICING_SERVICE_URL}/price/set`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId,
                price,
            })
        });
        
        if (!response.ok) {
            console.error(response);
            throw new Error('Error updating price');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}