import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Header() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}
export default Header