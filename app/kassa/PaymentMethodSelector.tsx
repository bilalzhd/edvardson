"use client"
import { useState } from "react"


export default function PaymentMethodSelector() {
    const [ paymentMethod, setPaymentMethod ] = useState("")
    return (
        <div className="md:w-1/2">
            <h3 className="text-[20px] font-bold">Betalningsmetod</h3>
            <div className="p-4 border rounded flex items-center gap-10">
                <input onChange={() => setPaymentMethod("bambora")} className="border-r border-gray-700 pr-10" type="radio" name="payment" id="bambora" />
                <label className="text-[14px]" htmlFor="bambora">Bambora</label>
            </div>
            <div className="p-4 border rounded flex items-center gap-10">
                <input onChange={() => setPaymentMethod("klarna")} className="border-r border-gray-700 pr-10" type="radio" name="payment" id="klarna" />
                <label className="text-[14px]" htmlFor="klarna">Klarna</label>
            </div>
        </div>
    )
}
