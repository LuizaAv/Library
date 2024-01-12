import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from '../partials/book';
import AliceCarousel from "react-alice-carousel";
import "./userLoans.css"

export default function UserLoans({ userId, bookInfo }) {
  const [userLoans, setUserLoans] = useState([]);

  //function send the token and userId to backend and getback response about the users, books they loan and borrowed / return dates
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

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  const returnDay = (new Date()).toISOString();

  //extracting the books which user loan by isbn of book and show it in user's homepage with integrated slider
  const show = userLoans.map((item) => {
    const matchingBook = bookInfo.find((elem) => elem.isbn === item.book);

    return (
      <div key={item._id} className='loanBook' style = {item.return_date.slice(0,10) === returnDay.slice(0,10) ? {color: "red"} : null}>
        <h4>Expire date: </h4>
        <div>{item.return_date.slice(0, 10)}</div>
        {matchingBook && (
          <Book
            key={item.book}
            bookInfo={matchingBook}
          />
        )}
      </div>
    );
  });
  
  return (
    <div className='userLoanMainContainer'>
      <h1>User's Borrowed Books</h1>
      <div className= "userLoansContainer">
        <AliceCarousel
          infinite
          wrap="true"
          mouseTracking
          items={show}
          responsive={responsive}
          controlsStrategy="alternate"
          className="slide"
        />
      </div>
    </div>
  );
}