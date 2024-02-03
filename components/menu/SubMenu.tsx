import Link from 'next/link';
import { useState } from 'react';

const SubMenu = ({ childItems, isMouseOver, isSubMenu }: any) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <ul
      className={`sub-menu ${!isMouseOver ? 'hidden': 'block'} parent ${isSubMenu ? 'sub-menu-2': ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {childItems?.nodes?.map((subItem: any) => (
        <li key={subItem.label} className='sub-menu z-10 flex flex-col border-b top-8 bg-white p-4 capitalize'>
          <Link className='hover:text-black hover:font-bold' href={subItem.url}>{subItem.label}</Link>
            <SubMenu isSubMenu isMouseOver={subItem.childItems?.nodes?.length > 0 && isHovered} childItems={subItem.childItems} />
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;

