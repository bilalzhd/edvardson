'use client'
import ChevronDown from "./icons/ChevronDown";
import Link from "next/link";

import { useState } from 'react';

const MenuItem = ({ label, url, childItems }: { label: string, url: string, childItems: any }) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <li
      className={`menu-item mb-2 ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="flex items-center gap-1 hover:text-white">
        <Link href={url}>{label}</Link>
        {childItems?.nodes?.length > 0 && <ChevronDown className="w-4 h-4" />}
      </span>
      {childItems?.nodes?.length > 0 && <SubMenu items={childItems.nodes} />}
    </li>
  );
};

const SubMenu = ({ items }: any) => {
  return (
    <ul className="z-10 flex flex-col gap-3 submenu absolute bg-black/80 p-4 capitalize">
      {items.map((item: any) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

const Menu = ({ menuItems }: any) => {
  return (
    <ul className="z-10 menu sidebar flex justify-between px-4 pt-4 flex-wrap">
      {menuItems.map((item: any) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default Menu;
