import React, { useState } from "react";

const Rating = ({ value, onChange, className }) => {
  const [rating, setRating] = useState(value || 0);
  return (
    <div className={"defaultClassname " + className}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <button
          key={item}
          onClick={() => {
            setRating(item);
            if (onChange) onChange(item);
          }}
        >
          {item}
        </button>
      ))}
      <div> Estrellas : {rating}</div>
    </div>
  );
};

export default Rating;
