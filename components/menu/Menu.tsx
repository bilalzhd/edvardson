'use client'
import MenuItem from "./MenuItem";

const MainMenu = ({ menuData }: any) => {
  return (
    <ul className="z-10 relative menu sidebar flex justify-between px-4 pt-4 flex-wrap">
      {menuData.map((item: any) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default MainMenu;
