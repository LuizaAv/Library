
import { useEffect, useState } from "react";
import "./userHomepage.css"
import axios from "axios";
import femalePic from "../../images/female.jpg";
import malePic from "../../images/male.jpg";
import UserLoans from "./userLoans";
import AdminPage from "./adminPage";


export default function UserHomePage({booksData}){
    const books = booksData;
    const [userData, setUserData] = useState("");
    const [userId, setUserId] = useState("");
    // const [show, setShow] = useState(false)
    
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
                
                if (response.data && response.data._id) {
                    setUserId(response.data._id); 
                }

                // response.data.role === "admin" ? setShow(true) : setShow(false)
            } catch (error) {
                console.error("Fetch data error:", error.response);
            }
        }
    
        fetchData();
    }, []);

    return (
        <div className = "container">
            {
                userData ? 
                (
                <div className="userHomeContainer">
                    <div className = "userHome">
                        <div className="avatarContainer">
                            <img src = {userData.gender === "Female" ? femalePic : malePic} className="avatar"/>
                        </div>
                        <div className="infoContainer">
                            <h1>{`${userData.name}  ${userData.surname}`}</h1>
                            <h3>{userData.wave}</h3>
                        </div>
                    </div>
                    {
                        userData.role === "admin" ? <AdminPage /> :null
                    }
                </div>
                )
                : <div>...Loading</div>
            }
            <div className={userData.role === "admin" ? "hidden" : null}>
                <UserLoans userId={userId} bookInfo = {books} />
            </div>
        </div>
    )
}