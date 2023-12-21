


import Book from "./book"
import "./bookDetails.css"

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
  

export default function BookDetails (){


    return(
        <div className="bookDetailsContainer">
            <Book bookInfo={books[0]}/>
        </div>
    )
}