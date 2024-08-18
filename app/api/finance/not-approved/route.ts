import { NextRequest, NextResponse } from 'next/server';

export async function GET (req: NextRequest) {
    try {
        const response = await fetch(`${process.env.FINANCE_SERVICE_URL}/not-approved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
            next: { revalidate: 0 },
        });
        
        if (!response.ok) {
            throw new Error('Error fetching customers')
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' })
    }
}