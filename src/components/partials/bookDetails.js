import Book from "./book"
import { useLocation } from "react-router-dom"
import data from "../../server/booksdb.json"

import "./bookdetails.css"

export default function Bookdetails (){
    const location = useLocation();
    const id = location.pathname.slice(21, location.pathname.length);
    const book = data.find((elem) => elem.isbn === id);

    return(
        <div className="bookDetailsContainer">
            <div className = "firstColoumnBookDetails">
              <Book bookInfo={book} />
            </div>
            <div className="secondColoumnBookDetails">
            </div>
        </div>
    )
}