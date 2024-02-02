import Cart from "./Cart";

function Topbar() {
    return (
        <div className="relative text-[12px] text-black/80 topbar py-2 px-8 min-h-[32px] bg-white">
            <div className="2xl:max-w-[70%] xl:mx-auto top-bar-wrapper pt-2 pb-2 flex justify-between max-w-[1170px]">
                <p className="text-xs font-normal letter-spacing-1 flex">Egen tillverkning av många produkter <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 font-bold text-yellow-600 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg> Kvalitet <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 font-bold text-yellow-600 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg> Kunskap <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 font-bold text-yellow-600 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg> Design</p>
                <div className="flex space-x-2 text-sm">
                    <span>Logga in</span>
                    <select className="bg-transparent" name="" id="">
                        <option value="">SVENSKA / INKL. MOMS</option>
                    </select>
                    <Cart />
                </div>
            </div>
        </div>
    )
}

export default Topbar;