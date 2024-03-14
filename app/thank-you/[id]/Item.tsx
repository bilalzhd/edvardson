export default function Item({ item }: any) {
    console.log(item)
    const vat = Number(item.total / 100) * 20
    return (
        <div className="mb-2 flex md:flex-row flex-col gap-2 items-start md:items-center border-b border-b-gray-300 pb-2">
            <div className="flex md:items-center justify-center items-start gap-2 w-full">
                <div className="flex justify-center w-[80px] md:w-[100px]">
                    <img src={item.image.src} alt="" className="md:w-[90px] md:h-[90px] border p-1 rounded md:rounded-none border-gray-300" />
                </div>
                <div className="w-full md:w-[40%]">
                    {item.name}
                </div>
                <div className="hidden md:flex flex-col px-4 text-left w-[calc(30%-70px)]">
                    <span className="text-gray-600">Quantity: {item.quantity}</span>
                </div>
                <div className="hidden md:flex flex-col px-4 text-left w-[calc(30%-70px)]">
                    <span className="text-gray-300">Unit: {item.subtotal} SEK</span>
                    <span>Total: {item.total} SEK</span>
                    <span className="text-gray-400 text-sm">(VAT excl. {item.total - vat} SEK)</span>
                </div>
            </div>
        </div>
    )
}
