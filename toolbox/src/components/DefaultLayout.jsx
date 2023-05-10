import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import SideNavBar from './SideNavBar';

function DefaultLayout() {
    const pageStyle = {
        minHeight: '100vh',
        backgroundColor: "#ADD8E6"
    }
    return (
        <Box
            sx={pageStyle}
        >
            <Header/>
            <SideNavBar />
            <Outlet/>
        </Box>
    )
}

export default DefaultLayout