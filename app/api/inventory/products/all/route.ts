import { NextResponse } from 'next/server';

export async function GET () {
    try {
        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error fetching products')
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' })
    }
}