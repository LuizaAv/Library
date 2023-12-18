import "./main.css";
import libraryPicture from "../../images/library1.jpg";
import Book from "../partials/book";
import { useState } from "react";
import { Link } from "react-router-dom";

const books = [
  {
    title: "C++",
    author: "Stroustrup",
  },
  {
    title: "Javascript",
    author: "Flanagan",
  },
  {
    title: "You don't know Javascript",
    author: "Kyle Simpson",
  },
  {
    title: "C++",
    author: "Stroustrup",
  },
  {
    title: "Javascript",
    author: "Flanagan",
  },
  {
    title: "You don't know Javascript",
    author: "Kyle Simpson",
  },
  {
    title: "C++",
    author: "Stroustrup",
  },
  {
    title: "Javascript",
    author: "Flanagan",
  },
  {
    title: "You don't know Javascript",
    author: "Kyle Simpson",
  },
];



export default function Main() {
  const [start, setStart] = useState(0)
  const [displayedBooks, setDisplayedBooks] = useState(books.slice(0, 3));
  const [check, setCheck] = useState(false)

  const handleClick = () => {
    if (start + 3 < books.length) {
      const newStart = start + 3;
      const newBooks = books.slice(newStart, newStart + 3);
      setStart(newStart);
      setDisplayedBooks([...displayedBooks, ...newBooks]);
    }else{
      setCheck(true)
    }
  };

  const bookChunks = [];
  for (let i = 0; i < displayedBooks.length; i += 3) {
    bookChunks.push(displayedBooks.slice(i, i + 3));
  }

  return (
    <div className="mainComponentContainer">
      <img src={libraryPicture} alt="libraryPicture" className="libraryPic" />
      <div className="contentContainerOfMain">
        <h1>Our Library</h1>
        <h1>Collection of Books</h1>
          <div className="booksRange">
            {bookChunks.map((chunk, index) => (
              <div key={index} className="aRange">
                {chunk.map((book, idx) => (
                  <Book key={idx} bookInfo={book} />
                ))}
              </div>
            ))}
          </div>
          <Link to = "./library">
            <button className="viewMoreBtn">View all</button>
          </Link>   
      </div>
    </div>
  );
}
