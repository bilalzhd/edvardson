'use client'
import { useState } from "react";
import ChevronDown from "./icons/ChevronDown";


function Menu({menuItems}: any) {
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleMouseEnter = (item: any) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    return (
        <ul className="sidebar flex justify-between px-4 pt-4 flex-wrap">
            {menuItems.map((menuItem:any, index:any) => (
                <li
                    key={index}
                    className="menu-item relative"
                    onMouseEnter={() => handleMouseEnter(menuItem.label)}
                    onMouseLeave={handleMouseLeave}>
                    <span className='flex items-center gap-1 hover:text-white'><a href={menuItem.url}>{menuItem.label}</a> {menuItem.subItems && <ChevronDown className='h-4 w-4' />}</span>
                    <ul className={`${(hoveredItem === menuItem.label && menuItem.subItems) ? 'block' : 'hidden'} flex flex-col gap-3 submenu absolute bg-black/80 p-4`}>
                        {menuItem.subItems?.map((subItem:any, subIndex:any) => (
                            <li key={subIndex} className='text-white hover:bg-black text-[12px]'>
                                <a className='capitalize w-full' key={subIndex} href={subItem.link}>
                                    <div>{subItem.label}</div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

export default Menu