import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//     return NextResponse.json({name: "Billa"})
// }

export async function POST(req: NextRequest, res: NextResponse) {
    let username = process.env.KLARNA_USERNAME;
    let password = process.env.KLARNA_PASSWORD;
    
    try {
        console.log(req.body)
        const bodyData = req.body
        const encodedAuth = btoa(`${username}:${password}`);

        const klarnaResponse = await fetch("https://api.playground.klarna.com/payments/v1/sessions", {
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
        return NextResponse.json({ message: "Klarna session created successfully", data: klarnaData });

    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
