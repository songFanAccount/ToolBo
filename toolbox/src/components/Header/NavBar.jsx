import { Box } from '@mui/material';
import { NavBarLink } from '../Links';

function NavBar() {
    const barStyle = {
        mt: 'auto',
        mb: 'auto',
        mr: 2.5,
        //backgroundColor: 'red'
    }
    return (
        <Box sx={barStyle}>
            <NavBarLink href="/" text="Home"/>
            <NavBarLink href="about" text="About Us"/>
            <NavBarLink href="contact" text="Contact Us"/>
        </Box>
    )
}
export default NavBar