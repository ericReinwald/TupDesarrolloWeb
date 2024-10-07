import { useEffect, useRef, useState } from "react";

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
let previousValue = false;

const BookForm = ({ onBookDataSaved }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [readDate, setReadDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [readStatus, setReadStatus] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [comentar, setComentar] = useState("");

  const [category, setCategory] = useState(0);
  const [subcategory, setSubCategory] = useState(0);
  const [subCategoriesFiltered, setSubCategoriesFiltered] = useState([]);
  const [errors, setErrors] = useState({
    title: false,
    author: false,
    pageCount: false,
    date: false,
  });
  const [bookSugestions, setBookSugestions] = useState(null);
  const [bookSelected, setBookSelected] = useState(false);

  const reviewRef = useRef(null);
  const porcentRef = useRef(null);

  useEffect(() => {
    if (readStatus === "read_it") {
      reviewRef.current.focus();
    }
  }, [readStatus]);

  useEffect(() => {
    if (readStatus === "want_to_read") {
      porcentRef.current.focus();
    }
  }, [readStatus]);

  useEffect(() => {
    if (title || author || readDate) {
      setErrors(validate(generateBookObject()));
    }
  }, [title, author, readDate]);

  useEffect(() => {
    if (title && title.length > 3) {
      console.log("title change", previousValue, title);
      const bookFetch = () => {
        let apiTitle = title;
        apiTitle = apiTitle.replace(/\s+/gi, "+"); //esto se hace para convertir los espacios en blanco en +
        console.log("valor", apiTitle);

        fetch("http://openlibrary.org/search.json?q=" + apiTitle)
          .then((response) => response.json())
          .then((data) => {
            console.log("book data", data);
            setBookSugestions(data.docs);
          })
          .catch((err) => {
            // reject
            // errores then functionasd
          });
      };
      previousValue = title;

      setTimeout(() => {
        if (previousValue === title && !bookSelected) {
          bookFetch();
        } else {
          // el valor está cambiando
        }
      }, 1000);
    }
  }, [title, bookSelected]);

  const changeTitleHandlerr = (event) => {
    if (event.target.value !== "") {
      setErrors({ ...errors, title: false });
    }
    setTitle(event.target.value);
  };

  // const changeTitleHandler = (event) => {
  //   if (event.target.value !== "") {
  //     setErrors({ ...errors, title: false });
  //   }
  //   setTitle(event.target.value);
  // };
  const changeAuthorHandler = (event) => {
    // if (event.target.value !== "") {
    //   setErrors({ ...errors, author: false });
    // }
    setAuthor(event.target.value);
  };
  const changePageCountHandler = (event) => {
    if (event.target.value.length >= 3) {
      setErrors({ ...errors, pageCount: false });
    }
    setPageCount(event.target.value);
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
  const changeReviewHandler = (event) => {
    setReview(event.target.value);
    setReadingProgress(100);
  };

  const changeComentarHandler = (event) => {
    setComentar(event.target.value);
  };

  const validationRequirements = {
    title: { required: true, minLength: 3 },
    author: { required: true },
    readDate: { required: true, isDate: true },
  };

  const validate = (bookObject) => {
    let errors = {};
    if (bookObject) {
      Object.keys(validationRequirements).forEach((key) => {
        if (validationRequirements[key].required && !bookObject[key]) {
          errors[key] = "El campo es obligatorio.";
        } else if (
          validationRequirements[key].minLength > 0 &&
          bookObject[key].length < validationRequirements[key].minLength
        ) {
          errors[key] =
            "El campo debe terner al menos " +
            validationRequirements[key].minLength +
            " caracteres.";
        }
      });
    }
    return errors;
  };

  const changeShowFormCancel = () => {
    setShowForm(false);
    setErrors({
      title: false,
      author: false,
      pageCount: false,
      date: false,
      readingProgress: false,
      rating: false,
    });
  };
  const generateBookObject = () => {
    const bookData = {
      title,
      author,
      pageCount,
      dateRead: new Date(readDate),
      readStatus,
      readingProgress,
      review,
      rating,
      comentar,
    };
    return bookData;
  };

  const submitHandler = () => {
    const bookData = generateBookObject();
    const errors = validate(bookData);
    onBookDataSaved(bookData);
    setTitle("");
    setAuthor("");
    setPageCount("");
    setReadDate("");
    setReadingProgress(0);
    setReview("");
    setComentar("");
    setRating(0);
    // errors = { author: 'El campo debe estar completo' }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setTitle("");
    setAuthor("");
    setPageCount("");
    setReadDate("");
    setReadingProgress(0);
    setReview("");
    setRating(0);
    setComentar("");
  };

  // const handleBlurTitle = (e) => {
  //   if (e.target.value === "") {
  //     setErrors({ ...errors, title: true });
  //   }
  // };

  const handBlurAuthor = (e) => {
    if (e.target.value === "") {
      setErrors({ ...errors, author: true });
    }
  };

  // const handBlurPage = (e) => {
  //   if (e.target.value <= 3) {
  //     setErrors({ ...errors, pageCount: true });
  //   }
  // };

  return (
    <div>
      {!showForm && <button onClick={changeShowForm}>Agregar lectura</button>}
      {showForm && (
        <div>
          <div>
            <div className="new-book-controls">
              <div className="new-book-control ">
                <label>Titulo</label>
                <input
                  list="book-suggestion"
                  onBlur={(event) => setErrors(validate(generateBookObject()))}
                  value={title}
                  onChange={changeTitleHandlerr}
                  type="text"
                />
                {errors?.title && <div className="red">{errors.title}</div>}
                {!bookSelected && bookSugestions?.length > 0 && (
                  <datalist id="book-suggestion">
                    {bookSugestions.map((item, index) => (
                      <option
                        key={index}
                        onClick={() => {
                          setTitle(item.title);
                          setBookSelected(true);
                        }}
                        value={item.title}
                      >
                        {item.title}
                      </option>
                    ))}
                  </datalist>
                )}
              </div>

              <div className="new-book-control ">
                <label> Autor</label>
                <input
                  value={author}
                  onChange={changeAuthorHandler}
                  type="text"
                  onBlur={(event) => {
                    setErrors(validate(generateBookObject()));
                  }}
                />

                {errors?.author && <div className="red">{errors.author}</div>}
              </div>
              <div className="new-book-control">
                <label> Paginas</label>
                <input
                  //onBlur={handBlurPage}
                  value={pageCount}
                  onChange={changePageCountHandler}
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
                  max="2029-12-01"
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

            {readStatus === "want_to_read" && (
              <div className="new-book-control">
                <label htmlFor="comentar"> Comentario </label>
                <textarea
                  id="comentar"
                  value={comentar}
                  ref={porcentRef}
                  onChange={changeComentarHandler}
                ></textarea>
              </div>
            )}
            {readStatus === "reading" && (
              <div>
                <label htmlFor="reading_progress">Progreso de lectura:</label>
                <input
                  type="range"
                  id="reading_progress"
                  min="0"
                  max="100"
                  step="1"
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
            {readStatus === "read_it" && (
              <div className="new-book-control">
                <label htmlFor="review">Critica del libro </label>
                <textarea
                  id="review"
                  value={review}
                  ref={reviewRef}
                  onChange={changeReviewHandler}
                ></textarea>
              </div>
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
