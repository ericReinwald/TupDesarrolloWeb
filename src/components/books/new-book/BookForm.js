import { useState } from "react";

import "./BookForm.css";
import Rating from "./Rating";

const categories = [
  { id: 1, name: "Ficcion" },
  { id: 2, name: "No ficcion" },
];

const subcategories = [
  { id: 1, name: "Novela", categoryId: 1 },
  { id: 2, name: "Cuento", categoryId: 1 },
  { id: 3, name: "Poesía", categoryId: 1 },
  { id: 4, name: "Biografía", categoryId: 2 },
  { id: 5, name: "Ensayo", categoryId: 2 },
  { id: 6, name: "Historia", categoryId: 2 },
];

const BookForm = ({ onBookDataSaved }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPagecount] = useState("");
  const [pageCount2, setPageCount2] = useState("");

  const [readDate, setReadDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [readStatus, setReadStatus] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [rating, setRating] = useState(0);

  const [category, setCategory] = useState(0);
  const [subcategory, setSubCategory] = useState(0);
  const [subCategoriesFiltered, setSubCategoriesFiltered] = useState([]);
  const [errors, setErrors] = useState({
    title: false,
    author: false,
    pageCount: false,
    date: false,
  });

  const changeTitleHandler = (event) => {
    if (event.target.value !== "") {
      setErrors({ ...errors, title: false });
    }
    setTitle(event.target.value);
  };
  const changeAuthorHandler = (event) => {
    if (event.target.value !== "") {
      setErrors({ ...errors, author: false });
    }
    setAuthor(event.target.value);
  };
  const changePageCountHandler = (event) => {
    setPagecount(event.target.value);
  };

  const changePageCount2Handler = (event) => {
    setPageCount2(event.target.value);
  };

  const changeReadDateHandler = (event) => {
    setReadDate(event.target.value);
  };
  const changeStatusHandler = (event) => {
    setReadStatus(event.target.value);
  };

  const saveReadingProgress = (event) => {
    setReadingProgress(event.target.value);
  };

  const changeRatingHandler = (value) => {
    setRating(value);
  };

  const changeCategoryhandler = (event) => {
    if (event.target.value) {
      setSubCategoriesFiltered(
        subcategories.filter((s) => s.categoryId == event.target.value)
      );
    }
    setCategory(event.target.value);
  };

  const changeSubCategoryhandler = (event) => {
    setSubCategory(event.target.value);
  };

  const changeShowForm = () => {
    setShowForm(true);
  };

  const changeShowFormCancel = () => {
    setShowForm(false);
    setErrors({
      title: false,
      author: false,
      pageCount: false,
      date: false,
    });
  };

  const submitHandler = () => {
    const bookData = {
      title,
      author,
      pageCount,
      pageCount2,

      dateRead: new Date(readDate),
    };
    console.log(bookData);
    onBookDataSaved(bookData);

    setTitle("");
    setAuthor("");
    setPagecount("");
    setPageCount2("");
    setReadDate("");
  };

  const handleBlurTitle = (e) => {
    if (e.target.value === "") {
      setErrors({ ...errors, title: true });
    }
  };

  const handBlurAuthor = (e) => {
    if (e.target.value === "" && e.target.value < 3) {
      setErrors({ ...errors, author: true });
    }
  };

  return (
    <div>
      {!showForm && <button onClick={changeShowForm}>Agregar lectura</button>}
      {showForm && (
        <div>
          <div>
            <div className="new-book-controls">
              <div className="new-book-controls">
                <label>Titulo</label>

                <input
                  onBlur={handleBlurTitle}
                  value={title}
                  onChange={changeTitleHandler}
                  type="text"
                />
                {errors.title && (
                  <p style={{ color: "red" }}>Campo titulo es obligatorio</p>
                )}
              </div>

              <div className="new-book-control ">
                <label> Autor</label>
                <input
                  onBlur={handBlurAuthor}
                  value={author}
                  onChange={changeAuthorHandler}
                  type="text"
                />
                {errors.author && (
                  <p style={{ color: "red" }}>Campo Autor es obligatorio </p>
                )}
              </div>
              <div className="new-book-control">
                <label> Paginas</label>
                <input
                  value={pageCount}
                  onChange={changePageCountHandler}
                  type="number"
                  min="1"
                  step="1"
                />
              </div>
              <div className="new-book-control">
                <label> Paginas2</label>
                <input
                  value={pageCount2}
                  onChange={changePageCount2Handler}
                  type="number"
                  min="1"
                  step="1"
                />
              </div>
              <div className="new-book-control">
                <label> Categorias </label>
                <select value={category} onChange={changeCategoryhandler}>
                  <option value={""}>--Seleccione una Opcion-- </option>
                  {categories.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="new-book-control">
                <label> Subcategorias </label>
                <select value={subcategory} onChange={changeSubCategoryhandler}>
                  <option value={" "}>--Seleccione una Opcion-- </option>
                  {subCategoriesFiltered.map((item, index) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className="new-book-control">
                <label> Cuando terminaste de leerlo?</label>
                <input
                  value={readDate}
                  onChange={changeReadDateHandler}
                  type="date"
                  min="2019-01-01"
                  max="2022-12-01"
                />
              </div>
            </div>

            <div className="new-book-inline-control">
              <label>
                <input
                  type="radio"
                  value="want_to_read"
                  name="book_status"
                  onChange={changeStatusHandler}
                />{" "}
                <span>Quiero leerlo</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="reading"
                  name="book_status"
                  onChange={changeStatusHandler}
                />
                <span>Lo estoy leyendo</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="read_it"
                  name="book_status"
                  onChange={changeStatusHandler}
                />
                <span>Terminé de leerlo</span>
              </label>
            </div>

            {readStatus === "reading" && (
              <div>
                <label htmlFor="reading_progress">Progreso de lectura:</label>
                <input
                  type="range"
                  id="reading_progress"
                  min="0"
                  max="100"
                  step="10"
                  value={readingProgress}
                  onChange={saveReadingProgress}
                />
                <span>{readingProgress}%</span>
              </div>
            )}
            {readStatus === "read_it" && (
              <Rating
                value={rating}
                onChange={changeRatingHandler}
                className={"book-form-rating"}
              />
            )}

            <div className="new-book-action">
              <button onClick={submitHandler}> Guardar lectura </button>
            </div>
            <div className="button-cancel">
              <button onClick={changeShowFormCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BookForm;
