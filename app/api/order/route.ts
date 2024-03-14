import { NextResponse } from "next/server";

export async function POST(req: Request) {
   
    let username = process.env.WC_CONSUMER_KEY;
    let password = process.env.WC_CONSUMER_SECRET;
    const bodyData = await req.json();

    try {

        const encodedAuth = btoa(`${username}:${password}`);
        const response = await fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wc/v3/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedAuth}`,
            },
            body: JSON.stringify(bodyData)
        });
        
        const data = await response.json();
        return NextResponse.json((data), { status: 201 });

    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}