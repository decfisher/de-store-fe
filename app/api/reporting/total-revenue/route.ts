import { NextResponse, type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const start = searchParams.get('start');
        const end = searchParams.get('end');

        const response = await fetch(`${process.env.REPORTING_SERVICE_URL}/total-revenue?start=${start}&end=${end}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
            next: { revalidate: 0 },
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}