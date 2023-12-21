import "./book.css";
import book from "../../images/book2.png";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Book({key, bookInfo }) {
const id = key
console.log(id)
  return (
      <div className="bookContainer">
        <img src={book} className="book" alt="a book" />
        <div className="overlay">
          <span>{bookInfo.title}</span>
        </div>
        <div className="description">
          <span>{bookInfo.title}</span>
          <br />
          <span>{bookInfo.author}</span>
        </div>
      </div>
  );
}
