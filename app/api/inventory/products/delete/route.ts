import { NextRequest, NextResponse } from 'next/server';

export async function DELETE (req: NextRequest) {
    try {
        const { id } = await req.json();

        const response = await fetch(`${process.env.INVENTORY_SERVICE_URL}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
            })
        });
        
        if (!response.ok) {
            throw new Error('Error deleting product');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.error();
    }
}