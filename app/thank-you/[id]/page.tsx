import { getWoocommerceOrder } from "@/lib/store"
import Link from "next/link"
import Item from "./Item"

export default async function ThankYouPage({ params }: { params: { id: string } }) {
    const data = await getWoocommerceOrder(params.id)
    return (
        <>
            {data.id ? (
                <div className="xl:max-w-[85%] mx-auto leading-0 text-gray-600 px-4 py-20">
                    <div className="border-bottom mb-20 border-gray-400">
                        <div className="flex">
                            <div className="lg:w-1/2">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Thanks for your order</h1>
                                <h2>Hi {data.billing.first_name + " " + data.billing.last_name}!</h2>
                                <p>Your order is confirmed and will be shipping soon.</p>
                            </div>
                            <div className="lg:w-1/2 flex flex-col items-end">
                                <p className="text-gray-600 leading-0 text-sm text-justify mb-4">We will send you shipping confirmation <br className="hidden lg:block" /> when your item(s) will be on the way</p>
                                <p className="font-bold text-lg text-gray-900">Thank You!</p>
                            </div>
                        </div>
                        <div className="flex w-full mt-12">
                            <table>
                                <thead>
                                    <th className="pr-8">Order Date</th>
                                    <th className="pr-8">Order Number</th>
                                    <th className="pr-8">Payment</th>
                                    <th className="pr-8">Shipping Address</th>
                                </thead>
                                <tbody>
                                    <td className="pr-8">{new Date(data.date_created).toDateString()}</td>
                                    <td className="pr-8">Order #{data.id}</td>
                                    <td className="pr-8">{data.payment_method_title}</td>
                                    <td className="pr-8">{data.shipping.address_1.substring(0, 30)}...</td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        {data.line_items.map((item: any) => <Item key={item.id} item={item} />)}
                    </div>
                    <div className="flex w-full justify-end">
                        <div className="lg:w-[calc(30%-70px)] px-2 flex flex-col gap-4">
                            <div className="py-4 border-b border-gray-300">
                                <p>Subtotal <span>{data.total} SEK</span></p>
                                <p>Shipping <span>0 SEK</span></p>
                            </div>
                            <p>Total <span>{data.total} SEK</span></p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Link className="text-center border px-4 py-3 border-black text-black hover:bg-black hover:text-white duration-300 transition-all w-[calc(30%-70px)]" href="/product-category/klader">Continue Shopping</Link>
                    </div>
                </div>
            ) : <div className="mx-auto xl:max-w-[85%] p-4 flex flex-col gap-4">
                <span className="font-bold text-2xl text-gray-400">No orders are created for this order number</span>
                <Link className="text-center border px-4 py-3 border-black text-black hover:bg-black hover:text-white duration-300 transition-all w-[calc(30%-70px)]" href="/product-category/klader">Continue Shopping</Link>
            </div>}
        </>
    )
}