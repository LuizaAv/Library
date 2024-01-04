
import { useEffect, useState } from "react";
import "./userHomepage.css"
import axios from "axios";
import femalePic from "../../images/female.jpg";
import malePic from "../../images/male.jpg"


export default function UserHomePage(){
    const [userData, setUserData] = useState("");
    //const location = useLocation();
    //const email = location.pathname.slice(20);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get("http://localhost:3001/users/userHomePage", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Fetch data error:", error.response);
            }
        }
    
        fetchData();
    }, []);

    return (
        <div >
            {
                userData ? 
                (
                <div className="userHomeContainer">
                    <div className="avatarContainer">
                        <img src = {userData.gender === "Female" ? femalePic : malePic} className="avatar"/>
                    </div>
                    <div className="infoContainer">
                        <h2>{`${userData.name}  ${userData.surname}`}</h2>
                        <h3>{userData.wave}</h3>
                        <h4>Borrowed books: </h4>
                        <h4>Expire date: </h4>
                    </div>
                </div>
                )
                : <div>...Loading</div>
            }
        </div>
    )
}