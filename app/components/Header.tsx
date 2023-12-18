import Topbar from './Topbar';
import Menu from './Menu';
import { getMenuItems } from '../lib/menu';



async function Header() {
    const menuItems = await getMenuItems();
    console.log(menuItems)
    return (
        <>
            <Topbar />
            <div className="text-[#bdbdbd] mx-12 bg-black/60 px-4 pb-4 text-[13px] uppercase">
                <div className="flex p-3 justify-end">
                    <div className="flex lg:w-[60%] items-end justify-between">
                        <img width={250} height={62} src="/images/edvardsonlogow.png" alt="Edvardson Logo" />
                        <div className="text-white placeholder:text-white border border-white text-grayish h-fit p-2 flex items-center bg-black/90">
                            <input className="bg-transparent text-sm placeholder:text-grayish focus:outline-none active:outline-none" placeholder="Sök produkt" type="text" name="" id="" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <Menu menuItems={menuItems} />
            </div>
        </>
    );
};

export default Header;