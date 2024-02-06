import Topbar from './Topbar';
import { getMenuItems } from '../lib/menu';
import Nav from './menu/Nav';

async function Header() {
    const menuItems = await getMenuItems();
    return (
        <>
            <Topbar />
            <Nav menuItems={menuItems} />
        </>
    );
};

export default Header;