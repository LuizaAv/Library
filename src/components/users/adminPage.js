import { useState } from "react";
import axios from "axios";
import "./adminPage.css";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

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
  const [added, setAdded] = useState(false)

  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthor = (e) => {
    setAuthors(e.target.value)
  }

  const handleISBN = (e) => {
    setISBN(e.target.value)
  }

  const handleYear = (e) => {
    setYear(e.target.value)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleShelf = (e) => {
    setShelf(e.target.value)
  }

  const handleRow = (e) => {
    setRow(+e.target.value)
  }
  
  const handlePublisher = (e) => {
    setPublisher(e.target.value)
  }

  const handleLanguage = (e) => {
    setLanguage(e.target.value)
  }

  const handlePage_Count = (e) => {
    setPageCount(+e.target.value)
  }

  const handleDeleteClick = async () => {
    if(isbn){
        try {
            const response = await axios.post("http://localhost:3001/books/delete", {
              isbn
            });
      
            console.log(response);
          } catch (error) {
            console.error("Delete error:", error);
          }
    }else{
        console.log("isbn field must be completed")
    }
  };

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
          row: +row
        },
        additional_info: {
          publisher,
          language,
          page_count: +pageCount
        }
      });
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  return (
    <div className="adminPageContainer">
      <div>
        <h3>Delete a book</h3>
        <input placeholder="enter the isbn code" onChange={handleChange} /><br/>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      <div>
        <h3>Add a book</h3>
        <form onSubmit={handleAddClick}>
            <label >Title</label><br/>
            <input type="text" onChange={handleTitle}/><br/>
            <label >Authors</label><br/>
            <input type="text" onChange={handleAuthor}/><br/>
            <label >ISBN</label><br/>
            <input type="text" onChange={handleISBN} /><br/>
            <label >Published_year</label><br/>
            <input type="text" onChange={handleYear}/><br/>
            <label >Category</label><br/>
            <input type="text" onChange={handleCategory}/><br/>
            <label >Shelf</label><br/>
            <input type="text" onChange={handleShelf}/><br/>
            <label >Row</label><br/>
            <input type="text" onChange={handleRow}/><br/>
            <label >Publisher</label><br/>
            <input type="text" onChange={handlePublisher}/><br/>
            <label >Language</label><br/>
            <input type="text" onChange={handleLanguage}/><br/>
            <label >Page_count</label><br/>
            <input type="text" onChange={handlePage_Count}/><br/>
            <input type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
}
