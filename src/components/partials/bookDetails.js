import Book from "./book";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pictureBook from "../../images/book2.png"
import axios from "axios";
import "./bookdetails.css";
import { useState } from "react";
import Popup from "../users/popup";

export default function Bookdetails({ data }) {
  const res = data;
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.slice(21, location.pathname.length);
  const book = res ? res.find((elem) => elem.isbn === id) : null;

  //books' db filtered by category to find which ones has the same category of the book which page we navigate to
  const relatedBooks = res.filter((elem) =>
    elem.category.some((item) => (elem.isbn !== id && book.category.includes(item)))
  );

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDc6T6ZoFDZRswbFXfYw8KEOi57VN_w_6w"
  );

  //by using Google generative AI's API I send to this function the text which i want and book title, and it generates for me description about the book and set text with response
  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Please give me short (3-4 lines)  description about the book ${book.title}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setText(text);
    setCheck(true);
  };

  //on the book page user who is logged in, can borrow it, here function get loggedIn and token from localStorage and send request with bookid and token to backend to create a new loan for user, if user isn't loggedIn function navigates user to /login page 
  const handleBorrow = async () => {
    const loggedIn = localStorage.getItem("loggedIn");
    const token = localStorage.getItem("token");

    if (loggedIn) {
      if (book.availability) {
        try {
          const bookId = id;

          const response = await axios.post(
            "http://localhost:3001/loans",
            { bookId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          if(response.status === 201){
            setSuccess(true)
          }

        } catch (error) {
          console.error("Error borrowing book:", error);
        }
      } else {
        console.log("Book not available for borrowing");
      }
    } else {
      navigate(`/login`);
    }
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 5 },
  };

  //here I organize show of related books' with integrated slider
  const show = relatedBooks.map((item) => (
    <div className="item" data-value="1" key = {item.isbn}>
      <Link 
        to={{
            pathname: `/library/bookdetails/${item.isbn}`,
            state: {item}
        }} 
        target="_blank" 
        className="aBooksLink">
        <img src={pictureBook} className="sliderPic" alt="slidePicture"/>
        <div>
        <span>{item.title }</span><br/>
        <span>{item.authors}</span>
        </div>
      </Link>
    </div>
  ))

  //after successfully logging in there will be popup, with this function user can close it and go on
  const closePopup = () => {
    setSuccess(false)
  }

  return (
    <div>
      {!book ? (
        <div>...Loading</div>
      ) : (
        <div className="bookDetailsContainer">
          <div className="firstColoumnBookDetails">
            <Book bookInfo={book} />
          </div>
          <div className="secondColoumnBookDetails">
            <h1>{book.title}</h1>
            <h4>
              <span>Author:</span> {book.authors}
            </h4>
            <h4>
              <span>Genre:</span> {book.category.map((elem) => `${elem}, `)}
            </h4>
            <h4>
              <span>Synopsis:</span>
              {!check ? (
                <button onClick={fetchData} className="bookDetailsBtn">
                  Generate description
                </button>
              ) : (
                <div className="generatedDescription">{`  ${text}`}</div>
              )}
            </h4>
            <div className="borrowReserveContainer">
              <button className="bookDetailsBtn" onClick={handleBorrow}>
                Borrow
              </button>
              {
                success && (
                  <Popup popUp = {closePopup} textMessage = "Book was borrowed!"/>
                )
              }
            </div>
          </div>
        </div>
      )}
        <div className="relatedBooksContainer">
            <h1 className="recentAddH1">Related books</h1>
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
