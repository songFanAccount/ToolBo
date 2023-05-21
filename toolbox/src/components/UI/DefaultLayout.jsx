import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import SideBar from './SideBar';

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
    return (
        <>
            <Box className="Background"
                sx={{
                    position: 'fixed',
                    width: 'calc(100vw + 10px)',
                    overflowX: 'clip',
                    height: '100vh',
                    backgroundColor: '#eeeeee',
                    zIndex: 7
                }}
            />
            <Box className="defaultLayout"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: 'calc(100vw+10px)',
                    overflowX: 'clip',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 9,
                }}
            >
                <Header dimX={dimX}/>
                <Box
                    sx={{
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: 350,
                        }}
                    >
                        {dimX > 0 && <SideBar/>}
                    </Box>
                </Box>
            </Box>
            <Box className="pageContent"
                sx={{
                    position: 'absolute',
                    overflowX: 'clip',
                    top: 100,
                    left: 350,
                    zIndex: 8,
                }}
            >
                <Outlet dimX={dimX}/>
            </Box>
        </>
    )
}

export default DefaultLayout