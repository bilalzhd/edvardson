"use client"
import { AppContext } from '@/context';
import { useContext } from 'react';

export default function CheckoutInvoiceSummary() {
    const [cart, , ] = useContext(AppContext)
    const total = (cart as Cart)?.totals?.total / 100 || 0
    const vat = ((total / 100) * 20).toFixed(1)
    const shipping = (cart as Cart)?.items?.length > 0 ? 100 : 0;
    return (
        <>
            <h3 className="border-b pb-4 mb-[15px]">{(cart as Cart)?.items?.length || 0} items</h3>
            <div className="flex-col flex text-[14px]">
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Articles: </span>
                    <span>{`${total} SEK`}</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Shipping: </span>
                    <span>{shipping} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Total vat excl.: </span>
                    <span>{`${total - Number(vat)} SEK`}</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>VAT: </span>
                    <span>{`${vat} SEK`}</span>
                </div>
                <div className="flex justify-between w-full text-md mt-[25px] mb-[5px]">
                    <span>Total: </span>
                    <span>{`${total + shipping} SEK`}</span>
                </div>
            </div>
        </>
    )
}
