import "./book.css";
import book from "../../images/book2.png";

//return the information about book, //the component which is called onclick of each book in library
export default function Book({ bookInfo }) {
  if (!bookInfo) {
    return null;
  }
  return (
    <div className="bookContainer">
      <img src={book} className="book" alt="a book" />
      <div className="overlay">
        <span>{bookInfo.title}</span>
      </div>
      <div className="description">
        <span>{bookInfo.title}</span>
        <br />
        <span>{bookInfo.authors}</span>
      </div>
    </div>
  );
}
