import { useState } from "react";
import "./App.css";
import Books from "./components/books/Books.js";

import NewBook from "./components/books/new-book/NewBook";

const Test_BOOKS = [
  {
    id: 1,
    title: "100 Años de soledad",
    author: "Garcia marquez",
    dateRead: new Date(2021, 6, 12),
    pageCount: 410,
  },

  {
    id: 2,
    title: "Juego de tronos  ",
    author: " Raymond Richard",
    dateRead: new Date(2021, 8, 12),
    pageCount: 500,
  },
  {
    id: 3,
    title: "Nie nie nie  ",
    author: " Marina Rols",
    dateRead: new Date(2020, 1, 12),
    pageCount: 500,
  },
  {
    id: 4,
    title: "Libreria   ",
    author: " Raymond Richard",
    dateRead: new Date(2019, 3, 5),
    pageCount: 5,
  },
];

const App = () => {
  const [books, setBooks] = useState(Test_BOOKS);

  const bookAddedHandler = (bookData) => {
    const newBookArray = [bookData, ...books];
    setBooks(newBookArray);
  };

  return (
    <div>
      <h2 className="App-Titulo"> Books Champion App </h2>
      <p> Agregar un libro </p>
      <NewBook onBookAdded={bookAddedHandler} />
      <Books books={books} />
    </div>
  );
};

export default App;
