
import { NextResponse } from "next/server";


export async function GET(){

    return NextResponse.json("i am sajjad")
}

export async function POST(req: any, res: any) {
    try {
        const bodyData = {
            locale: "sv-SE",
            purchase_country: "SE",
            purchase_currency: "SEk",
            order_amount: 5000,
            order_lines: [
                {
                    type: 'physical',
                    reference: '1',
                    name: 'Classic Low Bridge Sunglasses',
                    color: 'White',
                    size: 'Small',
                    imgSrc: '/sunglasses2-min.jpg',
                    quantity: 0,
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
        
        }
        let username = "PK250113_0a0956f8edfc";
        let password = "tFAcWacQN4SzUNzq";
     // Assuming you have 'username' and 'password' variables defined
    
    // Encode username and password for Basic authentication
    const encodedAuth = btoa(`${username}:${password}`);
     
    // Fetch API request
    fetch("https://api.playground.klarna.com/payments/v1/sessions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedAuth}`,
        },
    
        body: JSON.stringify(bodyData),
      
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
         return NextResponse.json({ message: "Data received successfully", data: response.json() });
      //  return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('error:', error);
    });
       
    } catch (error) {
        console.error("Error processing POST request:", error);

        // If an error occurs, send an appropriate error response
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
