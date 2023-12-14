


import "./book.css";
import book from "../../images/book2.png"



export default function Book({bookInfo}){
    return(
        <div className="bookContainer">
            <img src = {book} className="book" alt = "a book"/>
            <div className="description">
                <span>{bookInfo.title}</span>
                <span>{bookInfo.author}</span>
            </div>
        </div>
    )
}