import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookShelf from "../component/BookShelf";
import CtxManager from "../store/CtxManager";

import c from "./BookPage.module.css";

const collections = JSON.parse(localStorage.getItem("collections"));

const unfinishedBooks_ = collections
  ? collections.books
      .filter((book) => book.isFinished === false)
      .slice()
      .reverse()
  : [];
const finishedBooks_ = collections
  ? collections.books
      .filter((book) => book.isFinished === true)
      .slice()
      .reverse()
  : [];

function BookPage() {
  const navigate = useNavigate();

  const ctx = useContext(CtxManager);

  const currPg = ctx.currentPg;
  const currPgHandler = ctx.currentPgHandler;
  const prevPgHandler = ctx.previousPgHandler;

  const [unfinishedBooks, setUnfinishedBooks] = useState(unfinishedBooks_);
  const [finishedBooks, setFinishedBooks] = useState(finishedBooks_);

  const ufBookCvrs = {
    ufCvr1: unfinishedBooks[0]
      ? unfinishedBooks[0].img
      : "/svg/SVG/dash-grey.svg",
    ufCvr2: unfinishedBooks[1]
      ? unfinishedBooks[1].img
      : "/svg/SVG/dash-grey.svg",
    ufCvr3: unfinishedBooks[2]
      ? unfinishedBooks[2].img
      : "/svg/SVG/dash-grey.svg",
  };

  const fBookCvrs = {
    fCvr1: finishedBooks[0] ? finishedBooks[0].img : "/svg/SVG/dash-grey.svg",
    fCvr2: finishedBooks[1] ? finishedBooks[1].img : "/svg/SVG/dash-grey.svg",
    fCvr3: finishedBooks[2] ? finishedBooks[2].img : "/svg/SVG/dash-grey.svg",
    fCvr4: finishedBooks[3] ? finishedBooks[3].img : "/svg/SVG/dash-grey.svg",
  };

  const { ufCvr1, ufCvr2, ufCvr3 } = ufBookCvrs;
  const { fCvr1, fCvr2, fCvr3, fCvr4 } = fBookCvrs;

  const jumpToPage = (pg) => {
    if (pg === "uf") {
      if (unfinishedBooks[0]) {
        navigate("/unfinishedPage");
        currPgHandler("/unfinishedPage");
        prevPgHandler(currPg);
      } else {
        navigate("/registerPage");
      }
    } else if (pg === "f") {
      navigate("/finishedPage");
      currPgHandler("/finishedPage");
      prevPgHandler(currPg);
    }
  };

  useEffect(() => {
    const collections = JSON.parse(localStorage.getItem("collections"));

    const unfinishedBooks_ = collections
      ? collections.books
          .filter((book) => book.isFinished === false)
          .slice()
          .reverse()
      : [];
    const finishedBooks_ = collections
      ? collections.books
          .filter((book) => book.isFinished === true)
          .slice()
          .reverse()
      : [];

    setUnfinishedBooks(unfinishedBooks_);
    setFinishedBooks(finishedBooks_);
  }, []);

  return (
    <>
      <div className={c.spacer} ></div>
      <div className={c.bookWrp}>
        <div className={c.bookShelf}>
          <BookShelf
            title="Unfinished Books Collection"
            status={false}
            button={unfinishedBooks[0] ? "Continue Reading" : "Register Book"}
            book1={ufCvr1}
            book2={"/svg/SVG/blank-book.svg"}
            book3={ufCvr3}
            book4={ufCvr2}
            jumpToPage={() => jumpToPage("uf")}
          />
          <figure className={c.mdLine}>
            <img
              className={c.midLine}
              src="/svg/SVG/line-grey.svg"
              alt="line"
            />
          </figure>
          <BookShelf
            title="Finished Books Collection"
            status={true}
            button={finishedBooks[0] ? "Refresh Memories" : "Open Collection"}
            book1={fCvr1}
            book2={fCvr4}
            book3={fCvr3}
            book4={fCvr2}
            jumpToPage={() => jumpToPage("f")}
          />
        </div>
      </div>
    </>
  );
}

export default BookPage;
