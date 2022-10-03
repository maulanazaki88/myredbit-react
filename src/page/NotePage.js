import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import CtxManager from "../store/CtxManager";
import { useLottie } from "lottie-react";

import loadingAnimation from "../animation/loading.json";
import c from "./NotePage.module.css";

function BookNote() {
  const ctx = useContext(CtxManager);

  const navigate = useNavigate();

  const allBookCltn = ctx.allBooks;
  const noteRequest = ctx.noteRequest;
  const bookUpdated = ctx.bookUpdatedHandler;
  const noteRequestHandler = ctx.noteRequestHandler;
  const currPg = ctx.currentPg;
  const [reqId, setReqId] = useState(noteRequest);
  const book = allBookCltn.find((book) => book.id === reqId);
  const notes = book && book.notes;
  const [pageInit, setPageInit] = useState(book && book.lastRead);
  const note = notes ? notes.find((note) => note.page === pageInit) : [];
  const initialNote = {
    title: book ? book.title : "",
    event: note ? note.event : "",
    conflict: note ? note.conflict : "",
    resolution: note ? note.resolution : "",
    impact: note ? note.impact : "",
    glossary: note ? note.glossary : "",
    character: note ? note.character : "",
    timeline: note ? note.timeline : "",
  };
  const [noteVal, setNoteVal] = useState(initialNote);

  const {
    title,
    event,
    conflict,
    resolution,
    impact,
    glossary,
    character,
    timeline,
  } = noteVal;

  const [board, setBoard] = useState(c.boardWrp);
  const [isLoading, setIsLoading] = useState(true);

  const loadingOption = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(loadingOption);

  const onInputChange = (e) => {
    let val = e.target.value;
    try {
      if (val) {
        setNoteVal((prevVal) => {
          return {
            ...prevVal,
            [e.target.name]: val,
          };
        });
      } else {
        throw new Error("CAN'T REACH INPUT TARGET VALUE");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const nextPage = () => {
    const rawDate = Date.now();
    const dateForm = new Date(rawDate);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    const updatedNote = {
      page: pageInit,
      event: event,
      conflict: conflict,
      resolution: resolution,
      impact: impact,
      glossary: glossary,
      character: character,
      timeline: timeline,
    };
    const notes_ = notes.filter((note) => note.page !== pageInit);
    const updatedNotes = notes_.concat(updatedNote);
    const updatedBook = {
      ...book,
      notes: updatedNotes,
      lastRead: pageInit + 1,
      dateUpdated: `${dateString}, ${timeString}`,
      lastModified: new Date().getTime(),
    };

    const allBookCltn_ = allBookCltn.filter((b) => b.id !== book.id);
    const updatedBookCltn = allBookCltn_.concat(updatedBook);

    localStorage.setItem(
      "collections",
      JSON.stringify({ books: updatedBookCltn })
    );
    bookUpdated(book, "notes");
    setPageInit(pageInit + 1);
    setBoard(c.boardWrp);
  };

  const prevPage = () => {
    const rawDate = Date.now();
    const dateForm = new Date(rawDate);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    if (pageInit > 1) {
      const updatedNote = {
        page: pageInit,
        event: event,
        conflict: conflict,
        resolution: resolution,
        impact: impact,
        glossary: glossary,
        character: character,
        timeline: timeline,
      };
      const notes_ = notes.filter((note) => note.page !== pageInit);
      const updatedNotes = notes_.concat(updatedNote);
      const updatedBook = {
        ...book,
        notes: updatedNotes,
        lastRead: pageInit - 1,
        dateUpdated: `${dateString}, ${timeString}`,
        lastModified: new Date().getTime(),
      };

      const allBookCltn_ = allBookCltn.filter((b) => b.id !== book.id);
      const updatedBookCltn = allBookCltn_.concat(updatedBook);

      localStorage.setItem(
        "collections",
        JSON.stringify({ books: updatedBookCltn })
      );
      bookUpdated(book, "notes");
      setPageInit(pageInit - 1);
      setBoard(c.boardWrp);
      console.log("prev pg success");
    } else {
      console.log("prev pg error");
    }
  };

  const back = () => {
    navigate(currPg);
  };

  useEffect(() => {
    if (reqId) {
      const book = allBookCltn.find((book) => book.id === noteRequest);
      const notes = book.notes;
      const note = notes.find((note) => note.page === pageInit);
      const initialNote = {
        title: book.title,
        page: book.lastRead,
        event: note ? note.event : "",
        conflict: note ? note.conflict : "",
        resolution: note ? note.resolution : "",
        impact: note ? note.impact : "",
        glossary: note ? note.glossary : "",
        character: note ? note.character : "",
        timeline: note ? note.timeline : "",
      };

      setNoteVal(initialNote);
    } else {
      navigate("/");
    }
  }, [pageInit, reqId]);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        console.log("LOADING FINISHED");
      }, 200);
    }

    return function cleanUp() {
      noteRequestHandler(null);
      setReqId(null);
      setIsLoading(true);
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div className={c.loadingAnimation}>{View}</div>;
  } else {
    return (
      <>
        <div className={c.noteWrp}>
          <button id={c["noteBackBtn"]} type="button" onClick={back}>
            &lt; Back
          </button>
          <section className={c.book_info}>
            <h1 className={c.bookTtl}>{title}</h1>
          </section>
          <form className={c.noteForm} action="">
            <div className={c.formGroup}>
              <div className={c.form}>
                <div className={c.mainForm}>
                  <ul className={c.labels}>
                    <li
                      id={c["eventLabel"]}
                      className={
                        board === c.boardWrp
                          ? [c.label, c.selected].join(" ")
                          : c.label
                      }
                      onClick={() => {
                        setBoard(c.boardWrp);
                      }}
                    >
                      <label id={c["eventNote"]} htmlFor="event">
                        Event
                      </label>
                    </li>
                    <li
                      id={c["conflictLabel"]}
                      className={
                        board === c.boardWrp2
                          ? [c.label, c.selected].join(" ")
                          : c.label
                      }
                      onClick={() => {
                        setBoard(c.boardWrp2);
                      }}
                    >
                      <label id={c["conflictLabel"]} htmlFor="conflict">
                        Conflict
                      </label>
                    </li>
                    <li
                      id={c["resolutionLabel"]}
                      className={
                        board === c.boardWrp3
                          ? [c.label, c.selected].join(" ")
                          : c.label
                      }
                      onClick={() => {
                        setBoard(c.boardWrp3);
                      }}
                    >
                      <label id={c["resolutionNote"]} htmlFor="resolution">
                        Resolution
                      </label>
                    </li>
                    <li
                      id={c["impactLabel"]}
                      className={
                        board === c.boardWrp4
                          ? [c.label, c.selected].join(" ")
                          : c.label
                      }
                      onClick={() => {
                        setBoard(c.boardWrp4);
                      }}
                    >
                      <label id={c["impactNote"]} htmlFor="impact">
                        Impact
                      </label>
                    </li>
                    <li
                      id={c["glossaryLabel"]}
                      className={
                        board === c.boardWrp5
                          ? [c.label, c.selected].join(" ")
                          : c.label
                      }
                      onClick={() => {
                        setBoard(c.boardWrp5);
                      }}
                    >
                      <label id={c["glossaryNote"]} htmlFor="glossary">
                        Glossary
                      </label>
                    </li>
                  </ul>
                  <div className={c.boardScroller}>
                    <div id={c["boardWrp"]} className={board}>
                      <textarea
                        className={c.noteBoard}
                        name="event"
                        id={c["eventBoard"]}
                        placeholder="Type event notes here"
                        value={event}
                        onChange={(e) => onInputChange(e)}
                      ></textarea>
                      <textarea
                        className={c.noteBoard}
                        name="conflict"
                        id={c["conflictBoard"]}
                        placeholder="Type conflict notes here"
                        value={conflict}
                        onChange={(e) => onInputChange(e)}
                      ></textarea>
                      <textarea
                        className={c.noteBoard}
                        name="resolution"
                        id={c["resolutionBoard"]}
                        placeholder="Type resolution notes here"
                        onChange={(e) => onInputChange(e)}
                        value={resolution}
                      ></textarea>
                      <textarea
                        className={c.noteBoard}
                        name="impact"
                        id={c["impactBoard"]}
                        placeholder="Type impact notes here"
                        onChange={(e) => onInputChange(e)}
                        value={impact}
                      ></textarea>
                      <textarea
                        className={c.noteBoard}
                        name="glossary"
                        id={c["glossaryBoard"]}
                        placeholder="Type glossary notes here"
                        onChange={(e) => onInputChange(e)}
                        value={glossary}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className={c.subForm}>
                  <div className={c.form_detail}>
                    <label className={c.detail_labels} htmlFor="charactersNote">
                      Characters
                    </label>
                    <textarea
                      className={c.detailNote}
                      name="character"
                      id={c["charactersNote"]}
                      cols="35"
                      rows="5"
                      placeholder="Involved Characters"
                      value={character}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  </div>
                  <div className={c.form_detail}>
                    <label className={c.detail_labels} htmlFor="timelineNotes">
                      Timeline
                    </label>
                    <textarea
                      className={c.detailNote}
                      name="timeline"
                      id={c["timelineNote"]}
                      cols="35"
                      rows="5"
                      placeholder="After ... events || Before ... events"
                      value={timeline}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className={c.pgCtrl}>
                <div className={c.pgCtrlWrp}>
                  <h3 className={c.pgCtrlTtl}>Page</h3>
                  <p className={c.pgNumber}>{pageInit}</p>
                  <div className={c.pgCtrlBtn_g}>
                    <button
                      type="button"
                      className={c.pgCtrlBtn}
                      id={c["backPg"]}
                      onClick={prevPage}
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className={c.pgCtrlBtn}
                      id={c["nextPg"]}
                      onClick={nextPage}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default BookNote;
