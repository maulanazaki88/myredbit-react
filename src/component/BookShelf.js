import React from "react";
import c from "./BookShelf.module.css";

function BookShelf(props) {
  return (
    <div className={c.bookShelf}>
      <h2 id={c["title"]} className={c.title}>
        {props.title}
      </h2>
      <button
        id={c["openBtn"]}
        className={c.openBtn}
        onClick={props.jumpToPage}
      >
        {props.button}
      </button>
      <figure className={c.iconFg}>
        <img
          className={c.icon}
          src={
            props.status ? "/pngs/finished-pink.png" : "/pngs/continue-pink.png"
          }
          title="On-read"
          alt="cover"
        />
      </figure>
      <div className={c.shelf}>
        <div className={c.up}>
          <div id={c["b1"]} className={c.book}>
            <img
              className={c.bookCvr}
              src={props.book1}
              alt="book1"
              title="cover"
            />
          </div>
          <div id={c["b2"]} className={c.book}>
            <img
              className={c.bookCvr}
              src={props.book2}
              alt="book2"
              title="cover"
            />
          </div>
        </div>
        <div id={c["b3"]} className={c.down}>
          <div className={c.book}>
            <img
              className={c.bookCvr}
              src={props.book3}
              alt="book3"
              title="cover"
            />
          </div>
          <div id={c["b4"]} className={c.book}>
            <img
              className={c.bookCvr}
              src={props.book4}
              alt="book4"
              title="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookShelf;
