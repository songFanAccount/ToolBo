import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function ToolPageLayout() {
    let dimX = 0
    if(useMediaQuery('(min-width:900px)')) {
        dimX = 1
    }
    return(
        <>
            <Box
                sx={{
                    width: 350,
                }}
            >
                {dimX > 0 && <SideBar/>}
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
            <Outlet/>
        </>
    )
}

export default ToolPageLayout