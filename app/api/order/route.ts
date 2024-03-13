import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse<ResponseData>) {
    let username = process.env.KLARNA_USERNAME;
    let password = process.env.KLARNA_PASSWORD;
    const bodyData = await req.json();

    try {
        
        const encodedAuth = btoa(`${username}:${password}`);

        const klarnaResponse = await fetch("https://api.playground.klarna.com/checkout/v3/orders", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedAuth}`,
            },
            body: JSON.stringify(bodyData)
        });

        if (!klarnaResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const klarnaData = await klarnaResponse.json();
        return NextResponse.json(({ message: "Klarna order created successfully", data: klarnaData }), {status: 201});

    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}