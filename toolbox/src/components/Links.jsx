import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function LinkConstructor(props) {
    return (
        <Link 
            component={RouterLink}
            to={props.href}
            sx={props.sx}
        >
            {props.text}
        </Link>
    )
}
export function LogoLink(props) {
    const sx = {
        textDecoration: 'none',
        color: 'inherit'
    }
    return (
        <LinkConstructor 
            href={props.href} 
            text={props.text}
            sx={sx}
        />
    )
}
export function NavBarLink(props) {
    const sx = {
        mx: 3.5,
        fontSize: 20,
        fontFamily: 'Gills Sans',
        color: '#fdfffc',
        textDecoration: 'none',
        '&:hover': {
            color: '#ced4da'
        }
    }
    return (
        <LinkConstructor 
            href={props.href} 
            text={props.text}
            sx={sx}
        />
    )
}