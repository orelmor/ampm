import { NavLink } from "react-router-dom";
import "./Menu.css";
import { Button } from "react-bootstrap";

function Menu(): JSX.Element {
    return (
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/home" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products" className="nav-link">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/addProduct" className="nav-link">Add Products</NavLink>
                    </li>
                </ul>
            </nav>
       
    );
}

export default Menu;
