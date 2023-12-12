import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
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
        <input
          type="text"
          placeholder="...enter the password"
          value={password}
          onChange={handlePassword}
          className="loginInput"
        />
        <input type="submit" value="Submit" className="loginSubmit" />
      </form>
      <Link to="/register" target="_blank" className="loginLink">
        Do you forget password?
      </Link>
    </div>
  );
}
