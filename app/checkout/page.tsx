'use client'
import ProductCarousel from "@/components/ProductCarousel";
import ChevronDown from "@/components/icons/ChevronDown";
import Trash from "@/components/icons/Trash";
import { AppContext } from "@/context"
import { getProductsForCheckout, getShippingMethods } from "@/lib/store";
import { useContext, useEffect, useState } from "react"
import Select from "react-select";
import { countryOptions as options } from "@/lib/constants";
import CheckoutInvoiceSummary from "./CheckoutInvoiceSummary";
import CheckoutItem from "./CheckoutItem";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CheckoutPage() {
    const [cart, ,] = useContext(AppContext);
    const [checkoutProducts, setCheckoutProducts] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getProductsForCheckout("0", "500").then(products => setCheckoutProducts(products));
        getShippingMethods().then(res => setShippingMethods(res));
    }, [])
    // console.log(shippingMethods)
    return (
        <>
            {loading && <div className="w-screen fixed top-0 flex items-center text-white text-center justify-center h-screen bg-white/50"><LoadingSpinner text="Updating..." /></div>}
            <div className="flex bg-black/60 text-white pr-[60px] pl-[40px] py-[30px] font-open">
                <div className="w-[calc(100%-270px)]">
                    <h2 className="font-semibold text-xl">Cart</h2>
                    <div className="px-4 pt-6 pb-3">
                        <div className="mb-[30px]">
                            <div className="border-b p-2">
                                <div className="flex ml-[100px]">
                                    <div className="w-[40%] text-left">Product</div>
                                    <div className="w-[100px] text-left">Quantity</div>
                                    <div className="w-[calc(60%-140px)] text-left">Price</div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-4">
                                {(cart as Cart).items?.map((item: any) => (
                                    <CheckoutItem item={item} setLoading={setLoading} />
                                ))}
                            </div>
                            <button className="mt-4 letter-spacing-1 text-[15px] flex items-center gap-1 bg-white/60 text-[#000] px-[15px] h-[35px] font-semibold rounded uppercase">
                                <Trash fill="#333" className="w-4 h-4" />
                                Töm varukorg</button>
                        </div>
                        <div>
                            <h2 className="text-center font-semibold text-[20px] mb-5">Andra köpte också</h2>
                            <ProductCarousel products={checkoutProducts || []} />
                        </div>
                        <div className="bg-white p-4 rounded-md text-black text-[15px]">
                            <p>Produkter beställda i December 2023 har bytesrätt t.o.m Januari 2024</p>
                        </div>
                        <div>
                            <label>Leveransland</label>
                            <Select className="text-black" options={options} />
                        </div>
                    </div>
                </div>
                <div className="w-[250px] block float-right">
                    <h2 className="font-semibold text-xl">Summary</h2>
                    <div className="py-[25px] px-[15px]">
                        <CheckoutInvoiceSummary cart={cart} />
                        <div className="mb-[30px] py-[25px] px-[15px]">
                            <p className="flex items-center text-[14px] font-semibold">Rabattkod/Presentkort <ChevronDown className="w-4 h-4" /></p>
                        </div>
                        <ul className="text-[14px]">
                            <li className="flex items-center gap-1">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#fff" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" /></svg>
                                Betala säkert med kort
                            </li>
                            <li className="flex items-center gap-1">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                Frågor? Ring oss!
                            </li>
                            <li className="flex gap-1 items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 512 512"><path fill="#fff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                                Produkter beställda i December 2023 har bytesrätt t.o.m Januari 2024
                            </li>
                            <li className="mt-[15px]">OBS! Ordrar utanför EU belastas med moms i mottagarlandet och ev. tull om produkten inte är tillverkad inom EU.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>)
}
