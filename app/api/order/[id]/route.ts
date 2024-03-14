import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const { params } = context;
    let username = process.env.WC_CONSUMER_KEY;
    let password = process.env.WC_CONSUMER_SECRET;
    const encodedAuth = btoa(`${username}:${password}`);
    try {
        const response = await fetch("https://merablog.merakommunikation.se/wp-json/wc/v3/orders/" + params.id, {
            headers: {
                'Authorization': `Basic ${encodedAuth}`,
            },
        })
    
        const data = await response.json();
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        return NextResponse.json(error.response.data, {status: 400});
    }
}