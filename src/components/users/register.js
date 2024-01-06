import { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  validationOfEmail,
  validationOfNameSurname,
  validationOfPassword,
} from "./regValidations";

export default function Register() {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameErr, setSurnameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [mobile, setMobile] = useState("");
  const [wave, setWave] = useState("Wave 6");
  const [gender, setGender] = useState("Female");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState(false);
  const [successReg, setSuccessReg] = useState("");
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (successReg) {
      setShowPopup(true);
    }
  }, [showPopup, successReg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/register", {
        name,
        surname,
        email,
        password,
        mobile, 
        wave, 
        gender
      });
      if (response.status === 201) {
        setSuccessReg(true);  
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleName = (e) => {
    let nameInput = e.target.value;
    setName(nameInput);

    if (validationOfNameSurname(nameInput) && name !== "") {
      setNameErr(false);
    } else {
      setNameErr("Name must contain only letter");
    }
  };

  const handleSurname = (e) => {
    let surNameInput = e.target.value;
    setSurname(surNameInput);
    if (validationOfNameSurname(surNameInput) && surname !== "") {
      setSurnameErr(false);
    } else {
      setSurnameErr("Surname must contain only letter");
    }
  };

  const handleEmail = (e) => {
    const emailVal = e.target.value;
    setEmail(emailVal);

    if (emailVal.length >= 10) {
      if (validationOfEmail(emailVal)) {
        setEmailErr(false);
      } else {
        setEmailErr("Please check email format");
      }
    }
  };

  const handleMobile = (e) => {
    setMobile(e.target.value);
  };

  const handleWave = (e) => {
    setWave(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  }

  const handlePassword = (e) => {
    let pass = e.target.value;
    setPassword(pass);

    if (pass.length >= 8) {
      if (validationOfPassword(pass)) {
        setPasswordErr(false);
      } else {
        setPasswordErr(
          "Password must contain at least one lowercase and one uppercase letter, at least one digit, at least one special character"
        );
      }
    }
  };

  const handleConfirmPassword = (e) => {
    let confPass = e.target.value;
    setConfirmPassword(confPass);

    if (confPass === password) {
      setConfirmPassErr(false);
    } else if (password === "") {
      setConfirmPassErr("You must complete password field");
    } else {
      setConfirmPassErr("The input doesn't match with password");
    }
  };

  const closePopup = () => {
    setShowPopup(false); 
    navigate(`/login`); 
  };

  return (
    <div className="registrationContainer">
      <h1>Registration form</h1>
      <form className="registrationForm" onSubmit={handleSubmit}>
        <div className="fullNameContainer">
          <div className="fullNameDivs">
            <label>Name</label>
            <input
              placeholder="  enter your name"
              type="text"
              value={name}
              onChange={handleName}
              className="fullNameInput"
            />
            {nameErr && <div className="errorReg">{nameErr}</div>}
          </div>
          <div className="fullNameDivs">
            <label>Surname</label>
            <input
              placeholder="  enter your surname"
              type="text"
              value={surname}
              onChange={handleSurname}
              className="fullNameInput"
            />
            {surnameErr && <div className="errorReg">{surnameErr}</div>}
          </div>
        </div>
        <label>Email</label>
        <input
          placeholder="  enter the email"
          type="email"
          value={email}
          onChange={handleEmail}
          className="registrationInputs"
        />
        {emailErr && <div className="errorReg">{emailErr}</div>}
        <label>Mobile number</label>
        <input
          placeholder="  enter your mobile number"
          type="number"
          value={mobile}
          onChange={handleMobile}
          className="registrationInputs"
        />
        <label>Choose the Wave</label>
        <select
          name="Waves"
          className="registrationSelect"
          value={wave}
          onChange={handleWave}
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
        <label>Gender</label>
        <select
          name="Gender"
          className="registrationSelect"
          value={gender}
          onChange={handleGender}
        >
          <option value="Wave 6">Female</option>
          <option value="Wave 5">Male</option>
        </select>
        <label>Create Password</label>
        <input
          placeholder="  enter a password, at least 8 digits"
          type="password"
          value={password}
          onChange={handlePassword}
          className="registrationInputs"
        />
        {passwordErr && <div className="errorReg">{passwordErr}</div>}
        <label>Repeat Password</label>
        <input
          placeholder="  repeat the entered password to confirm it"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          className="registrationInputs"
        />
        {confirmPassErr && <div className="errorReg">{confirmPassErr}</div>}
        <input type="submit" value="Submit" className="registrationSubmit" />
        {showPopup && ( 
          <div className="popup">
            <div className="popup-content">
              <p>Registration Successful!</p>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
        <Link to="/login" target="_blank" className="registerLink">
          Have you already an account?
        </Link>
      </form>
    </div>
  );
}
