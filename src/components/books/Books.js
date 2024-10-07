import "./Books.css";
import { useState } from "react";
import BooksFilter from "./filter/BooksFilter";
import Bookitem from "./BookItem";
import BooksFilterRead from "./filter/BooksFilterRead";

const Books = ({ books }) => {
  const [YearFilter, setyearFilter] = useState("all");
  const [ReadedFilter, setReadedFilter] = useState("");

  const onYearFilterChanged = (value) => {
    setyearFilter(value);
  };

  const onReadFilterChanged = (value) => {
    setReadedFilter(value);
  };

  const booksMapped = [
    YearFilter === "all"
      ? books.map((book) => (
          <Bookitem
            key={book.id}
            title={book.title}
            dateRead={book.dateRead}
            author={book.author}
            pageCount={book.pageCount}
            readingProgress={book.readingProgress}
            rating={book.rating}
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
              readingProgress={book.readingProgress}
              rating={book.rating}
            />
          )),
  ];

  const booksMappeded = [
    ReadedFilter === "read"
      ? books
          .filter((books) => books.readingProgress === "100")
          .map((book) => (
            <Bookitem
              key={book.id}
              title={book.title}
              dateRead={book.dateRead}
              author={book.author}
              pageCount={book.pageCount}
              readingProgress={book.readingProgress}
              rating={book.rating}
            />
          ))
      : undefined,
  ];

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
      {/* {ReadedFilter === "all" && ( */}
      <div>
        <BooksFilterRead
          onReadChanged={onReadFilterChanged}
          read={ReadedFilter}
        />
      </div>
      <div>
        <div className="books-container">
          {booksMappeded.length === 0 ? (
            <p>No leiste los libros en el {ReadedFilter} </p>
          ) : (
            booksMappeded
          )}
        </div>
      </div>
    </div>
  );
};
export default Books;
