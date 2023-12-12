
import "./register.css"

export default function Register(){
    return(
        <div className="registrationContainer">
            <h1>Registration form</h1>
            <form className="registrationForm">
                <div className="fullNameContainer">
                    <div className="fullNameDivs">
                        <label>Name</label>
                        <input placeholder="  enter your name" className="fullNameInput"/>
                    </div>
                    <div className="fullNameDivs">
                        <label>Surename</label>
                        <input placeholder="  enter your surename" className="fullNameInput"/>
                    </div>
                </div>
                <label>Email</label>
                <input placeholder="  enter the email" className="registrationInputs"/>
                <label>Mobile number</label>
                <input placeholder="  enter your mobile number" className="registrationInputs"/>
                <label>Choose the Wave</label>
                <select name = "Waves" className="registrationSelect">
                    <option value = "Wave 6">Wave 6</option>
                    <option value = "Wave 5">Wave 5</option>
                    <option value = "Wave 4">Wave 4</option>
                    <option value = "Wave 3">Wave 3</option>
                    <option value = "Wave 2">Wave 2</option>
                    <option value = "Wave 1">Wave 1</option>
                </select>
                <input type = "submit" value = "Submit" className = "registrationSubmit"/>
            </form>
        </div>
    )
}