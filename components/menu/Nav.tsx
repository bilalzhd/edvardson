"use client"
import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";

export default function Nav({ menuItems }: any) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            if (scrolled) document.querySelector('main')?.classList.add("pt-44")
            else document.querySelector('main')?.classList.remove("pt-44")
            setIsScrolled(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleSearch () {
        // window.location.href = `/sok/${searchTerm}`
        // redirect(`/sok/${searchTerm}`)
        router.push(`/sok/${searchTerm}`);
    }

    return (
        <div className={`${isScrolled ? 'md:fixed w-full bg-white top-0 md:px-16 z-[1000]' : 'mx-12'} 2xl:max-w-[70%] z-20 2xl:mx-auto px-4 pb-2 text-[13px] uppercase`}>
            <div className="flex p-3 justify-end">
                <div className="flex lg:w-[60%] items-end justify-between">
                    <Link href="/">
                        <img width={250} height={62} src="/images/logoblack.webp" alt="Edvardson Logo" className={`transition-all duration-300 ${isScrolled ? 'transform-scale-80 ' : ''}`} /></Link>
                    <div className="placeholder:text-black/80 text-grayish h-fit p-2 flex items-center bg-white/90 border border-black">
                        <input className="text-grayish bg-transparent text-sm placeholder:text-grayish focus:outline-none active:outline-none" placeholder="Sök produkt" type="text" name="" id="" onChange={(e) => setSearchTerm(e.target.value) } onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                        <button onClick={handleSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Menu isScrolled={isScrolled} menuData={menuItems} />
        </div>
    )
}
