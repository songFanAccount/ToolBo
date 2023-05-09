import { Outlet } from 'react-router-dom';

function Header() {
    return (
        <div>
            <h1>Header</h1>
            <Outlet />
        </div>
    )
}
export default Header