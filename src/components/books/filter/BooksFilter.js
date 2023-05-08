import "./BooksFilter.css";

const booksFilter = ({ onYearChanged, year, onReadChanged, read }) => {
  const selectValueHandler = (event) => {
    onYearChanged(event.target.value);
  };

  const selectValueHandlerRead = (event) => {
    onReadChanged(event.target.value);
  };

  return (
    <div className="Books-filter">
      <div className="Books-filter__control">
        <label className="Books-filter label"> Filtrado por Años</label>
        <select onChange={selectValueHandler} value={year}>
          <option value="all">Todos</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
      <div className="Books-filter__control">
        <label className="Books-filter label">
          {" "}
          Filtrado por libros leidos
        </label>
        <select onChange={selectValueHandlerRead} value={read}>
          <option value="all">Leidos</option>
          <option value="leido!">No leidos</option>
        </select>
      </div>
    </div>
  );
};

export default booksFilter;
