import React, { useContext, useState, useLayoutEffect } from "react";
import CtxManager from "../store/CtxManager";
import { useNavigate } from "react-router-dom";

import { ParallaxBanner } from "react-scroll-parallax";

import c from "./LastReadPage.module.css";

function LastReadPage() {
  const navigate = useNavigate();

  const ctx = useContext(CtxManager);
  const allBooks = ctx.allBooks;

  const lrtArr = allBooks.map((book) => {
    let lastReadTime = book.lastReadTime;
    if (lastReadTime) {
      return book.lastReadTime;
    } else {
      return 0;
    }
  });

  const actLrt = Math.max(...lrtArr);
  const lastReadBook = allBooks.find((book) => book.lastReadTime === actLrt);
  const note = lastReadBook
    ? lastReadBook.notes.find((note) => note.page === lastReadBook.lastRead)
    : { event: "Currently you have not taken any notes." };
  const preNotes = note.event.split(" ");
  const prop = {
    img: lastReadBook ? lastReadBook.img : "/svg/SVG/dash-outline.svg",
    title: lastReadBook ? lastReadBook.title : "Start reading book!",
    lastPage: lastReadBook
      ?"Page " + lastReadBook.lastRead
      : "Your recent reading will appear here",
    lastNote: () => {
      const array = preNotes.slice(0).reverse();
      let result = new Array(12).fill(null);
      for (let n = 0; n < 12; n++) {
        if (array[n] !== "") {
          result[n] = array[n];
        } else {
          result[n] = "";
        }
      }
      return result;
    },
  };
  const noteRequestHandler = ctx.noteRequestHandler;
  const reqId = lastReadBook && lastReadBook.id;

  const [bookProp, setBookProp] = useState(prop);

  const { img, title, lastPage, lastNote } = bookProp;

  const lrBtnHandler = () => {
    if (lastReadBook) {
      noteRequestHandler(reqId);
    } else if (!lastReadBook && !allBooks[0]) {
      navigate("/registerPage");
    } else {
      navigate("/allPage");
    }
  };

  const books = {
    startScroll: 0,
    endScroll: 2200,
    translateY: [0, 48],
    opacity: [1, 0.6],
    scale: [1, 0.9, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    shouldDisableScalingTranslations: true,
    expanded: false,
    children: (
      <figure className={c.booksFig}>
        <img
          className={c.booksIlus}
          alt="books ilustration"
          title=""
          src="/svg/SVG/books1.svg"
        />
      </figure>
    ),
  };

  const headphone = {
    startScroll: 0,
    endScroll: 2200,
    translateY: [25, 42],
    scale: [0.9, 0.95, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    shouldDisableScalingTranslations: true,
    expanded: false,
    children: (
      <figure className={c.headNclockFig}>
        <img
          className={c.headphoneIlus}
          alt="headphone ilustration"
          title=""
          src="/svg/SVG/headphone2.svg"
        />

        <img
          className={c.deskclockIlus}
          alt="deskclock ilustration"
          title=""
          src="/svg/SVG/deskclock1.svg"
        />
      </figure>
    ),
  };

  const phone = {
    startScroll: 0,
    endScroll: 2200,
    translateY: [33, 35],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    shouldDisableScalingTranslations: true,
    expanded: false,
    children: (
      <figure className={c.phoneNcoffeeFig}>
        <img
          className={c.phoneIlus}
          alt="phone ilustration"
          title=""
          src="/svg/SVG/phone.svg"
        />
        <img
          className={c.coffeeIlus}
          alt="deskclock ilustration"
          title=""
          src="/svg/SVG/coffee3.svg"
        />
      </figure>
    ),
  };

  const lastread = {
    startScroll: 1850,
    endScroll: 3000,
    translateY: [55, 30, "easeInOutCubic"],
    expanded: false,
    children: (
      <div className={c.lastread}>
        <section className={c.lrHeader}>
          <div className={c.lrTtl}>
            <h2 className={c.lrTtlTxt}>Last Read</h2>
            <img
              src="/pngs/recent-pink.png"
              title="Recent"
              alt="Recent Icon"
              className={c.lrIcon}
            />
          </div>
          <div className={c.lrBookInf}>
            <p className={c.lrBookTtl}>{title}</p>
            <p className={c.lrBookPage}>
              {lastPage}
            </p>
          </div>
        </section>
        <section className={c.lrCard}>
          <img className={c.lrCardBkCvr} src={img} />
          <div className={c.lrDescCtn}>
            <p className={c.lrDescTtl}>Last note</p>
            <p className={c.lrDescNote}>
              {"..."}
              {lastNote()
                .slice(0)
                .reverse()
                .filter((word) => word !== "")
                .join(" ")}
            </p>
            <button className={c.lrBtn} onClick={lrBtnHandler}>
              {lastReadBook ? "Continue read" : "Start reading"}
            </button>
          </div>
        </section>
      </div>
    ),
  };

  useLayoutEffect(() => {
    const allBooks = ctx.allBooks;
    
    const lrtArr = allBooks.map((book) => {
      let lastReadTime = book.lastReadTime;
      if (lastReadTime) {
        return book.lastReadTime;
      } else {
        return 0;
      }
    });

    const actLrt = Math.max(...lrtArr);
    const lastReadBook = allBooks.find((book) => book.lastReadTime === actLrt);
    const note = lastReadBook
      ? lastReadBook.notes.find((note) => note.page === lastReadBook.lastRead)
      : { event: "Currently you have not taken any notes." };
    const preNotes = note.event.split(" ");
    const prop = {
      img: lastReadBook ? lastReadBook.img : "/svg/SVG/dash-outline.svg",
      title: lastReadBook ? lastReadBook.title : "Start reading book!",
      lastPage: lastReadBook
        ? "Page" + lastReadBook.lastRead
        : "Your recent reading will appear here",
      lastNote: () => {
        const array = preNotes.slice(0).reverse();
        let result = new Array(12).fill(null);
        for (let n = 0; n < 12; n++) {
          if (array[n] !== "") {
            result[n] = array[n];
          } else {
            result[n] = "";
          }
        }
        return result;
      },
    };

    setBookProp(prop);
  }, [allBooks]);

  return (
    <ParallaxBanner
      layers={[books, headphone, phone, lastread]}
      className={c.banner}
    />
  );
}

export default LastReadPage;
