import "./navbar.css";
import { useState, useEffect } from "react";
import logo from "../../images/logo.png"
import { BsSearch } from "react-icons/bs"
import { RiUserSharedLine } from "react-icons/ri";
import { RiUserReceivedLine } from "react-icons/ri";
import { Link, useLocation} from "react-router-dom"


export default function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("loggedIn")));
    const location = useLocation();

    //based on isLoggedIn and location.pathname navbar rerenders to update the state
    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem("loggedIn")));
    }, [location.pathname, isLoggedIn]);

    //function removes loggedIn and token from local storage
    const logout = () => {
        localStorage.removeItem("loggedIn", "");
        localStorage.removeItem("token", "");
        setIsLoggedIn(false);
    };

    //onclick login/logout icon funtcion set state of isLoggedIn and if user logged in it calls logout function
    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
        if (isLoggedIn) {
            logout();
        }
    };
    
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
                <Link to = "/login" className="navbarLinks" onClick={handleLoginClick}>
                    {isLoggedIn ? <RiUserSharedLine className="icons" /> : <RiUserReceivedLine className="icons"/>}
                </Link>
            </div>
        </div>
    )
}