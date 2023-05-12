import { Box, Typography, Link } from '@mui/material';
import NavBar from './NavBar';
import { Link as RouterLink } from 'react-router-dom';
import SideNavBar from '../SideNavBar';

function Header(props) {
    const dimX = props.dimX
    // Below styles are the default (dimX == 1, vw >= 600px) style
    let headerStyle = {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#011627',
        height: 100
    }
    let titleStyle = {
        color: '#fdfffc',
        ml: 5,
        mt: 1.5,
        py: 0,
        fontFamily: 'Braah One',
        fontSize: 40,
        fontWeight: 'bold'
    }
    switch(dimX) {
        case 0: // Case for small vw
            titleStyle = {
                ...titleStyle,
                ml: 0
            }
            break
        case 1:
            break
        default:
            throw new Error("Invalid dimX")
    }
    
    return (
        <Box sx={headerStyle}>
            {dimX == 0 && <SideNavBar inHeader={true}/>}
            <Link
                component={RouterLink}
                to="/"
                sx={{
                    textDecoration: 'none',
                    my: 'auto',
                    p: 1
                }}
            >
                <Typography component="h1" sx={titleStyle}>
                    ToolBox
                </Typography>
            </Link>
            <NavBar dimX={dimX}/>
        </Box>
    )
}
export default Header