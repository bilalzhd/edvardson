'use client'
import MenuItem from "./MenuItem";

const MainMenu = ({ menuData }: any) => {
  return (
    <ul className="border-t border-b z-10 relative menu sidebar flex justify-between px-4 py-4 mt-2 flex-wrap">
      {menuData?.map((item: any) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default MainMenu;
