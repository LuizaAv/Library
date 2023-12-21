import Book from "./book";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import data from "../../server/booksdb.json";

import "./bookdetails.css";
import { useState } from "react";

export default function Bookdetails() {
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const id = location.pathname.slice(21, location.pathname.length);
  const book = data.find((elem) => elem.isbn === id);

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

  return (
    <div className="bookDetailsContainer">
      <div className="firstColoumnBookDetails">
        <Book bookInfo={book} />
      </div>
      <div className="secondColoumnBookDetails">
        <h1>{book.title}</h1>
        <h4>
          <span>Author:</span> {book.author}
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
          <button className="bookDetailsBtn">Borrow</button>
          <button className="bookDetailsBtn">Reserve</button>
        </div>
      </div>
    </div>
  );
}
