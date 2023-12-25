import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import axios from "axios"

export default function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [wave, setWave] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/register", {name, surname, email, mobile, wave, password})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleSurname = (e) => {
        setSurname(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleMobile = (e) => {
        setMobile(e.target.value)
    }

    const handleWave = (e) => {
        setWave(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <div className="registrationContainer">
        <h1>Registration form</h1>
        <form className="registrationForm" onSubmit={handleSubmit}>
            <div className="fullNameContainer">
            <div className="fullNameDivs">
                <label>Name</label>
                <input 
                placeholder="  enter your name" 
                type = "text"
                value = {name}
                onChange={handleName}
                className="fullNameInput" 
                />
            </div>
            <div className="fullNameDivs">
                <label>Surname</label>
                <input
                placeholder="  enter your surname"
                type = "text"
                value = {surname}
                onChange = {handleSurname}
                className="fullNameInput"
                />
            </div>
            </div>
            <label>Email</label>
            <input 
            placeholder="  enter the email" 
            type = "email"
            value = {email}
            onChange = {handleEmail}
            className = "registrationInputs" 
            />
            <label>Mobile number</label>
            <input
            placeholder="  enter your mobile number"
            type="number"
            value = {mobile}
            onChange = {handleMobile}
            className="registrationInputs"
            />
            <label>Choose the Wave</label>
            <select 
            name="Waves" 
            className="registrationSelect"
            value = {wave}
            onChange = {handleWave}
            >   
                <option value="Wave 6">Wave 6</option>
                <option value="Wave 5">Wave 5</option>
                <option value="Wave 4">Wave 4</option>
                <option value="Wave 3">Wave 3</option>
                <option value="Wave 2">Wave 2</option>
                <option value="Wave 1">Wave 1</option>
                <option value="Atlas">Atlas</option>
                <option value="Arakis">Arakis</option>
            </select>
            <label>Create Password</label>
            <input
            placeholder="  enter a password, at least 8 digits"
            type = "password"
            value = {password}
            onChange = {handlePassword}
            className="registrationInputs"
            />
            <label>Repeat Password</label>
            <input
            placeholder="  repeat the entered password to confirm it"
            type = "password"
            value = {confirmPassword}
            onChange={handleConfirmPassword}
            className="registrationInputs"
            />
            <input type="submit" value="Submit" className="registrationSubmit" />
            <Link to="/login" target="_blank" className="registerLink">
                Have you already an account?
            </Link>
        </form>
        </div>
    );
}
