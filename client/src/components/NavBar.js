import { NavLink } from "react-router-dom"
import "./NavBar.css";


function NavBar () {

    return(
        <nav>
            <NavLink
                to="/"
                className="navbar"
                >
                    Home
                </NavLink>
                <NavLink
                    to="/categories"
                    className="navbar"
                >
                    Categories
                </NavLink>
                <NavLink
                    to="/marketplaces"
                    className="navbar"
                >
                    Market Places
                </NavLink>
                <NavLink
                    to="/items"
                    className="navbar"
                >
                    Items
                </NavLink>
        </nav>
    );
}



export default NavBar