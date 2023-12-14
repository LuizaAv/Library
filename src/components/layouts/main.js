

import "./main.css";
import libraryPicture from "../../images/library1.jpg"
import Book from "../partials/book";


const books = [
    {
        title: "C++",
        author: "Stroustrup"
    },
    {
        title: "Javascript",
        author: "Flanagan"
    },
    {
        title: "You don't know Javascript",
        author: "Kyle Simpson"
    },
    {
        title: "C++",
        author: "Stroustrup"
    },
    {
        title: "Javascript",
        author: "Flanagan"
    },
    {
        title: "You don't know Javascript",
        author: "Kyle Simpson"
    }
]

export default function Main(){
    return(
        <div className="mainComponentContainer">
            <img src = {libraryPicture} alt = "libraryPicture" className = "libraryPic"/>
            <div className="contentContainerOfMain">
                <h1>Our Library</h1>
                <h1>Collection of Books</h1>
                <div className="booksRange">
                    {
                        books.map((item) =>{
                            return(
                                <Book bookInfo = {item} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}