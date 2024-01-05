import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../partials/book';
import "./userLoans.css"

export default function UserLoans({ userId, bookInfo }) {
  const [userLoans, setUserLoans] = useState([]);

  useEffect(() => {
    const fetchUserLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3001/loans", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            userId: userId
          }
        });
        setUserLoans(response.data);
      } catch (error) {
        console.error("Fetch data error:", error.response);
      }
    };

    fetchUserLoans();
  }, [userId]);

  const returnDay = (new Date()).toISOString();
  
  console.log(returnDay)
  return (
    <div className='userLoanMainContainer'>
      <h1>User's Borrowed Books</h1>
      <div className= "userLoansContainer">
        {userLoans.map((item) => (
          <div key={item._id} className='loanBook' style = {item.return_date.slice(0,10) === returnDay.slice(0,10) ? {color: "red"} : null}>
            <h4>Expire date: </h4>
            <div>{item.return_date.slice(0, 10)}</div>
            {bookInfo.find((elem) => elem.isbn === item.book) && (
              <Book
                key={item.book}
                bookInfo={bookInfo.find((elem) => elem.isbn === item.book)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}