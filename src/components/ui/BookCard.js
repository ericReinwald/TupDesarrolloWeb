import "./BookCard.css";

const BookCard = ({ children }) => {
  console.log(children);
  return <div className="book-item-container">{children}</div>;
};
export default BookCard;
