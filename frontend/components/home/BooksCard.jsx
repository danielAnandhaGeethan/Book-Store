import React from "react";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid grid-cols-5">
      {books.map((book) => (
        <BookSingleCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksCard;
