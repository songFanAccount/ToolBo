import { NavBarLink } from './Links';

function NavBar() {
    return (
        <span className="NavBar">
            <NavBarLink href="about" text="About Us"/>
            <NavBarLink href="contact" text="Contact Us"/>
        </span>
    )
}
export default NavBar