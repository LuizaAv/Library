import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const changeVisibility = (e) => {
    let element = document.getElementById("passwordLogin");
    if(element.type === "password"){
      element.type = "text"
      setShow(true)
    }else{
      element.type = "password"
      setShow(false)
    }
  }

  return (
    <div className="loginContainer">
      <h1>Login form</h1>
      <form className="loginForm">
        <label>Email</label>
        <input
          type="text"
          placeholder="...enter an email"
          value = {email}
          onChange={handleEmail}
          className="loginInput"
        />
        <label>Password</label>
        <div id = "passwordInputContainer">
          <input
            type="password"
            placeholder="...enter the password"
            value={password}
            onChange={handlePassword}
            className="loginInput"
            id = "passwordLogin"
          />
          {show ? <BiShow className= "icon" onClick={changeVisibility}/> : 
          <BiHide  className= "icon" onClick={changeVisibility}/>}
        </div>
        <input type="submit" value="Submit" className="loginSubmit" />
      </form>
      <Link to="/register" target="_blank" className="loginLink">
        Do you forget password?
      </Link>
    </div>
  );
}
