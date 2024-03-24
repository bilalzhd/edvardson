import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const accessToken = process.env.BAMBORA_ACCESS_TOKEN;
    const merchantNumber = process.env.BAMBORA_MERCHANT_NUMBER;
    const secretToken = process.env.BAMBORA_SECRET_TOKEN;

    const orderData = await req.json();

    const apiKey = btoa(accessToken + "@" + merchantNumber + ":" + secretToken);
    const response = await fetch("https://api.v1.checkout.bambora.com/sessions", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
            "Authorization": "Basic " + apiKey,
            "Content-Type": "application/json",
        }
    })
    const text = await response.text()

    return NextResponse.json({token: text});
}