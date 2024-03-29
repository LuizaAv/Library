import { useState, useEffect } from "react";
import axios from "axios";
import "./adminPage.css";
import Popup from "./popup";

export default function AdminPage() {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [ISBN, setISBN] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [shelf, setShelf] = useState("");
  const [row, setRow] = useState("");
  const [publisher, setPublisher] = useState("");
  const [language, setLanguage] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [expiredUserId, setExpiredUserId] = useState([]);
  const [bookAdded, setBookAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [blackListMember, setBlackListMember] = useState(false);
  const [showExpired, setShowExpired] = useState("");

  //bellow functions handle inputs' value changes and set appropriate states
  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthor = (e) => {
    setAuthors(e.target.value);
  };

  const handleISBN = (e) => {
    setISBN(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleShelf = (e) => {
    setShelf(e.target.value);
  };

  const handleRow = (e) => {
    setRow(+e.target.value);
  };

  const handlePublisher = (e) => {
    setPublisher(e.target.value);
  };

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handlePage_Count = (e) => {
    setPageCount(+e.target.value);
  };

  //function handles delete button click, send isbn value to backend appropriate endpoint to find the book from db and delete it, recieves response and if the book successfully deleted, it set the deleted state as true
  const handleDeleteClick = async () => {
    if (isbn) {
      try {
        const response = await axios.post(
          "http://localhost:3001/books/delete",
          {
            isbn,
          }
        );

        if (response.status === 200) {
          setDeleted(true);
        }
      } catch (error) {
        console.error("Delete error:", error);
      }
    } else {
      console.log("isbn field must be completed");
    }
  };

  //send all book object properties to backend' appropriate endpoint to add the book in db, and if book successfully added, it set added state as true
  const handleAddClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/books/add", {
        title,
        authors,
        isbn: ISBN,
        published_year: year,
        category,
        availability: true,
        location: {
          shelf,
          row: +row,
        },
        additional_info: {
          publisher,
          language,
          page_count: +pageCount,
        },
      });

      if (response.status === 201) {
        setBookAdded(true);
      }

      setTitle("");
      setAuthors("");
      setISBN("");
      setYear("");
      setCategory("");
      setShelf("");
      setRow("");
      setPublisher("");
      setLanguage("");
      setPageCount("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  //onclick show black list button this function organize request to backend to find loans, who's loan's date were expired, after that it set blackListMember state with the objects who's date was expired
  const handleShowBlackList = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3001/loans/expiredLoans",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const currentDate = new Date();
      const expiredLoans = response.data.filter((loan) => {
        const returnDate = new Date(loan.return_date);
        return returnDate < currentDate;
      });

      const userIds = expiredLoans.map((item) => item.user);

      console.log(expiredLoans);
      if (userIds.length > 0) {
        setExpiredUserId((prevIds) => [...prevIds, ...userIds]);
      }

      setBlackListMember(true);
    } catch (error) {
      console.error("Error fetching blacklisted users:", error);
    }
  };

  //this function, based on expiredUserId state changes rerenders and send the array of expiredUser's to backend, also it send authorizing token, an recieves back the users' data, whos loan date was expired, and set appropriate state with this response
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:3001/users/expired",
          {
            expiredUserId: expiredUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setShowExpired(response.data);
      } catch (error) {
        console.log(
          "expired users fetch error: ",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [expiredUserId]);

  //After successfully adding book there will be a popup window, and close button. This function close the popup onclick
  const closeAddedPopup = () => {
    setBookAdded(false);
  };

  //After successfully deleting book there will be a popup window, and close button. This function close the popup onclick
  const closeDeletedPopup = () => {
    setDeleted(false);
    setIsbn("");
  };

  return (
    <div className="adminPageContainer">
      <div>
        <h3 className="adminPageH3">Add a book</h3>
        <form onSubmit={handleAddClick}>
          <br />
          <input
            type="text"
            placeholder="  enter the title"
            onChange={handleTitle}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the authors"
            onChange={handleAuthor}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the ISBN"
            onChange={handleISBN}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the published year"
            onChange={handleYear}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the category"
            onChange={handleCategory}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the shelf"
            onChange={handleShelf}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the row"
            onChange={handleRow}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the publisher"
            onChange={handlePublisher}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the language"
            onChange={handleLanguage}
            className="adminPageInput"
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="  enter the page_count"
            onChange={handlePage_Count}
            className="adminPageInput"
          />
          <br />
          <input type="submit" value="Create" className="adminPageSubmit" />
          {bookAdded && (
            <Popup popUp={closeAddedPopup} textMessage="Book was added!" />
          )}
        </form>
      </div>
      <div id="deleteBookContainer">
        <h3 className="adminPageH3">Delete a book</h3>
        <input
          placeholder="  enter the isbn code"
          onChange={handleChange}
          className="adminPageInput"
          value={isbn}
        />
        <br />
        <button onClick={handleDeleteClick}>Delete</button>
        {deleted && (
          <Popup popUp={closeDeletedPopup} textMessage="Book was deleted!" />
        )}
      </div>
      <div className="blackMainContainer">
        <h3>Black List</h3>
        <button onClick={handleShowBlackList}>Show the black list users</button>
        <div
          className={
            !blackListMember
              ? "blackListContainerHidden"
              : "blackListContainerVisible"
          }
        >
          {blackListMember && showExpired
            ? showExpired.map((item, index) => {
                return (
                  <div>
                    <p>
                      {++index} . {item.surname} {item.name} / {item.wave} /{" "}
                      {item.email}
                    </p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
