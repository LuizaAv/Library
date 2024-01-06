import "./navbar.css"
import logo from "../../images/logo.png"
import { BsSearch } from "react-icons/bs"
import { RiUserSharedLine } from "react-icons/ri";
import { RiUserReceivedLine } from "react-icons/ri";
import { Link } from "react-router-dom"

const logout = () => {
    localStorage.removeItem("loggedIn", "");
    localStorage.removeItem("token", "")
}

export default function Navbar(){
    const isLoggedIn = localStorage.getItem("loggedIn")
    return(
        <div className="navMainContainer">
            <div className="logoContainer">
                <Link to = "/" >
                    <img className = "logo" src = {logo} alt = "Logo" />
                </Link>
            </div>
            <div className="linkContainer">
                <Link to = "/" className="navbarLinks">
                    Home
                </Link>
                <Link to = "/library" className="navbarLinks" rel="icon" type="image/png" sizes="32x32" href="../../images/picsart_academy_logo.jpg">
                    Dibrary
                </Link>
                <Link to = "/library" className="navbarLinks">
                    <BsSearch className="icons"/>
                </Link>
                {
                    !isLoggedIn ?  <Link to = "/login" className="navbarLinks">
                                    Login/Registration
                                </Link>
                            :   <Link to = "/login/userhomepage/:id" className="navbarLinks">
                                    HomePage
                                </Link>
                }
                <Link to = "/login" className="navbarLinks">
                    {isLoggedIn ? <RiUserSharedLine className="icons" onClick={logout}/> : <RiUserReceivedLine className="icons"/>}
                </Link>
            </div>
        </div>
    )
}