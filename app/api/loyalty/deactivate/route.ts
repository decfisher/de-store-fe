import { NextRequest, NextResponse } from 'next/server';

export async function PATCH (req: NextRequest) {
    try {
        const { id } = await req.json();

        const response = await fetch(`${process.env.LOYALTY_SERVICE_URL}/deactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            })
        });
        
        if (!response.ok) {
            console.error(response);
            throw new Error('Error deactivating loyalty scheme');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}