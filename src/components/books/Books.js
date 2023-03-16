import "./Books.css";
import { useState } from "react";
import BooksFilter from "./filter/BooksFilter";
import Bookitem from "./BookItem";

const Books = ({ books }) => {
  const [YearFilter, setyearFilter] = useState("all");

  const onYearFilterChanged = (value) => {
    setyearFilter(value);
  };

  const booksMapped =
    YearFilter === "all"
      ? books.map((book) => (
          <Bookitem
            key={book.id}
            title={book.title}
            dateRead={book.dateRead}
            author={book.author}
            pageCount={book.pageCount}
            pageCount2={book.pageCount2}
          />
        ))
      : books
          .filter(
            (books) => books.dateRead.getFullYear().toString() === YearFilter
          )
          .map((book) => (
            <Bookitem
              key={book.id}
              title={book.title}
              dateRead={book.dateRead}
              author={book.author}
              pageCount={book.pageCount}
              pageCount2={book.pageCount2}
            />
          ));

  return (
    <div>
      <BooksFilter onYearChanged={onYearFilterChanged} year={YearFilter} />
      <div className="books-container">
        {booksMapped.length === 0 ? (
          <p>No leiste los libros en el {YearFilter} </p>
        ) : (
          booksMapped
        )}
      </div>
    </div>
  );
};
export default Books;
