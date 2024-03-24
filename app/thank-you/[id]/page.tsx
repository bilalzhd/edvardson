import { getWoocommerceOrder } from "@/lib/store"
import Link from "next/link"
import Item from "./Item"
import ShippingAddress from "./ShippingAddress";

export default async function ThankYouPage({ params }: { params: { id: string } }) {
    const data = await getWoocommerceOrder(params.id)
    const shippingAddress = data.shipping.address_1;
    return (
        <>
            {data.id ? (
                <div className="xl:max-w-[85%] mx-auto leading-0 text-gray-600 px-4 py-20">
                    <div className="border-bottom mb-20 border-gray-400">
                        <div className="flex">
                            <div className="lg:w-1/2">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Tack för din beställning</h1>
                                <h2>Hej {data.billing.first_name + " " + data.billing.last_name}!</h2>
                                <p>Din beställning är bekräftad och skickas snart.</p>
                            </div>
                            <div className="lg:w-1/2 flex flex-col items-end">
                                <p className="text-gray-600 leading-0 text-sm text-justify mb-4">Vi skickar leveransbekräftelse till <br className="hidden md:block" /> dignär dina föremål kommer att vara på väg</p>
                                <p className="font-bold text-lg text-gray-900">Tack!</p>
                            </div>
                        </div>
                        <div className="flex w-full mt-12">
                            <table>
                                <thead>
                                    <th className="pr-8">Orderdatum</th>
                                    <th className="pr-8">Ordernummer</th>
                                    <th className="pr-8">Betalning</th>
                                    <th className="pr-8">Leveransadress</th>
                                </thead>
                                <tbody>
                                    <td className="pr-8">{new Date(data.date_created).toDateString()}</td>
                                    <td className="pr-8">Beställa #{data.id}</td>
                                    <td className="pr-8">{data.payment_method_title}</td>
                                    <td><ShippingAddress shippingAddress={shippingAddress} /></td>
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
                                <p>Delsumma <span>{data.total} SEK</span></p>
                                <p>Frakt <span>0 SEK</span></p>
                            </div>
                            <p>Totalt <span>{data.total} SEK</span></p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Link className="text-center border px-4 py-3 border-black text-black hover:bg-black hover:text-white duration-300 transition-all w-[calc(30%-70px)]" href="/product-category/klader">Fortsätt handla</Link>
                    </div>
                </div>
            ) : <div className="mx-auto xl:max-w-[85%] p-4 flex flex-col gap-4">
                <span className="font-bold text-2xl text-gray-400">Inga beställningar skapas för detta beställningsnummer</span>
                <Link className="text-center border px-4 py-3 border-black text-black hover:bg-black hover:text-white duration-300 transition-all w-[calc(30%-70px)]" href="/product-category/klader">Fortsätt handla</Link>
            </div>}
        </>
    )
}