import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ error: "Invalid method", status: 405 })
}

export async function POST(req: Request, res: any) {
    if (req.method !== "POST") {
        return NextResponse.json({ error: "Invalid method", status: 405 })
    }
    let username = process.env.KLARNA_USERNAME
    let password = process.env.KLARNA_PASSWORD
    try {
        const bodyData = await req.json();
        const encodedAuth = btoa(`${username}:${password}`);
        const klarnaResponse = await fetch(`${process.env.KLARNA_API_URL}/payments/v1/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedAuth}`,
            },
            body: JSON.stringify(bodyData),
        });


        const klarnaData = await klarnaResponse.json();
        if (!klarnaResponse.ok) {
            throw new Error('Network response was not ok', klarnaData);
        }

        return NextResponse.json({ message: "Klarna session created successfully", data: klarnaData });

    } catch (error) {
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
