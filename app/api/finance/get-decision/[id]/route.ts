import { NextResponse } from 'next/server';

export async function GET (req: Request, { params }: { params: { id: string } }) {
    try {
        const customer_id = params.id;
        const response = await fetch(`${process.env.FINANCE_SERVICE_URL}/get-decision/${customer_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Error approving finance');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' });
    }
}