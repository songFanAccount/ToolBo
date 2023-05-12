import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavBarLink } from '../Links';

function NavBar(props) {
    const dimX = props.dimX

    const barStyle = {
        my: 'auto',
        mr: 2.5,
        //backgroundColor: 'red'
    }
    const Contents = () => {
        switch (dimX) {
            case 0:
                return (
                    <IconButton>
                        <MenuIcon
                            sx={{
                                fontSize: 40,
                                color: '#fdfffc'
                            }}
                        />
                    </IconButton>
                )
                break;
            case 1:
                return (
                    <>
                        <NavBarLink href="/" text="Home"/>
                        <NavBarLink href="about" text="About Us"/>
                        <NavBarLink href="contact" text="Contact Us"/>
                    </>
                )
        }
    }
    return (
        <Box sx={barStyle}>
            <Contents/>
        </Box>
    )
}
export default NavBar