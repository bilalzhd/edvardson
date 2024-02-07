"use client"
import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Bars from "../icons/Bars";
import Cart from "../Cart";
// import { redirect } from "next/dist/server/api-utils";

export default function Nav({ menuItems }: any) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            if (scrolled) {
                document.querySelector('main')?.classList.add("md:pt-44")
                // document.querySelector('main')?.classList.add("pt-20")
            }
            else {
                document.querySelector('main')?.classList.remove("md:pt-44")
                // document.querySelector('main')?.classList.remove("pt-20")
            }
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleSearch() {
        // window.location.href = `/sok/${searchTerm}`
        // redirect(`/sok/${searchTerm}`)
        router.push(`/sok/${searchTerm}`);
    }

    return (
        <>
            <div className={`${isScrolled ? '!fixed w-full bg-white top-0 md:px-16 z-[10000]' : 'md:mx-12'} relative 2xl:max-w-[70%] z-20 2xl:mx-auto px-4 pb-2 text-[13px] uppercase flex md:block`}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="block md:hidden" aria-label="Toggle Menu" type="button"><Bars className="w-6 h-6" /></button>
                <div className="flex md:p-3 items-center justify-center md:justify-end w-full py-3">
                    <div className="flex md:flex-row flex-col w-full lg:w-[60%] items-center md:gap-0 gap-2 md:items-end justify-center md:justify-between">
                        <Link href="/">
                            <img src="/images/logoblack.webp" alt="Edvardson Logo" className={`transition-all duration-300 w-[150px] md:w-[250px] ${isScrolled ? 'transform-scale-80 ' : ''}`} /></Link>
                        <div className="placeholder:text-black/80 text-grayish h-fit p-2 md:flex items-center bg-white/90 border border-black justify-between w-full md:w-fit hidden">
                            <input className="text-grayish bg-transparent text-sm placeholder:text-grayish focus:outline-none active:outline-none" placeholder="Sök produkt" type="text" name="" id="" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                            <button onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Cart className="md:hidden block" />
                </div>
                <Menu isMenuOpen={isMenuOpen} isScrolled={isScrolled} menuData={menuItems} />
            </div>
            <div className="w-[95%] mx-auto placeholder:text-black/80 text-grayish h-fit p-2 flex items-center bg-white/90 border border-black justify-between md:w-fit md:hidden">
                <input className="text-grayish bg-transparent text-sm placeholder:text-grayish focus:outline-none active:outline-none" placeholder="Sök produkt" type="text" name="" id="" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                <button onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </>
    )
}
