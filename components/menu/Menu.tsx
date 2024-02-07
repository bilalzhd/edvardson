"use client"
import { useState } from "react";
import Link from "next/link";
import ChevronRight from "../icons/ChevronRight";
import ChevronDown from "../icons/ChevronDown";
import { usePathname } from "next/navigation";

const MainMenu = ({ menuData, isScrolled, isMenuOpen }: { menuData: any, isScrolled: boolean, isMenuOpen: boolean }) => {
  const [showSubMenu, setShowSubMenu] = useState<{ [key: number]: boolean }>({});

  const subMenuOnMouseEnterHandler = (subMenuId: number) => {
    setShowSubMenu((prev) => ({ ...prev, [subMenuId]: true }));
  };

  const subMenuOnMouseLeaveHandler = (subMenuId: number) => {
    setShowSubMenu((prev) => ({ ...prev, [subMenuId]: false }));
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'min-h-screen fixed' : ''}`}>

      <ul className={`md:flex-row flex-col md:flex border-t border-b z-10 relative menu sidebar md:gap-0 gap-3 justify-between md:px-4 py-4 flex-wrap ${isScrolled ? '' : 'mt-2'} ${isMenuOpen ? 'flex' : 'hidden'}`}>
        {menuData?.map((el: any) => {
          const id = parseInt(atob(el.id).split(':')[1]);

          // let pathname = usePathname();
          // const url = el.url.startsWith("https://") ? el.url.substring(29) : el.url;
          // pathname = el.url.startsWith("https://") ? pathname + "/" : pathname;
          const isActive = false;
          if (!el.childItems?.nodes) {
            return (
              <li key={id}>
                <Link href={el.url} className={`${isActive ? 'active-link' : ''} border-b md:border-b-0 w-full md:w-fit hover:font-bold header-nav-link`}>
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
              className='header-nav-options options-hover relative border-b md:border-b-0 pb-2 md:pb-0'>
              <Link className={`${isActive ? 'active-link' : ''} w-full md:w-fit hover:font-bold`} href={el.url}>
                <div className='header-nav-div justify-between md:justify-center items-center'>
                  {el.label}
                </div>
              </Link>
              {el.childItems?.nodes?.length > 0 && <button className="chevron"><ChevronDown className="w-4 h-4" /></button>}
              <ul className={`bg-white header-nav-ul absolute top-full left-0 
                ${showSubMenu[id] ? "block" : "hidden"}`}>
                {el.childItems?.nodes.map((ele: any) => {
                  const subMenuId = parseInt(atob(ele.id).split(':')[1]);
                  return (
                    <li
                      key={subMenuId}
                      className='sub-menu-options sub-menu-hover'
                      onMouseEnter={() => subMenuOnMouseEnterHandler(subMenuId)}
                      onMouseLeave={() => subMenuOnMouseLeaveHandler(subMenuId)}>
                      <Link className={`${isActive ? 'active-link' : ''}`} href={ele.url}>
                        <div className='sub-menu-div flex items-center border-b pl-2 pr-2 py-4 capitalize justify-between'>
                          {ele.label}
                        </div>
                      </Link>
                      {ele.childItems?.nodes?.length > 0 && <button className="chevron"><ChevronRight className="w-4 h-4" /></button>}
                      <ul
                        className={`sub-menu-ul top-0 ${showSubMenu[subMenuId] ? "block" : "hidden"
                          }`}>
                        {ele.childItems?.nodes.map((elem: any) => (
                          <li key={elem.id} className='border-b py-2 px-3 border-l grand-child-link bg-white capitalize'>
                            <Link className={`${isActive ? 'active-link' : ''} hover:font-bold`} href={elem.url}>
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
