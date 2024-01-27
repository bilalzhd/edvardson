import React from 'react'

export default function CheckoutInvoiceSummary({ cart }: {cart: {} | Cart}) {
    return (
        <>
            <h3 className="border-b pb-4 mb-[15px]">{(cart as Cart).items?.length || 0} items</h3>
            <div className="flex-col flex text-[14px]">
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Articles: </span>
                    <span>{String((cart as Cart).totals?.total).substring(0, String((cart as Cart).totals?.total).length - 2)} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Shipping: </span>
                    <span>{String((cart as Cart).totals?.total).substring(0, String((cart as Cart).totals?.total).length - 2)} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>Total vat excl.: </span>
                    <span>{String((cart as Cart).totals?.total).substring(0, String((cart as Cart).totals?.total).length - 2)} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mb-1">
                    <span>VAT: </span>
                    <span>{String((cart as Cart).totals?.total).substring(0, String((cart as Cart).totals?.total).length - 2)} SEK</span>
                </div>
                <div className="flex justify-between w-full text-md mt-[25px] mb-[5px]">
                    <span>Total: </span>
                    <span>{String((cart as Cart).totals?.total).substring(0, String((cart as Cart).totals?.total).length - 2)} SEK</span>
                </div>
            </div>
        </>
    )
}
