"use client"
import { useForm } from "react-hook-form";
import CountrySelector from "./CountrySelector";

type Inputs = {
    email: string; firstName: string; lastName: string; billingAddress1: string; billingAddress2: string;
    billingCity: string; country: string; billingPhone: string; billingPostcode: string; message: string;
}

export default function CheckoutForm({countries}: any) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    function onSubmit(data: Inputs) {
        // console.log(data)
        console.log(errors)
    }
    return (
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
                    <CountrySelector data={{ ...register("country") }} countries={countries?.shippingCountries} />
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
        </form>
    )
}
