import { NextRequest, NextResponse } from 'next/server';

export async function PATCH (req: NextRequest) {
    try {
        const { id, quantity } = await req.json();

        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}/add-stock`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                quantity,
            })
        });
        
        if (!response.ok) {
            console.error(response);
            throw new Error('Error updating product stock');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}