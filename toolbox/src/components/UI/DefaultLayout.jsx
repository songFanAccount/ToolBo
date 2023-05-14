import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import SideNavBar from './SideNavBar';
import MathsExpressionParser from '../Maths/MathsExpressionParser';

function DefaultLayout() {
    /*
    use dimX to determine which version to render (mobile, desktop etc)
    0 -> smallest
    1 -> ipad/desktop?
    */
    let dimX = 0
    if(useMediaQuery('(min-width:900px)')) {
        dimX = 1
    }
    // MAYBE TODO: Add new dimX = 2 for min-width:900px
    const pageStyle = {
        minHeight: '100vh',
        backgroundColor: "#ADD8E6"
    }
    return (
        <Box
            sx={pageStyle}
        >
            <Header dimX={dimX}/>
            {dimX > 0 && <SideNavBar dimX={dimX} inHeader={false}/>}
            <MathsExpressionParser
                sx={{
                    width: 500,
                }}
            />
            <Outlet dimX={dimX}/>
        </Box>
    )
}

export default DefaultLayout