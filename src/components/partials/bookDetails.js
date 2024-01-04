import Book from "./book";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import "./bookdetails.css";
import { useState } from "react";

export default function Bookdetails({data}) {
  const res = data
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.slice(21, location.pathname.length);
  const book = res ? res.find((elem) => elem.isbn === id) : null;

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDc6T6ZoFDZRswbFXfYw8KEOi57VN_w_6w"
  );

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Please give me short (3-4 lines)  description about the book ${book.title}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setText(text);
    setCheck(true);
  };

  // Inside handleBorrow function
const handleBorrow = async () => {
  const loggedIn = localStorage.getItem("loggedIn");
  const token = localStorage.getItem("token");
  
  if (loggedIn) {
    if (book.availability) {
      try {
        const userId = "65942f9f9c61cd85fb34799b"
        const bookId = id; // Assuming book.id holds the book's unique identifier

        const response = await axios.post('http://localhost:3001/loans', { userId, bookId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        // Handle successful loan creation (update user's profile, etc.)
        // ... (update user's profile with loan details)
      } catch (error) {
        // Handle error (e.g., book not available, API request failure)
        console.error('Error borrowing book:', error);
      }
    } else {
      // Notify user that the book is not available for borrowing
      console.log('Book not available for borrowing');
    }
  } else {
    navigate(`/login`);
  }
}

  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 3 },
  //   1024: { items: 5 },
  // };

  // const items = data.filter(
  //   (elem) =>
  //     elem.title.toLocaleLowerCase().trim().includes(book.title.slice(0, 10).toLocaleLowerCase().trim())
  // );
  // console.log(items)

  return (
    <div >
      {!book ? <div>...Loading</div> :
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
              <button onClick={fetchData} className="bookDetailsBtn">Generate description</button>
            ) : (
              <div className="generatedDescription">{`  ${text}`}</div>
            )}
          </h4>
          <div className="borrowReserveContainer">
            <button className="bookDetailsBtn" onClick = {handleBorrow}>Borrow</button>
          </div>
        </div>
      </div>
    }
    </div>
  );
}
