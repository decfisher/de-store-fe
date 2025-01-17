import { NextResponse } from 'next/server';

export async function GET (req: Request, { params }: { params: { id: string } }) {
    try {
        const product_id = params.id;
        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}/find/${product_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Error fetching product');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' });
    }
}