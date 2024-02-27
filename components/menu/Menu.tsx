"use client"
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import ChevronRight from "../icons/ChevronRight";
import ChevronDown from "../icons/ChevronDown";
import { usePathname } from "next/navigation";

type Props = {
  menuData: any, isScrolled: boolean, isMenuOpen: boolean, setIsMenuOpen: Dispatch<SetStateAction<boolean>> 
}

const MainMenu = ({ menuData, isScrolled, isMenuOpen, setIsMenuOpen }: Props) => {
  const [showSubMenu, setShowSubMenu] = useState<{ [key: number]: boolean }>({});

  const subMenuOnMouseEnterHandler = (subMenuId: number) => {
    setShowSubMenu((prev) => ({ ...prev, [subMenuId]: true }));
  };

  const subMenuOnMouseLeaveHandler = (subMenuId: number) => {
    setShowSubMenu((prev) => ({ ...prev, [subMenuId]: false }));
  };
  return (
    <nav className={`navbar ${isMenuOpen ? 'min-h-screen fixed' : ''}`}>

      <ul className={`md:flex-row flex-col md:flex border-t z-10 relative menu sidebar md:gap-0 gap-3 justify-between md:px-4 py-4 flex-wrap ${isScrolled ? '' : 'mt-2'} ${isMenuOpen ? 'flex' : 'hidden'} 2xl:max-w-[70%] mx-auto`}>
        {menuData.length > 0 && menuData.map((el: any) => {
          const id = parseInt(atob(el.id).split(':')[1]);

          // let pathname = usePathname();
          // const url = el.url.startsWith("https://") ? el.url.substring(29) : el.url;
          // pathname = el.url.startsWith("https://") ? pathname + "/" : pathname;  
          const isActive = false;
          if (!el.childItems?.nodes) {
            return (
              <li key={id}>
                <Link onClick={() => setIsMenuOpen(false)} href={el.url} className={`${isActive ? 'active-link' : ''} border-b md:border-b-0 w-full md:w-fit hover:text-[#888] header-nav-link`}>
                  <span>{el.label}</span>
                </Link>
              </li>
            );
          }

          return (
            <li
              key={id}
              onMouseEnter={() => subMenuOnMouseEnterHandler(id)}
              onMouseLeave={() => subMenuOnMouseLeaveHandler(id)}
              className='header-nav-options md:items-center md:flex-row flex-col options-hover relative border-b md:border-b-0 pb-2 md:pb-0'>
              <div className="flex">
                <Link onClick={() => setIsMenuOpen(false)} className={`${isActive ? 'active-link' : ''} w-full md:w-fit hover:text-[#888]`} href={el.url}>
                  <div className='header-nav-div justify-between md:justify-center items-center'>
                    {el.label}
                  </div>
                </Link>
                {el.childItems?.nodes?.length > 0 && <button className="chevron w-fit"><ChevronDown className="w-4 h-4" /></button>}
              </div>
              <ul className={`bg-white header-nav-ul md:absolute top-full left-0 border text-[12px] px-[5px]
                ${showSubMenu[id] ? "block" : "hidden"}`}>
                {el.childItems?.nodes.map((ele: any) => {
                  const subMenuId = parseInt(atob(ele.id).split(':')[1]);
                  return (
                    <li
                      key={subMenuId}
                      className='sub-menu-options sub-menu-hover items-center md:flex-row flex-col border-b md:border-b-0'
                      onMouseEnter={() => subMenuOnMouseEnterHandler(subMenuId)}
                      onMouseLeave={() => subMenuOnMouseLeaveHandler(subMenuId)}>
                      <div className="flex items-center w-full">
                        <Link onClick={() => setIsMenuOpen(false)} className={`${isActive ? 'active-link' : ''} w-full`} href={ele.url}>
                          <div className='sub-menu-div flex items-center md:border-b pl-2 pr-2 py-4 capitalize justify-between'>
                            {ele.label}
                          </div>
                        </Link>
                        {ele.childItems?.nodes?.length > 0 && (<button className="chevron">
                          <ChevronRight className="w-4 h-4 hidden md:block" />
                          <ChevronDown className="w-4 h-4 md:hidden block" />
                        </button>)}
                      </div>
                      <ul
                        className={`sub-menu-ul top-0 w-full ${showSubMenu[subMenuId] ? "block" : "hidden"
                          }`}>
                        {ele.childItems?.nodes.map((elem: any) => (
                          <li key={elem.id} className='md:border-t md:border-l md:border-r md:border-b md:border-black py-2 px-3 grand-child-link bg-white capitalize'>
                            <Link onClick={() => setIsMenuOpen(false)} className={`${isActive ? 'active-link' : ''} hover:text-[#888]`} href={elem.url}>
                              {elem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainMenu;
