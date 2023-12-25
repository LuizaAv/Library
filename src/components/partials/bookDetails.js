import Book from "./book";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./bookdetails.css";
import { useState } from "react";

export default function Bookdetails({data}) {
  const res = data
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const id = location.pathname.slice(21, location.pathname.length);
  const book = res ? res.find((elem) => elem.isbn === id) : null;

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDc6T6ZoFDZRswbFXfYw8KEOi57VN_w_6w"
  );
  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Please give me short (3-4 lines)  description about the book ${book.title}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setText(text);
    setCheck(true);
  };

  // const responsive = {
  //   0: { items: 1 },
  //   568: { items: 3 },
  //   1024: { items: 5 },
  // };

  // const items = data.filter(
  //   (elem) =>
  //     elem.title.toLocaleLowerCase().trim().includes(book.title.slice(0, 10).toLocaleLowerCase().trim())
  // );
  // console.log(items)

  return (
    <div >
      {!book ? <div>...Loading</div> :
      <div className="bookDetailsContainer">
        <div className="firstColoumnBookDetails">
          <Book bookInfo={book} />
        </div>
        <div className="secondColoumnBookDetails">
          <h1>{book.title}</h1>
          <h4>
            <span>Author:</span> {book.authors}
          </h4>
          <h4>
            <span>Genre:</span> {book.category.map((elem) => `${elem}, `)}
          </h4>
          <h4>
            <span>Synopsis:</span>
            {!check ? (
              <button onClick={fetchData} className="bookDetailsBtn">Generate description</button>
            ) : (
              <div className="generatedDescription">{`  ${text}`}</div>
            )}
          </h4>
          <div className="borrowReserveContainer">
            <button className="bookDetailsBtn">Borrow</button>
            <button className="bookDetailsBtn">Reserve</button>
          </div>
        </div>
      </div>
    }
    </div>
  );
}
