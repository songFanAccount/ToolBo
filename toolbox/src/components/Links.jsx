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
export function NavBarLink(props) {
    console.log(props)
    const sx = {
        mx: 3
    }
    return (
        <LinkConstructor 
            href={props.href} 
            text={props.text}
            sx={sx}
        />
    )
}