"use client"
import { clearCart, createKlarnaOrder, createWoocommerceOrder } from "@/lib/store";
import CountrySelector from "./CountrySelector";
import { getStates } from "@/lib";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context";
import { useForm } from "react-hook-form";
import { KlarnaComponent } from "./KlarnaComponent";
import BamboraCheckout from "./BamboraCheckout";
import LoadingSpinner from "@/components/LoadingSpinner";




const initialData = {
    locale: "sv-SE",
    purchase_country: "SE",
    purchase_currency: "SEK",
    intent: "buy",
    merchant_urls: {
        success: "https://edvardson.se/thank-you?token=<random_uuid>&sid={{session_id}}&authorization_token={{authorization_token}}",
        cancel: "https://edvardson.se/cancel?token=<random_uuid>&sid={{session_id}}",
        back: "https://edvardson.se/back?token=<random_uuid>&sid={{session_id}}",
        failure: "https://edvardson.se/fail?token=<random_uuid>&sid={{session_id}}",
        error: "https://edvardson.se/error?token=<random_uuid>&sid={{session_id}}"
    }
}

type Inputs = {
    email: string; firstName: string; lastName: string; billingAddress1: string; billingAddress2: string;
    billingCity: string; country: string; billingPhone: string; billingPostcode: string; message: string;
}

