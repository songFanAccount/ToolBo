import { Box, useMediaQuery } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { tools } from "../../../data"
import SideBar from "./SideBar"

/*
THIS MIGHT BREAK IF CATEGORY NAME = TOOL NAME BUT NOT SURE
*/
function getToolInfo(curPath) {
    if(curPath.startsWith('/tools')) {
        let cat = tools
        //let cats = []
        let names = ['Categories']
        let path = '/tools'
        let urls = ['/tools']
        const routes = curPath.split('/')
        for(let i = 2; i < routes.length; i++) {
            const newCat = cat.subCategories?.[routes[i]]
            if(newCat) { // Valid subcategory case
                cat = newCat
                //cats.push(routes[i])
                path += `/${routes[i]}`
                urls.push(path)
                names.push(cat.displayName)
            } else { // Not subcategory, check if it is a tool
                const tool = cat.tools?.[routes[i]]
                if(tool) {
                    names.push(tool)
                    path += `/${routes[i]}`
                    urls.push(path)
                }
                break
            }
        }
        const ret = {
            displayNames: names,
            pathURLs: urls
        }
        return ret
    } else {
        throw new Error("Should only be called if URL is valid and starts with /tools. Are you using this function elsewhere?")
    }  
}
function ToolPageLayout() {
    let dimX = 0
    if(useMediaQuery('(min-width:900px)')) {
        dimX = 1
    }
    /*
    It is the responsibility of the layout to figure out the following info of the tool from the URL:
    - Chain of display names -> Page path display
    - Chain of path names -> Making page path interactive
    - Potentially info about the tool's category but not needed ATM
    */
    const location = useLocation()
    const pathName = location.pathname
    let curToolName = ''
    try {
        const toolInfo = getToolInfo(pathName)
        const displayNames = toolInfo.displayNames
        const pathURLs = toolInfo.pathURLs
        curToolName = displayNames.at(-1)
    } catch(e) {
        console.log(e.message)
    }
    return(
        <>
            <Box
                sx={{
                    width: 350,
                }}
            >
                {dimX > 0 && <SideBar toolName={curToolName}/>}
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