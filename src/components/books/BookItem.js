import { useState } from "react";

import BookCard from "../ui/BookCard";

import "./BookItem.css";
import ReadDate from "../books/ReadDate";

const Bookitem = ({
  author,
  title,
  dateRead,
  pageCount,
  readingProgress,
  rating,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newPageCount, setNewPageCount] = useState(pageCount);
  const [updateReadingProgress, setUpdateReadingProgress] =
    useState(readingProgress);

  const clickHandler = () => {
    console.log("click");
    setNewTitle("Leido!");
    setUpdateReadingProgress("100");
    setNewPageCount("50");
  };

  const clickHandlerNull = () => {
    setUpdateReadingProgress("0");
    setNewTitle("");

    setNewPageCount("0");
  };
  const saveReadingProgress = (event) => {
    setUpdateReadingProgress(event.target.value);
  };

  return (
    <BookCard className="book-item-container">
      <h2>{title}</h2>
      {<h2>{newTitle}</h2>}

      <h3> Autor: {author} </h3>
      <ReadDate dateRead={dateRead} />
      <p> {newPageCount} Paginas</p>

      <div>
        <button onClick={clickHandler}>Marcar como Leido</button>
        <button onClick={clickHandlerNull}>resetear paginas </button>
      </div>

      <div>
        {readingProgress ? (
          <div>
            <p> El progreso de lectura es : {readingProgress + "%"}</p>
          </div>
        ) : (
          <div>
            {" "}
            <label htmlFor="reading_progress">Progreso de lectura:</label>
            <input
              type="range"
              id="reading_progress"
              min="0"
              max="100"
              step="1"
              value={updateReadingProgress}
              onChange={saveReadingProgress}
            />
            <span>{updateReadingProgress}%</span>
          </div>
        )}

        {rating ? (
          <div>
            <p> las estrellas son: {rating}</p>
          </div>
        ) : undefined}
      </div>
    </BookCard>
  );
};

export default Bookitem;