export default function Form({ countriesData }: any) {
    const [cart, , cartKey, , formData, setFormData] = useContext(AppContext);
    const { register, handleSubmit, formState } = useForm<Inputs>();
    const [paymentMethod, setPaymentMethod] = useState<"bambora" | "klarna">("klarna");
    const [loading, setLoading] = useState(false);
    function onSubmit(data: Inputs) {
        setFormData((prv: any) => (
            {
                ...prv,
                ...data,
                lineItems: (cart as Cart)?.items,
                totalAmount: (cart as Cart)?.totals?.total
            }
        ))

        paymentMethod === "klarna" && setPayWithKlarna(true);
    }

    const [payWithKlarna, setPayWithKlarna] = useState<Boolean>(false)
    const [klarnaSession, setKlarnaSession] = useState<any>(null);
    useEffect(() => {
        const bodyData = {
            ...initialData,
            order_amount: (cart as Cart)?.totals?.total,
            order_lines:
                (cart as Cart)?.items?.map((c: any) => {
                    return {
                        type: 'physical',
                        reference: '1',
                        name: c.name,
                        quantity: c.quantity.value,
                        quantity_unit: 'pcs',
                        unit_price: c.price,
                        tax_rate: 0,
                        total_amount: c.totals.subtotal,
                        total_tax_amount: 0,
                    }
                })

        };
        if ((cart as Cart)?.items?.length > 0) {
            fetch('/api/klarna', {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    "Content-Type": "application/json",
                },
                next: { revalidate: 10 }
                // Add any necessary headers or body data here
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        const dt = data.data;
                        setKlarnaSession(dt);
                    } else {
                        console.error('Invalid server response:', data);
                        // Handle the case where the server response is invalid or missing data
                    }
                })
                .catch(error => {
                    console.error('Error fetching data from server:', error);
                    // Handle fetch error
                });

        }
        // eslint-disable-next-line
    }, [(cart as Cart)?.items])

    function handleKlarnaComplete(responseData: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setLoading(true)
            setTimeout(() => {
                createKlarnaOrder(formData, responseData).then(res => {
                    // FIXME: uncomment this for prod
                    createWoocommerceOrder(formData).then((response) => {
                        clearCart(cartKey).then(res => {
                            setLoading(false)
                            window.location.replace("/thank-you/" + response.id);
                        })
                    });
                })
                resolve();
            }, 2000);
        });
    }
    return (
        <div>
            {loading && (
                <div className="translate-x-[-40px] flex items-center justify-center w-screen h-screen fixed top-0 z-[100000] bg-black/80">
                    <div className="animate-spin rounded-full border-t-4 border-gray-200 border-solid h-12 w-12"></div>
                    <span className="ml-2 text-gray-200">Skapar din beställning...</span>
                </div>)}
            {(klarnaSession && payWithKlarna) && (<KlarnaComponent customerData={formData} klarnaSession={klarnaSession} onComplete={handleKlarnaComplete} />)}
            {(cart as Cart)?.items?.length > 0 && <div className="w-[calc(100%-270px)] px-5">
                <h3 className="text-[20px] font-bold mb-4">Betalningsmetod</h3>
                <div className="flex gap-4">
                    <div className="md:w-1/2 p-4 border rounded flex items-center gap-10 border-gray-600 shadow-md hover:shadow-none bg-gray-100">
                        <input onChange={() => setPaymentMethod("bambora")} className="border-r pr-10" type="radio" name="payment" id="bambora" checked={paymentMethod === "bambora"} />
                        <label className="text-[14px]" htmlFor="bambora">Bambora</label>
                    </div>
                    <div className="md:w-1/2 p-4 border rounded flex items-center gap-10 border-gray-600 shadow-md hover:shadow-none bg-gray-100">
                        <input onChange={() => setPaymentMethod("klarna")} className="border-r pr-10" type="radio" name="payment" id="klarna" checked={paymentMethod === "klarna"} />
                        <label className="text-[14px]" htmlFor="klarna">Klarna</label>
                    </div>
                </div>
            </div>}
            {(cart as Cart)?.items?.length > 0 && (
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="px-4 pt-6 pb-3 md:max-w-[calc(100%-270px)]" noValidate>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <div className="mt-2.5">
                                    <input {...register("email", { required: true })} placeholder="E-postadress*" type="email" id="email" autoComplete="email" className="input-field" />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2.5">
                                    <input {...register("firstName", { required: true })} placeholder="Förnamn*" type="text" id="firstName" autoComplete="given-name" className="input-field" />
                                </div>
                            </div>
                            <div>
                                <div className="mt-2.5">
                                    <input placeholder="Efternamn*" type="text" {...register("lastName", { required: true })} id="lastName" autoComplete="family-name" className="input-field" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="mt-2.5">
                                    <input className="input-field" placeholder="Adress" type="text" id="billingAddress1" autoCapitalize="sentences" autoComplete="address-line1" aria-label="Adress" aria-invalid="true" {...register("billingAddress1")} />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="mt-2.5">
                                    <input className="input-field" placeholder="Lägenhet, svit etc. (valfritt)" type="text" id="billingAddress2" autoCapitalize="sentences" autoComplete="address-line1" aria-label="" aria-invalid="true" title="Lägenhet, svit etc. (valfritt)"  {...register("billingAddress2")} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="mb-4">Delivery Country</label>
                                <CountrySelector data={{ ...register("country") }} countries={countriesData?.shippingCountries} />
                            </div>
                            <div className="flex items-end">
                                <input type="text" className="input-field" id="billingCity" placeholder="Ort" {...register("billingCity", { required: true })} />
                            </div>
                            <div>
                                <input type="text" className="input-field" id="billingPostcode" placeholder="Postnummer" {...register("billingPostcode", { required: true })} />
                            </div>
                            <div>
                                <input type="text" id="billingPhone" placeholder="Telefon (valfritt)" className="input-field" {...register("billingPhone", { required: true })} />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Message
                                </label>
                                <div className="mt-2.5">
                                    <textarea id="message" {...register("message")} rows={4} className="input-field" />
                                </div>
                            </div>
                        </div>
                        <div id="payment-options"></div>
                        <button type="submit" className="mt-4 block w-full rounded-md transition-all duration-300 bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:border-black border hover:text-black hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Fortsätt till betalning 
                        </button>
                        <div className="mt-10">
                            {/* {paymentMethod === "klarna" && <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Betala med Klarna</button>} */}
                        </div>
                    </form>
                    {(paymentMethod === "bambora" && formState.isValid && formState.isSubmitted) && <BamboraCheckout customerData={formData} paymentMethod={paymentMethod} show={paymentMethod === "bambora"} />}
                </>
            )}
        </div>
    )
}