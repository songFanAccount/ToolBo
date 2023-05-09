import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './NavBar';

function Header() {
    const style = {
        display: 'flex'
    }
    return (
        <>
            <Box sx={style}>
                <h2>ToolBox</h2>
                <NavBar />
            </Box>
            <Outlet />
        </>
    )
}
export default Header