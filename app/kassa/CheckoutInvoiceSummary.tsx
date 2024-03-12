"use client"
import { AppContext } from '@/context';
import { useContext } from 'react';

export default function CheckoutInvoiceSummary() {
    const [cart, , ] = useContext(AppContext)
    return (
        <>
            <h3 className="border-b pb-4 mb-[15px]">{(cart as Cart)?.items?.length || 0} items</h3>
            <div className="flex-col flex text-[14px]">
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Articles: </span>
                    <span>{(cart as Cart)?.items?.length > 0 ? (
                        `${(cart as Cart)?.totals?.total?.toString()?.substring(0, (cart as Cart)?.totals?.total?.toString()?.length - 2)} SEK`
                    ) : "0 SEK"}
                    </span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Shipping: </span>
                    <span>{(cart as Cart)?.items?.length > 0 ? (
                        `${(cart as Cart)?.totals?.total?.toString()?.substring(0, (cart as Cart)?.totals?.total?.toString()?.length - 2)} SEK`
                    ) : "0 SEK"}
                    </span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Total vat excl.: </span>
                    <span>{(cart as Cart)?.items?.length > 0 ? (
                        `${(cart as Cart)?.totals?.total?.toString()?.substring(0, (cart as Cart)?.totals?.total?.toString()?.length - 2)} SEK`
                    ) : "0 SEK"}
                    </span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>VAT: </span>
                    <span>{(cart as Cart)?.items?.length > 0 ? (
                        `${(cart as Cart)?.totals?.total?.toString()?.substring(0, (cart as Cart)?.totals?.total?.toString()?.length - 2)} SEK`
                    ) : "0 SEK"}
                    </span>
                </div>
                <div className="flex justify-between w-full text-md mt-[25px] mb-[5px]">
                    <span>Total: </span>
                    <span>{(cart as Cart)?.items?.length > 0 ? (
                        `${(cart as Cart)?.totals?.total?.toString()?.substring(0, (cart as Cart)?.totals?.total?.toString()?.length - 2)} SEK`
                    ) : "0 SEK"}
                    </span>
                </div>
            </div>
        </>
    )
}
