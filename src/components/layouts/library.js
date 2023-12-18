import { useState } from "react";
import Book from "../partials/book";
import { BsSearch } from "react-icons/bs";
import "./library.css";

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

export default function Library() {
  const [value, setValue] = useState("")
  const [input, setInput] = useState("");
  const [start, setStart] = useState(0);
  const [displayedBooks, setDisplayedBooks] = useState(books.slice(0, 3));
  const [check, setCheck] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);
  
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setInput(value);
      setValue("");
    }
  };

  const searchClick = (e) =>{
    setInput(value);
    setValue("");
  }

  const handleClick = () => {
    if (start + 3 < books.length) {
      const newStart = start + 3;
      const newBooks = books.slice(newStart, newStart + 3);
      setStart(newStart);
      setDisplayedBooks([...displayedBooks, ...newBooks]);
    } else {
      setCheck(true);
    }
  };

  const handleFilteredClick = (filter) => {
    if (activeFilter.includes(filter)) {
      setActiveFilter(activeFilter.filter((f) => f !== filter));
    } else {
      setActiveFilter([...activeFilter, filter]);
    }
  };

  const filterIsActive = (filter) => activeFilter.includes(filter);

  const reset = (e) => {
    setActiveFilter([]);
  };
  console.log(input)

  const bookChunks = [];
  for (let i = 0; i < displayedBooks.length; i += 3) {
    bookChunks.push(displayedBooks.slice(i, i + 3));
  }

  return (
    <div className="libraryContainer">
      <div className="filterContainer">
        <div className="searchInputContainer">
          <input
            placeholder="  Search books"
            className="searchInput"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
          />
          <div onClick={searchClick} className="iconInDibrary">
            <BsSearch/>
          </div>
        </div>
        <div className="buttonsContainer">
          <button
            className={
              filterIsActive("All-books")
                ? "filterBtnActive"
                : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("All-books")}
          >
            All-books
          </button>
          <button
            className={
              filterIsActive("C++") ? "filterBtnActive" : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("C++")}
          >
            C++
          </button>
          <button
            className={
              filterIsActive("Javacript")
                ? "filterBtnActive"
                : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("Javacript")}
          >
            Javacript
          </button>
          <button
            className={
              filterIsActive("Java") ? "filterBtnActive" : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("Java")}
          >
            Java
          </button>
          <button
            className={
              filterIsActive("Python") ? "filterBtnActive" : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("Python")}
          >
            Python
          </button>
          <button
            className={
              filterIsActive("C") ? "filterBtnActive" : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("C")}
          >
            C
          </button>
        </div>
        <button className="filterResetBtn" onClick={reset}>
          Reset filters
        </button>
      </div>
      <div className="libraryBooksContainer">
        {bookChunks.map((chunk, index) => (
          <div key={index} className="aRange">
            {chunk.map((book, idx) => (
              <Book key={idx} bookInfo={book} />
            ))}
          </div>
        ))}
        {!check && (
          <button onClick={handleClick} className="viewMoreBtn">
            View more
          </button>
        )}
      </div>
    </div>
  );
}
