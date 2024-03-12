
import { NextResponse } from "next/server";


export async function GET(){

    return NextResponse.json("i am sajjad")
}
let username = "PK250113_0a0956f8edfc";
let password = "tFAcWacQN4SzUNzq";
 

export async function POST(req: any, res: any) {
    try {
        const bodyData = {
            locale: "sv-SE",
            purchase_country: "SE",
            purchase_currency: "SEK",
            order_amount: 5000,
            order_lines: [
                {
                    type: 'physical',
                    reference: '1',
                    name: 'Classic Low Bridge Sunglasses',
                    color: 'White',
                    size: 'Small',
                    imgSrc: '/sunglasses2-min.jpg',
                    quantity: 1,
                    quantity_unit: 'pcs',
                    unit_price: 5000,
                    tax_rate: 0,
                    total_amount: 5000,
                    total_tax_amount: 0,
                }
            ],
            intent: "buy",
            merchant_urls: {
                authorization: "https://edvardson.netlify.app/kassa?order=successful"
            }
        };

     

        // Encode username and password for Basic authentication
        const encodedAuth = btoa(`${username}:${password}`);

        // Fetch API request
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
        console.log('Klarna response:', klarnaData);

        // Return Klarna response as JSON
        return NextResponse.json({ message: "Klarna session created successfully", data: klarnaData });
    } catch (error) {
        console.error("Error processing POST request:", error);

        // If an error occurs, send an appropriate error response
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

 
