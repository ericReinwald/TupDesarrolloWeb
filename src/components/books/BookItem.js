import { useState } from "react";

import BookCard from "../ui/BookCard";

import "./BookItem.css";
import ReadDate from "../books/ReadDate";
import Rating from "./new-book/Rating";

const Bookitem = ({
  author,
  title,
  dateRead,
  pageCount,
  readingProgress,
  pageCount2,
}) => {
  const [newTitle, setNewTitle] = useState(title);

  const [secTitle, setsecTitle] = useState(title);

  const clickHandler = () => {
    console.log("click");
    setNewTitle("Actualizado!");
  };

  const clickButton = () => {
    setsecTitle(" Leido ");
  };

  return (
    <BookCard className="book-item-container">
      <h2>{secTitle}</h2>
      <h3> {author} </h3>

      <ReadDate dateRead={dateRead} />

      <p> {pageCount} Paginas</p>
      <p>{pageCount2} Paginas2</p>
      <button onClick={clickHandler}>Clickeame </button>

      <div>
        <div className="button-bookItem">
          <button onClick={clickButton}> Quiero leerlo</button>
        </div>
      </div>
    </BookCard>
  );
};

export default Bookitem;
