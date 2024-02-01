'use client'
import Link from "next/link";
import ChevronDown from "../icons/ChevronDown";
import { useState } from "react";
import SubMenu from "./SubMenu";

export default function MenuItem({ item }: any) {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className="menu-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="flex items-center gap-1 hover:text-[#bdbdbd]">
                <Link href={item.url}>{item.label}</Link>
                {item.childItems?.nodes?.length > 0 && <ChevronDown className="w-4 h-4" />}
            </span>
            <SubMenu isMouseOver={isHovered} childItems={item.childItems?.nodes?.length && item.childItems} />
        </div>
    );
};