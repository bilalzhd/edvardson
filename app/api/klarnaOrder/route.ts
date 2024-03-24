import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
    const data = await req.json();
    const authorizationToken = data.authorizationToken;
    const username = process.env.KLARNA_USERNAME;
    const password = process.env.KLARNA_PASSWORD;
    const encoded = btoa(`${username}:${password}`);
    const resp = await fetch(
        `${process.env.KLARNA_API_URL}/payments/v1/authorizations/${authorizationToken}/order`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + encoded
            },
            body: JSON.stringify(data.customerData)
        }
    );

    const responseData = await resp.json();
    return NextResponse.json({ data: responseData })

}