import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate} from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from "axios";


export default function Login({onUpdate, loggedIn}) {
  const isLogged = loggedIn;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(isLogged){
      navigate(`/login/userhomepage/${userData.email}`)
    }
  }, [userData, isLogged])

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password
      });
      onUpdate(true);
      console.log(response)
      setUserData(response.data.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="loginContainer">
      <h1>Login form</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
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
      <Link to="/login/register" target="_blank" className="loginLink">
        <div className="switchToReg">
          <div>Do you forget password?</div>
          <div>Switch to registration</div>
        </div>
      </Link>
    </div>
  );
}
