import Cart from "./Cart";

function Topbar() {
    return (
        <div className="topbar-container">
            <div className="topbar">
                <p className="hidden text-[10px] md:text-xs font-normal letter-spacing-1 md:flex">
                    <span className="md:text-xs text-[10px]">Egen tillverkning av många produkter</span> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="md:w-6 w-4 mr-1 md:mr-0 font-bold text-black h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg> Kvalitet <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="md:w-6 w-4 mr-1 md:mr-0 font-bold text-black h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg> Kunskap <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="md:w-6 w-4 mr-1 md:mr-0 font-bold text-black h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg> Design</p>
                <div className="py-2 flex space-x-2 text-sm items-center justify-between">
                    {/* <span className="hover:underline cursor-pointer hidden md:block">Logga in</span> */}
                    {/* <select className="bg-transparent" name="" id="">
                        <option value="">SVENSKA / INKL. MOMS</option>
                    </select> */}
                    <Cart className="hidden md:block" />
                </div>
            </div>
        </div>
    )
}

export default Topbar;