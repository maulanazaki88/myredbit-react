import React from "react";
import BookCard from "./BookCard";
import c from "./BookCollection.module.css";

function BookCollection(props) {
  return (
    <>
      <ul className={c.cltnWrp}>
        {props.appliedBooks
          .slice(0)
          .reverse()
          .map((book, index) => {
            if (book === "b") {
              return "b";
            } else {
              return (
                <li className={c.bookCard} key={index}>
                  <BookCard
                    _id={book.id}
                    img={book.img}
                    title={book.title}
                    appliedBooksLength={props.appliedBooksLength}
                    isFinished={book.isFinished}
                    isFavorite={book.isFavorite}
                    genres={book.genre.join(", ")}
                    date={book.realease}
                    author={book.author}
                    bookUpdated={(id, stat) => props.bookUpdated(id, stat)}
                    showPopUp={(title, id, type) =>
                      props.showPopUp(title, id, type)
                    }
                    editBook={(id, type) => props.editBook(id, type)}
                    editReqHandler={(id) => props.editReqHandler(id)}
                    requestNote={(id) => props.requestNote(id)}
                  />
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}

export default BookCollection;
