import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import BookCollection from "./BookCollection";
import ScrolldownItem from "./ScrolldownItem";
import CtxManager from "../store/CtxManager";

import c from "./Collection.module.css";

function Collection(props) {
  const [filterOn, setFilterOn] = useState(false);
  const [sortOn, setSortOn] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [editBookInfo, setEditBookInfo] = useState({
    title: "",
    id: "",
    type: "",
  });
  const [isFirst, setIsFirst] = useState(true);

  const { id, type } = editBookInfo;

  const ctx = useContext(CtxManager);
  const allBooks = ctx.allBooks;

  const toggleFavoriteHandler = (id) => {
    const thisBook = allBooks.find((book) => book.id === id);
    const rawDate = Date.now();
    const dateForm = new Date(rawDate);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    try {
      if (thisBook) {
        const updatedBook = {
          ...thisBook,
          isFavorite: !thisBook.isFavorite,
          dateUpdated: `${dateString}, ${timeString}`,
          lastModified: new Date().getTime(),
        };
        const collections_ = allBooks.filter((book) => book.id !== id);
        const updatedCollections = collections_.concat(updatedBook);
        localStorage.setItem(
          "collections",
          JSON.stringify({ books: updatedCollections })
        );
        props.bookUpdated(updatedBook, "favorite");
        setShowPopUp(false);
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const toggleFinishedHandler = (id) => {
    const rawDate = Date.now();
    const dateForm = new Date(rawDate);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    const thisBook = allBooks.find((book) => book.id === id);
    try {
      if (thisBook) {
        const updatedBook = {
          ...thisBook,
          isFinished: !thisBook.isFinished,
          dateUpdated: `${dateString}, ${timeString}`,
          lastModified: new Date().getTime(),
        };
        const collections_ = allBooks.filter((book) => book.id !== id);
        const updatedCollections = collections_.concat(updatedBook);
        localStorage.setItem(
          "collections",
          JSON.stringify({ books: updatedCollections })
        );
        props.bookUpdated(updatedBook, "finished");
        setShowPopUp(false);
      } else {
        throw new Error("MARK FINISHED ERROR: INVALID BOOKS");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const deleteBookHandler = (id) => {
    const updatedCollections = allBooks.filter((book) => book.id !== id);
    localStorage.setItem(
      "collections",
      JSON.stringify({ books: updatedCollections })
    );
    setShowPopUp(false);
    props.bookUpdated(id, "deleted");
    if (props.appliedBooksLength === 1) {
      props.kickedToHome();
    }
  };

  const showGenreScroll = () => {
    setFilterOn(true);
    setSortOn(false);
  };

  const showShortScroll = () => {
    setSortOn(true);
    setFilterOn(false);
  };

  const hideAllScroll = () => {
    setSortOn(false);
    setFilterOn(false);
    console.log("All scroll is now hidden");
  };

  const showPopUpHandler = (title, id, type) => {
    setEditBookInfo({
      title: title,
      id: id,
      type: type,
    });
    switch (type) {
      case "finished":
        setMessage(
          <p className={c.message}>
            Do you wish to mark <span id={c["popBTtl"]}>{title}</span> as
            finished?
          </p>
        );
        break;
      case "reread":
        setMessage(
          <p className={c.message}>
            Do you wish to re-read <span id={c["popBTtl"]}>{title} </span>?
          </p>
        );
        break;
      case "delete":
        setMessage(
          <p className={c.message}>
            Do you wish to remove <span id={c["popBTtl"]}>{title}</span> from
            your collection?
          </p>
        );
        break;

      default:
        break;
    }
  };

  const editBookHandler = (id, type) => {
    switch (type) {
      case "favorite":
        toggleFavoriteHandler(id);
        console.log(`edit favorite executed id ${id}`);
        break;
      case "finished":
        toggleFinishedHandler(id);
        console.log(`edit finished executed id ${id}`);
        break;
      case "reread":
        toggleFinishedHandler(id);
        console.log(`edit finished executed id ${id}`);
        break;
      case "delete":
        deleteBookHandler(id);
        console.log(`delete book executed ${id}`);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setIsFirst(false);
    if (!isFirst && type !== "favorite") {
      setShowPopUp(true);
    }
  }, [editBookInfo]);

  useLayoutEffect(() => {
    setIsFirst(true);
  }, []);

  return (
    <section id={c["allBookCltn"]} className={c.bookCltn}>
      <div id={c["popUp"]} className={c.popUpControl}>
        <section className={c.popUp}>
          <div className={c.popUpWrp}>
            <div className={showPopUp ? c.popContainer_on : c.popContainer_off}>
              <div className={c.popContentWrp}>
                {message}
                <div className={c.popBtnGroup}>
                  <button
                    id={c["cancelPopBtn"]}
                    className={c.popBtn}
                    onClick={() => {
                      setShowPopUp(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    id={c["confirmPopBtn"]}
                    className={c.popBtn}
                    onClick={() => editBookHandler(id, type)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
            <div
              id={c["backdrop"]}
              className={showPopUp ? c.backdrop_on : c.backdrop_off}
              onClick={() => {
                setShowPopUp(false);
              }}
            ></div>
          </div>
        </section>
      </div>
      <h1 className={c.cltnTitle}>{props.title}</h1>
      <button id={c["backBtn"]} onClick={() => props.backToPrevPg()}>
        {" "}
        &lt; Back
      </button>
      {props.anyBook ? (
        <>
          <div
            id={c["genreScrolldown"]}
            className={filterOn ? c.scrolldown_on : c.scrolldown_off}
          >
            <ul id={c["genreScrolldownWrp"]} className={c.scrolldownWrp}>
              {props.genreScroll.map((genre, index) => {
                return (
                  <li key={index}>
                    <ScrolldownItem
                      genre={genre}
                      changeGenre={(genre) => {
                        props.changeGenre(genre);
                        hideAllScroll();
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            id={c["sortScrolldown"]}
            className={sortOn ? c.scrolldown_on : c.scrolldown_off}
          >
            <ul id={c["sortScrolldownWrp"]} className={c.scrolldownWrp}>
              <li
                id={c["byName"]}
                className={c.scrolldownItem}
                onClick={() => {
                  props.changeSort("Name");
                  hideAllScroll();
                }}
              >
                Name
              </li>
              <li
                id={c["byYear"]}
                className={c.scrolldownItem}
                onClick={() => {
                  props.changeSort("Year");
                  hideAllScroll();
                }}
              >
                Year
              </li>
            </ul>
          </div>
          <div
            id={c["backdrop"]}
            className={filterOn || sortOn ? c.backdrop_on : c.backdrop_off}
            onClick={hideAllScroll}
          ></div>
          {props.isFiltered && (
            <div className={c.filter}>
              <div className={c.filterCtn}>
                <ul className={c.filterWrp}>
                  <li className={c.filterItem} id={c["f_genre"]}>
                    Genre :{" "}
                    <span
                      id={c["genreVal"]}
                      className={c.filterVal}
                      onClick={showGenreScroll}
                    >
                      {props.currentGenre}
                    </span>
                  </li>
                  <li className={c.filterItem} id={c["f_sort"]}>
                    Sort by :{" "}
                    <span
                      id={c["sortVal"]}
                      className={c.filterVal}
                      onClick={showShortScroll}
                    >
                      {props.currentSort}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <BookCollection
            appliedBooks={props.appliedBooks}
            appliedBooksLength={props.appliedBooksLength}
            bookUpdated={(id, stat) => props.bookUpdated(id, stat)}
            editReqHandler={(id) => props.editReqHandler(id)}
            showPopUp={(title, id, type) => showPopUpHandler(title, id, type)}
            editBook={(id, type) => editBookHandler(id, type)}
            requestNote={(id) => props.requestNote(id)}
          />
        </>
      ) : (
        <div className={c.noBooks}>
          <h2 className={c.noBooksMessage}>{props.message}</h2>
          <br />
          {props.figure && (
            <figure>
              <img
                className={c.motivation}
                src="/images/sleeping-cat.jfif"
                alt="sleeping cat"
                title="You probably...."
              />
            </figure>
          )}
          <h3 id={c["noBooksGuide"]} className={c.noAllGuide}>
            {props.guide}
          </h3>
        </div>
      )}
    </section>
  );
}

export default Collection;
