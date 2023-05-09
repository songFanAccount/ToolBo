import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import NavBar from './NavBar';

function Header() {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#011627',
        border: 0,
        mt: 0,
        py: 0,
        height: 75
    }
    const titleStyle = {
        color: '#fdfffc',
        border: 0,
        mt: 'auto',
        mb: 'auto',
        py: 0,
        fontFamily: 'Braah One',
        fontSize: 40,
        fontWeight: 'bold',
        text: "ToolBox"
    }
    return (
        <>
            <Box sx={headerStyle}>
                <Typography component="h1" sx={titleStyle}>ToolBox</Typography>
                <NavBar />
            </Box>
            <Outlet />
        </>
    )
}
export default Header