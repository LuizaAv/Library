import "./navbar.css"
import logo from "../../images/logo.png"
import { BsSearch } from "react-icons/bs"
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom"


export default function Navbar(){

    return(
        <div className="navMainContainer">
            <div className="logoContainer">
                <Link to = "/">
                    <img className = "logo" src = {logo} alt = "Logo" />
                </Link>
            </div>
            <div className="linkContainer">
                <Link to = "/" className="navbarLinks">
                    Home
                </Link>
                <Link to = "/library" className="navbarLinks">
                    Dibrary
                </Link>
                <Link to = "/library" className="navbarLinks">
                    <BsSearch className="icons"/>
                </Link>
                <Link to = "/login" className="navbarLinks">
                    Login/Registration
                </Link>
                <Link to = "/login" className="navbarLinks">
                    <BsFillPersonFill className="icons"/>
                </Link>
            </div>
        </div>
    )
}