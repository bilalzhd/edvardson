'use client'
import Link from "next/link";
import ChevronDown from "../icons/ChevronDown";
import { useState } from "react";
import SubMenu from "./SubMenu";
import { usePathname } from "next/navigation";

export default function MenuItem({ item }: any) {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    let pathname = usePathname();
    const url = item.url.startsWith("https://") ? item.url.substring(29) : item.url;
    pathname = item.url.startsWith("https://") ? pathname + "/" : pathname;
    const isActive = pathname.startsWith(url);

    return (
        <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className="flex items-center">
                <Link className={`hover:text-black hover:font-bold ${isActive ? 'active-link' : ''}`} href={item.url}>{item.label}</Link>
                {item.childItems?.nodes?.length > 0 && <ChevronDown className="w-4 h-4" />}
            </span>
            <SubMenu isMouseOver={isHovered} childItems={item.childItems?.nodes?.length && item.childItems} />
        </div>
    );
};