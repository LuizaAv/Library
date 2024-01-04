import "./book.css";
import book from "../../images/book2.png";

export default function Book({key, bookInfo }) {
const id = key
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
