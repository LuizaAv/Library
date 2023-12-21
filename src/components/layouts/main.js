import "./main.css";
import libraryPicture from "../../images/library1.jpg";
import pictureBook from "../../images/book2.png";
import Book from "../partials/book";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import data from "../../server/booksdb.json";


export default function Main() {
  const displayedBooks = data.slice(0, 3);

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 5 },
  };

  const items = data.slice(data.length - 10, data.length)
 
  const show = items.map((item) => (
    <div className="item" data-value="1">
      <Link 
        to={{
            pathname: `/library/bookdetails/${item.isbn}`,
            state: {item}
        }} 
        target="_blank" 
        className="aBooksLink">
        <img src={pictureBook} className="sliderPic" />
        <div>
        <span>{item.title }</span><br/>
        <span>{item.author }</span>
        </div>
      </Link>
    </div>
  ))

  const bookChunks = [];
  for (let i = 0; i < displayedBooks.length; i += 3) {
    bookChunks.push(displayedBooks.slice(i, i + 3));
  }

  return (
    <div className="mainComponentContainer">
      <img src={libraryPicture} alt="libraryPicture" className="libraryPic" />
      <div className="contentContainerOfMain">
        <h1>Our Library</h1>
        <h1>Collection of Books</h1>
        <div className="booksRange">
          {bookChunks.map((chunk, index) => (
            <div key={index} className="aRange">
              {chunk.map((book, idx) => (
                <Link 
                to={{
                    pathname: `/library/bookdetails/${book.isbn}`,
                    state: {book}
                }} 
                target="_blank" 
                className="aBooksLink">
                <Book key={book.isbn} bookInfo={book} />
              </Link>
              ))}
            </div>
          ))}
        </div>
        <Link to="./library">
          <button className="viewMoreBtn">View all</button>
        </Link>
        <div className="recentAdditionContainer">
          <h1 className="recentAddH1">Recent Additions</h1>
          <AliceCarousel
            mouseTracking
            items={show}
            responsive={responsive}
            controlsStrategy="alternate"
            className =  "slide"
          />
        </div>
      </div>
    </div>
  );
}
