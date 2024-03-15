"use client"
import { AppContext } from '@/context';
import { useContext } from 'react';

export default function CheckoutInvoiceSummary() {
    const [cart, , ] = useContext(AppContext)
    const total = (cart as Cart)?.totals?.total / 100
    const vat = (total / 100) * 20
    return (
        <>
            <h3 className="border-b pb-4 mb-[15px]">{(cart as Cart)?.items?.length || 0} items</h3>
            <div className="flex-col flex text-[14px]">
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Artiklar: </span>
                    <span>{total || 0} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Frakt: </span>
                    <span>0 SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Totalt moms exkl.: </span>
                    <span>{total - vat || 0} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Moms: </span>
                    <span>{vat.toFixed(2)} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mt-[25px] mb-[5px]">
                    <span>Totalt: </span>
                    <span>{total || 0} SEK</span>
                </div>
            </div>
        </>
    )
}
