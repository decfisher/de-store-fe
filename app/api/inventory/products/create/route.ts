import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
    try {
        const { name } = await req.json();

        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
            })
        });
        
        if (!response.ok) {
            throw new Error('Error adding product')
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' })
    }
}