"use client"
import { AppContext } from '@/context';
import { createKlarnaCheckout } from '@/lib';
import { getCart } from '@/lib/store';
import { useContext, useEffect, useState } from 'react'


export default function KlarnaCheckout() {
    const [klarnaResponseData, setKlarnaResponseData] = useState<any>()

    
    useEffect(() => {
        // f();
    }, [])

    console.log(klarnaResponseData)


    return (
        <div>
            <img src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg" alt="" />
            <div dangerouslySetInnerHTML={{ __html: klarnaResponseData?.data?.html_snippet }}>
            </div>
        </div>

    )
}


// const bodyData = {
//     purchase_country: "SE",
//     purchase_currency: "SEK",
//     locale: "sv-SE",
//     order_amount: (cart as Cart)?.totals?.total,
//     order_tax_amount: (cart as Cart)?.totals?.total_tax,
//     order_lines: (cart as Cart)?.items?.length > 0 ? (cart as Cart).items.map((c: any) => ({
//             type: "physical",
//             reference: c.id,
//             name: c.name,
//             quantity: c.quantity.value,
//             quantity_unit: "pcs",
//             unit_price: Number(c.price),
//             tax_rate: c.totals.tax,
//             total_amount: c.totals.total,
//             total_discount_amount: 0,
//             total_tax_amount: c.totals.tax
//     })
//     ) : [],
//     merchant_urls: {
//         terms: "https://edvardson.netlify.app/terms",
//         checkout: "https://edvardson.netlify.app/checkout?order_id={checkout.order.id}",
//         confirmation: "https://edvardson.netlify.app/confirmation?order_id={checkout.order.id}",
//         push: "https://edvardson.netlify.app/api/push?order_id={checkout.order.id}"
//     }
// }


// async function f() {
//     const key = localStorage.getItem('cart_key') || "";
//     const cart = await getCart(key)
//     const bodyData = {
//         purchase_country: "SE",
//         purchase_currency: "SEK",
//         locale: "sv-SE",
//         order_amount: 50000,
//         order_tax_amount: 4545,
//         order_lines: [
//             {
//                 type: "physical",
//                 reference: "19-402-USA",
//                 name: "Red T-Shirt",
//                 quantity: 5,
//                 quantity_unit: "pcs",
//                 unit_price: 10000,
//                 tax_rate: 1000,
//                 total_amount: 50000,
//                 total_discount_amount: 0,
//                 total_tax_amount: 4545
//             }
//         ],
//         merchant_urls: {
//             terms: "https://edvardson.netlify.app/terms",
//             checkout: "https://edvardson.netlify.app/checkout?order_id={checkout.order.id}",
//             confirmation: "https://edvardson.netlify.app/confirmation?order_id={checkout.order.id}",
//             push: "https://edvardson.netlify.app/api/push?order_id={checkout.order.id}"
//         }
//     }
//     const klarnaData = await createKlarnaCheckout(bodyData);
//     setKlarnaResponseData(klarnaData)

// }