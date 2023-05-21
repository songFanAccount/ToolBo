import { Box } from "@mui/material"
import CollaboratorInfo from "../CollaboratorInfo"
import SideNavBar from "../SideNavBar"
import ToolPageNav from "../ToolPageNav"

function SideBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 350,
                backgroundColor: '#ADD8E6',
                position: 'fixed',
                top: 100,
                height: 'calc(100vh - 100px)',
                zIndex: 9,
            }}
        >
            <SideNavBar inHeader={false}/>
            <ToolPageNav/>
            <CollaboratorInfo/>
        </Box>
    )
}

export default SideBar