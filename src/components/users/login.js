



import "./login.css";
import { Link } from "react-router-dom";

export default function Login(){
    return(
        <div className="loginContainer">
            <h1>Login form</h1>
            <form className = "loginForm">
                <label>Name</label>
                <input type = "text" placeholder = "...enter an email" className="loginInput"/>
                <label>Surename</label>
                <input type = "text" placeholder = "...enter the password" className="loginInput"/>
                <input type = "submit" value = "Submit" className = "loginSubmit"/>
            </form>
            <Link to = "/register" target="_blank" className="loginLink">Do you forget password?</Link>
        </div>
    )
}