"use client"
import { AppContext } from "@/context"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import CartItem from "./CartItem"
import Link from "next/link"

export default function CartPopup({ showPopup, setShowPopup }: { showPopup: boolean, setShowPopup: Dispatch<SetStateAction<boolean>> }) {
    const cart = useContext(AppContext)[0]
    const [loading, setLoading] = useState(false);
    return (
        <>
            {showPopup && (
                <div className="flex justify-center items-center h-screen">
                    <div className="fixed inset-0 top-[100px] px-2 z-10 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="bg-white shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
                            <div className="bg-black text-white px-4 py-2 flex justify-between">
                                <h2 className="text-lg font-semibold">Vagn</h2>
                            </div>
                            <div className="p-4 max-h-[300px] overflow-y-auto">
                                {(cart as Cart)?.items?.map((item: any) => <CartItem key={item.id} setLoading={setLoading} item={item} />)}

                            </div>
                            <div className="space-x-2 border-t px-4 py-2 w-full flex justify-center">
                                <button onClick={() => setShowPopup(false)} className="hover:bg-gray-800 px-3 py-2 text-lg bg-black text-white  w-full">Stänga</button>
                                <Link href="/kassa" className="px-3 py-2 hover:bg-black hover:text-white duration-300 transition-all text-lg border text-center border-black text-black w-full">Gå till kassan</Link>
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    )
}
