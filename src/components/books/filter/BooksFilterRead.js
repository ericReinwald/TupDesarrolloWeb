import React from "react";

const BooksFilterRead = ({ onReadChanged, read }) => {
  const selectValueHandlerRead = (event) => {
    onReadChanged(event.target.value);
  };

  return (
    <div>
      <div className="Books-filter">
        <div className="Books-filter__control">
          <label className="Books-filter label">
            {" "}
            Filtrado por libros leidos
          </label>
          <select onChange={selectValueHandlerRead} value={read}>
            <option value="read">Leidos</option>
            <option value="">No leidos</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BooksFilterRead;
