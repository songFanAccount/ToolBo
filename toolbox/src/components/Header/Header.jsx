import { Box, Typography } from '@mui/material';
import NavBar from './NavBar';
import { LogoLink } from '../Links';

function Header() {
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#011627',
        border: 0,
        mt: 0,
        py: 0,
        height: 100
    }
    const titleStyle = {
        color: '#fdfffc',
        border: 0,
        mt: 3.2,
        mb: 0,
        ml: 5,
        py: 0,
        fontFamily: 'Braah One',
        fontSize: 40,
        fontWeight: 'bold',
        text: "ToolBox"
    }
    return (
        <>
            <Box sx={headerStyle}>
                <Typography component="h1" sx={titleStyle}>
                    <LogoLink href="/" text="ToolBox"/>
                </Typography>
                <NavBar />
            </Box>
        </>
    )
}
export default Header