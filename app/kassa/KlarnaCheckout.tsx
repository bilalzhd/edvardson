export default function KlarnaCheckout({ klarnaData }: any) {
    return (
        <div>
            <img src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg" alt="Klarna" />
            <div dangerouslySetInnerHTML={{ __html: `${klarnaData ? klarnaData?.data?.html_snippet : ""}` }}>
            </div>
        </div>
    )
}



// import { createKlarnaCheckout } from "@/lib";

// const bodyData = {
//   purchase_country: "SE",
//   purchase_currency: "SEK",
//   locale: "sv-SE",
//   order_amount: 50000,
//   order_tax_amount: 4545,
//   order_lines: [
//     {
//       type: "physical",
//       reference: "19-402-USA",
//       name: "Red T-Shirt",
//       quantity: 5,
//       quantity_unit: "pcs",
//       unit_price: 10000,
//       tax_rate: 1000,
//       total_amount: 50000,
//       total_discount_amount: 0,
//       total_tax_amount: 4545
//     }
//   ],
//   merchant_urls: {
//     terms: "https://edvardson.netlify.app/terms",
//     checkout: "https://edvardson.netlify.app/checkout?order_id={checkout.order.id}",
//     confirmation: "https://edvardson.netlify.app/confirmation?order_id={checkout.order.id}",
//     push: "https://edvardson.netlify.app/api/push?order_id={checkout.order.id}"
//   }
// }
// export default async function KlarnaCheckout() {
//   const klarnaResponseData = await createKlarnaCheckout(bodyData)

//   return (
//     <div>
//       <img src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg" alt="" />
//       <div dangerouslySetInnerHTML={{ __html: klarnaResponseData?.data?.html_snippet }}>
//       </div>
//     </div>
//   )
// }