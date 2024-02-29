"use client"
import { createWoocommerceCustomer } from "@/lib/store";
import CountrySelector from "./CountrySelector";
import { FormEvent, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Form() {
    const data = useFormStatus();

    async function fn(data: FormData) {
        const email = data.get("email");
        const address_1 = data.get("billing-address_1");
        const address_2 = data.get("billing-address_2");
        const postcode = data.get("billing-postcode");
        const phone = data.get("billing-phone");
        const first_name = data.get("billing-first_name");
        const last_name = data.get("billing-last_name");
        const city = data.get("billing-city");



        const customerData = {
            email,
            first_name,
            last_name,
            username: email,
            billing: {
                first_name,
                last_name,
                company: "",
                address_1,
                address_2,
                city,
                state: "",
                postcode,
                country: "SV",
                email,
                phone
            },
            shipping: {
                first_name,
                last_name,
                company: "",
                address_1,
                address_2,
                city,
                state: "",
                postcode,
                country: "SV",
                email,
                phone
            }
        }

        const response = createWoocommerceCustomer(customerData)
        console.log(response)
    }


    return (
        <form action={fn} id="checkoutForm" className="px-4 pt-6 pb-3 md:max-w-[calc(100%-270px)]">
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                        <input placeholder="E-postadress*" type="email" name="email" id="email" autoComplete="email" className="input-field" required />
                    </div>
                </div>
                <div>
                    <div className="mt-2.5">
                        <input placeholder="Förnamn*" type="text" name="billing-first_name" id="billing-first_name" autoComplete="given-name" className="input-field" required />
                    </div>
                </div>
                <div>
                    <div className="mt-2.5">
                        <input placeholder="Efternamn*" type="text" name="billing-last_name" id="billing-last_name" autoComplete="family-name" className="input-field" required />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                        <input className="input-field" placeholder="Adress" type="text" id="billing-address_1" autoCapitalize="sentences" autoComplete="address-line1" name="billing-address_1" aria-label="Adress" aria-invalid="true" aria-describedby="validate-error-billing_address_1" required />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                        <input className="input-field" placeholder="Lägenhet, svit etc. (valfritt)" type="text" id="billing-address_2" autoCapitalize="sentences" name="billing-address_2" autoComplete="address-line1" aria-label="" aria-invalid="true" title="Lägenhet, svit etc. (valfritt)" aria-describedby="validate-error-billing_address_1" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="mb-4">Delivery Country</label>
                    <CountrySelector />
                </div>
                <div className="flex items-end">
                    <input type="text" required className="input-field" name="billing-city" id="billing-city" placeholder="Ort" />
                </div>
                <div>
                    <input type="text" required className="input-field" name="billing-postcode" id="billing-postcode" placeholder="Postnummer" />
                </div>
                <div>
                    <input type="text" required name="billing-phone" id="billing-phone" placeholder="Telefon (valfritt)" className="input-field" />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                        Message
                    </label>
                    <div className="mt-2.5">
                        <textarea name="message" id="message" rows={4} className="input-field" />
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {data.pending ? 'Loading...' : 'Place Order'}
                </button>
            </div>
        </form>
    )
}