import { Link } from "react-router-dom";
import logo from "../img/logo1.png"

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to='/'>
             <img className='logo' src={logo} alt="logo" />
            </Link>
        </nav>
    );
}
 
export default Navbar;