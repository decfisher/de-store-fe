import { NextRequest, NextResponse } from 'next/server';

export async function PATCH (req: NextRequest) {
    try {
        const { id, quantity } = await req.json();

        let url = `${process.env.INVENTORY_SERVICE_URL}/add-stock`;
        let quantityValue = quantity;

        if (quantity < 0) {
            url = `${process.env.INVENTORY_SERVICE_URL}/remove-stock`
            quantityValue = 0 - quantity;
        }

        console.log(url)

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                quantity: quantityValue,
            })
        });
        
        if (!response.ok) {
            throw new Error('Error updating product stock');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}