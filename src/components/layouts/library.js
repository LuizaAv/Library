import { useState, useEffect } from "react";
import Book from "../partials/book";
import { BsSearch } from "react-icons/bs";
import "./library.css";
import { Link } from "react-router-dom";

export default function Library({ data }) {
  let result = data;
  const [value, setValue] = useState("");
  const [start, setStart] = useState(0);
  const [select, setSelect] = useState("book");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [check, setCheck] = useState(false);
  const [activeFilter, setActiveFilter] = useState([]);

  //function make components rerenders based on result data
  useEffect(() => {
    if (result.length > 0) {
      const initialDisplay = result.slice(0, Math.min(result.length, 3));
      setDisplayedBooks(initialDisplay);
    }
  }, [result]);

  //handling search input value 
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  //handling select value /search by author or by book
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  //onKeyDown function takes search input value search it in books' title
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (select === "book") {
        const filteredBooks = result.filter((elem) =>
          elem.title
            .toLocaleLowerCase()
            .trim()
            .includes(value.toLocaleLowerCase().trim())
        );
        setDisplayedBooks(filteredBooks);
        setCheck(true);
      } else if (select === "author") {
        const filteredBooks = result.filter((elem) =>
          elem.authors.some((author) =>
            author.toLowerCase().includes(value.toLocaleLowerCase().trim())
          )
        );
        setDisplayedBooks(filteredBooks);
        setCheck(true);
      }
      setValue("");
      setActiveFilter([]);
    }
  };

  //onSearchClick function takes search input value search it in books' title
  const searchClick = (e) => {
    if (select === "book") {
      const filteredBooks = result.filter((elem) =>
        elem.title
          .toLocaleLowerCase()
          .trim()
          .includes(value.toLocaleLowerCase().trim())
      );
      setDisplayedBooks(filteredBooks);
      setCheck(true);
    } else if (select === "author") {
      const filteredBooks = result.filter((elem) =>
        elem.authors.some((author) =>
          author.toLowerCase().includes(value.toLocaleLowerCase().trim())
        )
      );
      setDisplayedBooks(filteredBooks);
      setCheck(true);
    }
    setValue("");
    setActiveFilter([]);
  };

  //function on every click on view more button adds 3 more books from books' data
  const handleClick = () => {
    if (start + 3 < result.length) {
      const newStart = start + 3;
      const newBooks = result.slice(newStart, newStart + 3);
      setStart(newStart);
      setDisplayedBooks([...displayedBooks, ...newBooks]);
    } else {
      setCheck(true);
    }
  };

  //based on filter value function resets active filter, displayedBooks
  const handleFilteredClick = (filter) => {
    if (activeFilter.includes(filter)) {
      setActiveFilter(activeFilter.filter((f) => f !== filter));
    } else {
      setActiveFilter([...activeFilter, filter]);
    }

    if (filter === "All-books") {
      setActiveFilter(["All-books"]);
      setDisplayedBooks(result);
      setStart(result.length);
      setCheck(true);
    } else if (filter === "Non-fiction") {
      let filtered = result.filter((item) =>
        item.category.includes("Non-fiction")
      );
      setDisplayedBooks(filtered);
      setStart(result.length);
      setCheck(true);
      setActiveFilter(["Non-fiction"]);
    } else if (filter === "Fiction") {
      let filtered = result.filter((item) => item.category.includes("Fiction"));
      setDisplayedBooks(filtered);
      setStart(result.length);
      setCheck(true);
      setActiveFilter(["Fiction"]);
    } else if (filter === "Biography") {
      let filtered = result.filter((item) =>
        item.category.includes("Biography")
      );
      setDisplayedBooks(filtered);
      setStart(result.length);
      setCheck(true);
      setActiveFilter(["Biography"]);
    } else if (filter === "History") {
      let filtered = result.filter((item) => item.category.includes("History"));
      setDisplayedBooks(filtered);
      setStart(result.length);
      setCheck(true);
      setActiveFilter(["History"]);
    }
  };

  const filterIsActive = (filter) => activeFilter.includes(filter);

  const reset = (e) => {
    setActiveFilter([]);
    setDisplayedBooks(result.slice(0, 3));
    setStart(0);
    setCheck(false);
  };

  //here we devide books db to arrays, each of them contain 3 books.
  let bookChunks = [];
  for (let i = 0; i < displayedBooks.length; i += 3) {
    bookChunks.push(displayedBooks.slice(i, i + 3));
  }

  return (
    <div className="libraryContainer">
      <div className="filterContainer">
        <select id="selectBy" onChange={handleSelect}>
          <option value="book">Select by book's name</option>
          <option value="author">Select by author's name</option>
        </select>
        <div className="searchInputContainer">
          <input
            placeholder="  Search books"
            className="searchInput"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
          />
          <div onClick={searchClick} className="iconInDibrary">
            <BsSearch />
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
              filterIsActive("Fiction")
                ? "filterBtnActive"
                : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("Fiction")}
          >
            Fiction
          </button>
          <button
            className={
              filterIsActive("Non-fiction")
                ? "filterBtnActive"
                : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("Non-fiction")}
          >
            Non-fiction
          </button>
          <button
            className={
              filterIsActive("Biography")
                ? "filterBtnActive"
                : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("Biography")}
          >
            Biography
          </button>
          <button
            className={
              filterIsActive("History")
                ? "filterBtnActive"
                : "filterBtnInactive"
            }
            onClick={() => handleFilteredClick("History")}
          >
            History
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
              <Link
                to={{
                  pathname: `/library/bookdetails/${book.isbn}`,
                  state: { book },
                }}
                target="_blank"
                className="aBooksLink"
              >
                <Book key={book.isbn} bookInfo={book} />
              </Link>
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
