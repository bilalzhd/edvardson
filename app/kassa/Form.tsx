import getCountries, { createKlarnaPayment } from "@/lib";
import BamboraCheckout from "./BamboraCheckout";
import CheckoutForm from "./CheckoutForm";
import KlarnaCheckout from "./KlarnaCheckout";
import PaymentMethodSelector from "./PaymentMethodSelector";



export default async function Form() {
    const klarnaData = await createKlarnaPayment();
    const countries = await getCountries();
    return (
        <>
            <PaymentMethodSelector />
            <CheckoutForm countries={countries} />
            <div className="px-4 pt-6 pb-3 md:max-w-[calc(100%-270px)]">
                {/* <BamboraCheckout /> */}
                <KlarnaCheckout clientToken={klarnaData?.data?.client_token} />
                <PlaceOrder />
            </div>
        </>
    )
}


function PlaceOrder() {
    return (
        <div className="mt-10">
            <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Place Order</button>
        </div>
    )
}