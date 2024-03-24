import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
    const { params } = context;
    const WC_CONSUMER_KEY = "ck_2ddbb0b7040f6f141bf1392850465250cc6ee35f"
    const WC_CONSUMER_SECRET = "cs_cba1a0cb85e35ff19a6843e4e3a2dddfcc5ed2a3"
    // let username = process.env.WC_CONSUMER_KEY;
    // let password = process.env.WC_CONSUMER_SECRET;
    let username = WC_CONSUMER_KEY;
    let password = WC_CONSUMER_SECRET;
    const encodedAuth = btoa(`${username}:${password}`);


    try {
        const response = await fetch("https://admin.edvardson.se/wp-json/wc/v3/orders/" + params.id, {
            headers: {
                'Authorization': `Basic ${encodedAuth}`,
            },
        })

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(error.response.data, { status: 400 });
    }
}