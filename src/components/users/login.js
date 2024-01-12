import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from "axios";

export default function Login({ onUpdate }) {
  const isLogged = localStorage.getItem("loggedIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  //based on changes userData, isLogged page rerenders and if user is logged in this function redirect to /login/userhomepage/${userData.email}
  useEffect(() => {
    if (isLogged) {
      navigate(`/login/userhomepage/${userData.email}`);
    }
  }, [userData, isLogged]);

  //handle email input value change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  //handle password input value change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //onclick eye icon the password becomes visible and eye icon changed, and vise versa
  const changeVisibility = (e) => {
    let element = document.getElementById("passwordLogin");
    if (element.type === "password") {
      element.type = "text";
      setShow(true);
    } else {
      element.type = "password";
      setShow(false);
    }
  };

  //onclick submit button we send user's email and password and also token to backend to verify are there a user, if yes check is the password correct or not, and if yes set in local storage users token, also send message to App component to update isLoggin property as true
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      onUpdate(true);
      setUserData(user);

      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Login error:", error.response);
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
          value={email}
          onChange={handleEmail}
          className="loginInput"
        />
        <label>Password</label>
        <div id="passwordInputContainer">
          <input
            type="password"
            placeholder="...enter the password"
            value={password}
            onChange={handlePassword}
            className="loginInput"
            id="passwordLogin"
          />
          {show ? (
            <BiShow className="icon" onClick={changeVisibility} />
          ) : (
            <BiHide className="icon" onClick={changeVisibility} />
          )}
        </div>
        <input type="submit" value="Submit" className="loginSubmit" />
      </form>
      <Link to="/login/register" target="_blank" className="loginLink">
        <div className="switchToReg">
          <div>Switch to registration</div>
        </div>
      </Link>
    </div>
  );
}
