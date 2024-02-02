import Topbar from './Topbar';
import Menu from './menu/Menu';
import Link from 'next/link';
import { getMenuItems } from '../lib/menu';

async function Header() {
    const menuItems = await getMenuItems();
    return (
        <>
            <Topbar />
            <div className="2xl:max-w-[70%] 2xl:mx-auto mx-12 px-4 pb-4 text-[13px] uppercase">
                <div className="flex p-3 justify-end">
                    <div className="flex lg:w-[60%] items-end justify-between">
                        <Link href="/"><img width={250} height={62} src="/images/logoblack.webp" alt="Edvardson Logo" /></Link>
                        <div className="text-white placeholder:text-black/80 text-grayish h-fit p-2 flex items-center bg-white/90 border border-black">
                            <input className="bg-transparent text-sm placeholder:text-grayish focus:outline-none active:outline-none" placeholder="Sök produkt" type="text" name="" id="" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <Menu menuData={menuItems} />
            </div>
        </>
    );
};

export default Header;