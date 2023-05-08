import "./Books.css";
import { useState } from "react";
import BooksFilter from "./filter/BooksFilter";
import Bookitem from "./BookItem";
import BooksFilterRead from "./filter/BooksFilterRead";

const Books = ({ books }) => {
  const [YearFilter, setyearFilter] = useState("all");
  //const [ReadedFilter, setReadedFilter] = useState("all");

  const onYearFilterChanged = (value) => {
    setyearFilter(value);
  };

  // const onReadFilterChanged = (value) => {
  //   setReadedFilter(value);
  // };

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

  // const booksMappeded = [
  //   ReadedFilter === "all"
  //     ? books.map((book) => (
  //         <Bookitem
  //           key={book.id}
  //           title={book.title}
  //           dateRead={book.dateRead}
  //           author={book.author}
  //           pageCount={book.pageCount}
  //           readingProgress={book.readingProgress}
  //           rating={book.rating}
  //         />
  //       ))
  //     : books
  //         .filter((books) => books.title === ReadedFilter)
  //         .map((book) => (
  //           <Bookitem
  //             key={book.id}
  //             title={book.title}
  //             dateRead={book.dateRead}
  //             author={book.author}
  //             pageCount={book.pageCount}
  //             readingProgress={book.readingProgress}
  //             rating={book.rating}
  //           />
  //         )),
  //   console.log(ReadedFilter),
  // ];

  return (
    <div>
      <BooksFilter onYearChanged={onYearFilterChanged} year={YearFilter} />
      {/* <BooksFilterRead
        onReadChanged={onReadFilterChanged}
        read={ReadedFilter}
      /> */}

      <div className="books-container">
        {booksMapped.length === 0
          ? (<p>No leiste los libros en el {YearFilter} </p>)()
            //<p> no hay libros leidos {ReadedFilter} </p>
          : //(<p> no hay libros leidos {ReadedFilter} </p>))
            booksMapped}
      </div>
    </div>
  );
};
export default Books;
