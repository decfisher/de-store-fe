import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
    try {
        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
            next: { revalidate: 0 },
        });
        
        if (!response.ok) {
            throw new Error('Error fetching products');
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.log('INVENTORY URL:', process.env.INVENTORY_SERVICE_URL)
        return NextResponse.json({ error: 'Internal server error' })
    }
}