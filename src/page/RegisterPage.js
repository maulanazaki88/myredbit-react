import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CtxManager from "../store/CtxManager";
import c from "./RegisterPage.module.css";

const images = [
  "/images/cover0.jpg",
  "/images/cover1.png",
  "/images/cover2.png",
  "/images/cover3.jpg",
  "/images/cover4.jpg",
  "/images/cover5.jpg",
  "/images/cover6.jpg",
  "/images/cover7.jpg",
  "/images/cover8.jpg",
  "/images/cover9.jpg",
  "/images/cover10.jpg",
  "/images/cover11.jpg",
  "/images/cover12.jpg",
  "/images/cover13.jpg",
  "/images/cover14.jpg",
  "/images/cover15.jpg",
  "/images/cover16.jpg",
  "/images/cover17.jpg",
  "/images/cover18.jpg",
  "/images/cover19.jpg",
];

function RegisterPage() {
  const ctx = useContext(CtxManager);

  const editRequest = ctx.editRequest;
  const currPg = ctx.currentPg;
  const currPgHandler = ctx.currentPgHandler;
  const prevPgHandler = ctx.previousPgHandler;
  const bookUpdatedHandler = ctx.bookUpdatedHandler;
  const allBookCltn = ctx.allBooks;

  const editBook = allBookCltn.find((book) => book.id === editRequest);

  const bookCvr = useRef();

  const editProp = {
    title: editBook ? editBook.title : "",
    genre: editBook ? editBook.genre.join(",") : "",
    author: editBook ? editBook.author : "",
    realease: editBook ? editBook.realease : "",
  };

  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: editProp.title,
    genre: editProp.genre,
    author: editProp.author,
    realease: editProp.realease,
  });

  const { title, genre, author, realease } = input;

  const [regFormClasses, setRegFormClasses] = useState([
    c.regForm,
    c.regForm2,
    c.regForm3,
  ]);
  const [progressClasses, setProgressClasses] = useState([
    c.progress,
    c.progress2,
    c.progress3,
  ]);
  const [progressClassesR, setProgressClassesR] = useState([
    c.progress_rev,
    c.progress2_rev,
    c.progress3_rev,
  ]);

  const [fillStages, setFillStages] = useState([1, 2, 3]);

  const [crFClasses, setCrFClasses] = useState([c.crF, c.crF2, c.crF3]);

  const [crBClasses, setCrBClasses] = useState([c.crB, c.crB2, c.crB3]);

  const [errGenreMsg, setErrGenreMsg] = useState({ message: "" });

  const [showTtlErr, setShowTtlErr] = useState(false);

  const [showGenreErr, setShowGenreErr] = useState(false);

  const [showAuthErr, setShowAuthErr] = useState(false);

  const [showRealeaseErr, setShowRealeaseErr] = useState(false);

  const [progressFlow, setProgressFlow] = useState(true);

  const onChange = (e) => {
    let val = e.target.value;
    if (val.length <= 40) {
      setInput((prev) => {
        return {
          ...prev,
          [e.target.name]: val,
        };
      });
    } else {
      console.log("INPUT ERROR");
    }
  };

  const idGenerator = (ttl, gen, aut, rls) => {
    const rawDate = Date.now();
    const dateForm = new Date(rawDate);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    const regExD = /([0-9]+)\/([0-9]+)\/([0-9]+)/;
    const regExT = /([0-9]+)\:([0-9]+)\:([0-9]+)/;

    const matchD = dateString.match(regExD);
    const matchT = timeString.match(regExT);

    const genre = gen.split(",");

    const appliedD = `${matchD[1]}${matchD[2]}${matchD[3]}`;
    const appliedT = `${matchT[1]}${matchT[2]}${matchT[3]}`;

    const raw_id = `${ttl[0]}${ttl.split(" ").length}$${genre[0][0]}${
      genre[1] ? genre[1][0] : ""
    }&${aut[0]}${rls}${appliedD}#${appliedT}`;

    const id = raw_id.replaceAll(" ", "");

    return id;
  };

  const tagGenerator = (title, genre, author, realease) => {
    const appliedG = genre.replaceAll(",", " ");

    try {
      if (genre && author && title && realease) {
        const tag1 = `${title} ${author} ${appliedG} ${realease} `;

        const regEx = /\s?\w+\s?/g;

        const exTag = tag1.match(regEx);
        console.log(exTag);

        const tag1Low = tag1.toLowerCase();
        const tag1Up = tag1.toUpperCase();
        const tag2 = tag1.replaceAll(" ", "s").toLowerCase();
        const tag3 = tag1.replaceAll(" ", "S").toUpperCase();

        if ((tag1, tag1Low, tag1Up, tag2, tag3)) {
          const tags = [tag1, tag1Low, tag1Up, tag2, tag3];
          return tags;
        } else if (!tag1) {
          throw new Error("tag1 are invalid");
        } else if (!tag2) {
          throw new Error("tag2 are invalid");
        } else if (!tag3) {
          throw new Error("tag3 are invalid");
        } else if (!tag1Low) {
          throw new Error("tag1Low are invalid");
        } else if (!tag1Up) {
          throw new Error("tag1Up are invalid");
        }
      } else {
        throw new Error("cant reach input value");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerNewBook = () => {
    const cvrImg = bookCvr.current.getAttribute("src");
    const rawDate = Date.now();
    const dateForm = new Date(rawDate);
    const date = new Date(dateForm);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    try {
      if (
        title !== "" &&
        author !== "" &&
        genre !== "" &&
        realease !== "" &&
        cvrImg
      ) {
        const genres = genre.split(",");
        if (!editRequest) {
          const newBook = {
            id: idGenerator(title, genre, author, realease),
            title: title,
            genre: genres,
            author: author,
            realease: realease,
            img: cvrImg,
            isFavorite: false,
            isFinished: false,
            notes: [
              {
                page: 1,
                event: "",
                conflict: "",
                resolution: "",
                impact: "",
                glossary: "",
                character: "",
                timeline: "",
              },
            ],

            dateRegistered: `${dateString}, ${timeString}`,
            dateUpdated: `${dateString}, ${timeString}`,
            lastModified: new Date().getTime(),
            tag: tagGenerator(title, genre, author, realease),
            lastRead: 1,
            sortIndex: new Date().getTime(),
          };
          const bookStorage = JSON.parse(localStorage.getItem("collections"));
          const bookArray = bookStorage ? bookStorage.books : [];
          const newBookArray = bookArray.concat(newBook);
          const updatedObject = {
            books: newBookArray,
          };

          localStorage.setItem("collections", JSON.stringify(updatedObject));
          currPgHandler("/unfinishedPage");
          prevPgHandler(currPg);
          bookUpdatedHandler(newBook, "Register");
          navigate("/unfinishedPage");
          console.log("register book succeed");
        } else if (editBook) {
          const editedBook = {
            id: editBook.id,
            title: title,
            genre: genres,
            author: author,
            realease: realease,
            img: editBook.img,
            isFavorite: editBook.isFavorite,
            isFinished: editBook.isFinished,
            notes: editBook.notes,
            dateRegistered: editBook.dateRegistered,
            dateUpdated: `${dateString}, ${timeString}`,
            lastModified: new Date().getTime(),
            tag: editBook.tag,
            lastRead: editBook.lastRead,
            sortIndex: editBook.sortIndex,
          };

          const bookStorage = JSON.parse(localStorage.getItem("collections"));
          const bookStorage_ = bookStorage.books.filter(
            (book) => book.id !== editBook.id
          );
          const updatedBooks = bookStorage_.concat(editedBook);
          const updatedStorage = {
            books: updatedBooks,
          };

          localStorage.setItem("collections", JSON.stringify(updatedStorage));
          bookUpdatedHandler(editedBook, "Edit");
          navigate(currPg);
          console.log("register book succeed");
        }
      } else {
        throw new Error("input value cannot be reached");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const turnNextProgIdx = () => {
    setFillStages((prevStages) => {
      let newStages = new Array(prevStages.length).fill(null);
      const temp = prevStages[0];
      for (let n = 0; n < prevStages.length; n++) {
        if (n === prevStages.length - 1) {
          newStages[prevStages.length - 1] = temp;
        } else {
          newStages[n] = prevStages[n + 1];
        }
      }
      return newStages;
    });
    console.log("prog index is updated: next");
  };

  const turnPrevProgIdx = () => {
    setFillStages((prevStages) => {
      let newStages = new Array(prevStages.length).fill(null);
      const temp = prevStages[prevStages.length - 1];
      for (let n = prevStages.length - 1; n >= 0; n--) {
        if (n === 0) {
          newStages[n] = temp;
        } else {
          newStages[n] = prevStages[n - 1];
        }
      }
      return newStages;
    });
    console.log("prog index is updated: prev");
  };

  const genreErrHandler = (stat) => {
    switch (stat) {
      case "empty":
        setErrGenreMsg({ message: `This field can't be empty` });

        break;

      case "space":
        setErrGenreMsg({
          message: `To add multiple genre, please to separate it only with comma without space`,
        });

        break;

      case "over":
        setErrGenreMsg({
          message: `Book can't be classified in more than 4 genres.`,
        });

        break;

      default:
        break;
    }
  };

  const slideToAutRls = () => {
    const genrePass = genre && genre.includes(" ");

    try {
      if (
        genre !== "" &&
        title !== "" &&
        genrePass === false &&
        genre.split(",").length <= 4
      ) {
        console.log("Input are accessible");

        if (!progressFlow) setProgressFlow(true);

        setProgressClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setProgressClassesR((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setRegFormClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setCrFClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setCrBClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        // startProg1to2Anim(false);
      } else if (genre === "" && title === "") {
        genreErrHandler("empty");
        setShowTtlErr(true);

        console.log("title error show");

        setTimeout(() => setShowTtlErr(false), 5000);

        throw new Error("ERROR: TITLE GENRE EMPTY");
      } else if (genre === "") {
        genreErrHandler("empty");
        console.log("gen error show");

        throw new Error("GENRE ERROR: GENRE FIELD NOT FULFILLED");
      } else if (genre.split(",").length > 4) {
        genreErrHandler("over");

        throw new Error("GENRE ERROR : MORE THAN FOUR");
      } else if (title === "") {
        setShowTtlErr(true);
        console.log("title error show");

        setTimeout(() => setShowTtlErr(false), 5000);

        throw new Error("TITLE ERROR: TITLE FIELD NOT FULLFILED");
      } else if (genrePass) {
        genreErrHandler("space");
        console.log("gen error show");

        throw new Error("GENRE ERROR : GENRE FIELD CONTAIN SPACE");
      } else {
        throw new Error("FORM FAILURE");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const slideToCnfrm = () => {
    // const regForm = this.shadow.getElementById("regForm");
    // const progress = this.shadow.getElementById("progress");
    // const fill3 = this.shadow.getElementById("f3");
    // const crF = this.shadow.getElementById("crF");
    // const crB = this.shadow.getElementById("crB");

    // const inpAuth = this.shadow.getElementById("inpAuth");
    // const inpRls = this.shadow.getElementById("inpRls");

    // const authErr = this.shadow.getElementById("authErr");
    // const rlsErr = this.shadow.getElementById("rlsErr");

    try {
      if (author !== "" && realease !== "") {
        // regForm.classList.remove("regForm2");
        // regForm.classList.add("regForm3");
        // progress.classList.remove("progress2");
        // progress.classList.add("progress3");

        // crF.classList.remove("crF2");
        // crF.classList.add("crF3");

        // crB.classList.remove("crB2");
        // crB.classList.add("crB3");

        if (!progressFlow) setProgressFlow(true);

        setProgressClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setProgressClassesR((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setRegFormClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setCrFClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        setCrBClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          const temp = prevClasses[0];
          for (let n = 0; n < prevClasses.length; n++) {
            if (n === prevClasses.length - 1) {
              newClasses[prevClasses.length - 1] = temp;
            } else {
              newClasses[n] = prevClasses[n + 1];
            }
          }
          return newClasses;
        });

        // startProg2to3Anim(false);
      } else if (author === "" && realease === "") {
        // authErr.innerText = this.authMessages;
        // rlsErr.innerText = this.rlsMessages;

        setShowAuthErr(true);
        setShowRealeaseErr(true);

        setTimeout(() => setShowAuthErr(false), 5000);
        setTimeout(() => setShowRealeaseErr(false), 5000);

        throw new Error("author and realease are empty");
      } else if (author === "") {
        // authErr.innerText = this.authMessages;
        setShowAuthErr(true);
        setTimeout(() => setShowAuthErr(false), 5000);
      } else if (realease === "") {
        setShowRealeaseErr(true);
        setTimeout(() => setShowRealeaseErr(false), 5000);
      } else {
        throw new Error("form failure");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const slideBack = () => {
    // const regForm = this.shadow.getElementById("regForm");
    // const formWrapper = this.shadow.getElementById("formWrapper");
    // const progress = this.shadow.getElementById("progress");
    // const fill2 = this.shadow.getElementById("f2");
    // const fill3 = this.shadow.getElementById("f3");

    // const crF = this.shadow.getElementById("crF");
    // const crB = this.shadow.getElementById("crB");

    try {
      if (fillStages[0] !== "1") {
        // console.log("regForm are accessible");
        // regForm.classList.remove("regForm2");
        // regForm.classList.add("regForm");
        // console.log("class now regForm");
        // progress.classList.remove("progress2");
        // progress.classList.add("progress");

        // fill2.classList.remove("fill");
        // fill2.classList.add("fillOff");
        // fill3.classList.remove("fill");
        // fill3.classList.add("fillOff");

        // crF.classList.remove("crF2");
        // crF.classList.add("crF");
        // crB.classList.remove("crB2");
        // crB.classList.add("crB");

        // formWrapper.classList.remove("formWrapper2");
        // formWrapper.classList.add("formWrapper");

        if (progressFlow) setProgressFlow(false);

        setRegFormClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          let temp = prevClasses[prevClasses.length - 1];
          for (let n = prevClasses.length - 1; n >= 0; n--) {
            if (n === 0) {
              newClasses[n] = temp;
            } else {
              newClasses[n] = prevClasses[n - 1];
            }
          }
          return newClasses;
        });

        setProgressClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          let temp = prevClasses[prevClasses.length - 1];
          for (let n = prevClasses.length - 1; n >= 0; n--) {
            if (n === 0) {
              newClasses[n] = temp;
            } else {
              newClasses[n] = prevClasses[n - 1];
            }
          }
          return newClasses;
        });

        setProgressClassesR((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          let temp = prevClasses[prevClasses.length - 1];
          for (let n = prevClasses.length - 1; n >= 0; n--) {
            if (n === 0) {
              newClasses[n] = temp;
            } else {
              newClasses[n] = prevClasses[n - 1];
            }
          }
          return newClasses;
        });

        setCrFClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          let temp = prevClasses[prevClasses.length - 1];
          for (let n = prevClasses.length - 1; n >= 0; n--) {
            if (n === 0) {
              newClasses[0] = temp;
            } else {
              newClasses[n] = prevClasses[n - 1];
            }
          }
          return newClasses;
        });

        setCrBClasses((prevClasses) => {
          let newClasses = new Array(prevClasses.length).fill(null);
          let temp = prevClasses[prevClasses.length - 1];
          for (let n = prevClasses.length - 1; n >= 0; n--) {
            if (n === 0) {
              newClasses[0] = temp;
            } else {
              newClasses[n] = prevClasses[n - 1];
            }
          }
          return newClasses;
        });

        turnPrevProgIdx();
      } else {
        throw new Error("regForm are unaccessible");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const back = () => {
    ctx.editRequestHandler(null);
    navigate(currPg);
  };

  useEffect(() => {
    setShowGenreErr(true);
    setTimeout(() => setShowGenreErr(false), 5000);
  }, [errGenreMsg]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id={c["regPg"]}>
      <div className={c.background}>
        <Link to={currPg}>
          <button id={c["regBackBtn"]} onClick={back} className={c.regBackBtn}>
            {" "}
            &lt; Back{" "}
          </button>
        </Link>
        <div className={c.progressWrp}>
          <div className={c.circle} id={c["cr1"]}>
            <div className={c.fill} id={c["f1"]}></div>
          </div>
          <div className={c.circle} id={c["cr2"]}>
            <div
              className={fillStages[0] >= 2 ? c.fill : c.fillOff}
              id={c["f2"]}
            ></div>
          </div>
          <div className={c.circle} id={c["cr3"]}>
            <div
              className={fillStages[0] >= 3 ? c.fill : c.fillOff}
              id={c["f3"]}
            ></div>
          </div>
          <div className={c.progressGroup}>
            <div className={c.progressBar}></div>
            <div
              id={c["progress"]}
              className={
                progressFlow ? progressClasses[0] : progressClassesR[0]
              }
              onAnimationEnd={turnNextProgIdx}
            ></div>
          </div>
        </div>
        <h1 className={c.regTitle}>
          {editRequest ? "Edit Book" : "Book Registration"}
        </h1>
        <div id={c["formWrapper"]} className={c.formWrapper}>
          <form id={c["regForm"]} className={regFormClasses[0]}>
            <section className={c.ttlNgen}>
              <div className={c.formCard}>
                <div id={c["inpGroup1"]} className={c.inpGroup}>
                  <label className={c.regLabel} htmlFor="title">
                    Book Title
                  </label>
                  <input
                    className={c.regInp}
                    type="text"
                    name="title"
                    id="inpTtl"
                    value={title}
                    onChange={onChange}
                    maxLength="40"
                    required
                  />
                  <p id={c["ttlErr"]} className={c.errMessage}>
                    {showTtlErr && "This field can't be empty"}
                  </p>
                </div>
                <div id={c["inpGroup1"]} className={c.inpGroup}>
                  <label className={c.regLabel} htmlFor="genre">
                    Genre
                  </label>
                  <input
                    className={c.regInp}
                    type="text"
                    name="genre"
                    id={c["inpGen"]}
                    required
                    value={genre}
                    onChange={onChange}
                    maxLength="40"
                  />
                  <p id={c["genErr"]} className={c.errMessage}>
                    {showGenreErr && errGenreMsg.message}
                  </p>
                </div>
                <div className={c.formBtnGroup}>
                  <button
                    type="button"
                    className={c.regNext}
                    onClick={slideToAutRls}
                    id={c["titGenNBtn"]}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
            <section className={c.autNrls}>
              <div className={c.formCard}>
                <div id={c["inpGroup2"]} className={c.inpGroup}>
                  <label className={c.regLabel} htmlFor="author">
                    Author
                  </label>
                  <input
                    className={c.regInp}
                    type="text"
                    name="author"
                    id={c["inpAuth"]}
                    required
                    value={author}
                    onChange={onChange}
                    maxLength="40"
                  />
                  <p id={c["authErr"]} className={c.errMessage}>
                    {showAuthErr && `This field can't be empty`}
                  </p>
                </div>
                <div id={c["inpGroup2"]} className={c.inpGroup}>
                  <label className={c.regLabel} htmlFor="realese">
                    Realease Year
                  </label>
                  <input
                    className={c.regInp}
                    type="number"
                    name="realease"
                    id={c["inpRls"]}
                    required
                    value={realease}
                    onChange={onChange}
                  />
                  <p id={c["rlsErr"]} className={c.errMessage}>
                    {showRealeaseErr && `This field can't be empty`}
                  </p>
                </div>
              </div>
              <div className={c.formBtnGroup}>
                <button
                  type="button"
                  className={c.regBack}
                  id={c["autRlsBBtn"]}
                  onClick={slideBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={c.regNext}
                  id={c["autRlsNBtn"]}
                  onClick={slideToCnfrm}
                >
                  Next
                </button>
              </div>
            </section>
            <section className={c.cnfrm}>
              <div className={c.formCard} id={c["cnfrmCard"]}>
                <div className={c.cnfrmWrp}>
                  <div className={c.cnfrmContent}>
                    <figure className={c.cvrFg}>
                      <img
                        id={c["bookCvr"]}
                        className={c.bookCvr}
                        src={
                          editRequest
                            ? editBook.img
                            : images[Math.ceil(Math.random() * 100) % 20]
                        }
                        alt="bookCover"
                        ref={bookCvr}
                      />
                    </figure>
                    <ul className={c.infList}>
                      <li className={c.infItem}>
                        <p className={c.infTtl} id={c["inpTtlMirr"]}>
                          {title}
                        </p>
                      </li>
                      <li className={c.infItem}>
                        <p className={c.infTxt} id={c["inpGenMirr"]}>
                          {genre.replaceAll(",", " || ")}
                        </p>
                      </li>
                      <li className={c.infItem}>
                        <p className={c.infTxt} id={c["inpAuthMirr"]}>
                          {author}
                        </p>
                      </li>
                      <li className={c.infItem}>
                        <p className={c.infTxt} id={c["inpRlsMirr"]}>
                          {realease}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <figure className={c.lineFg}>
                    <img
                      className={c.lineGr}
                      src="/svg/SVG/dblLine.svg"
                      alt="dblLine"
                      srcSet=""
                    />
                  </figure>
                  <div className={c.cnfrmBtnGroup}>
                    <button
                      type="button"
                      className={c.regBack}
                      id={c["cnfrmBack"]}
                      onClick={slideBack}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className={c.regNext}
                      id={c["cnfrmOk"]}
                      onClick={registerNewBook}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
        <figure className={c.drpfg}>
          <img
            id={c["crF"]}
            className={crFClasses[0]}
            src="/svg/SVG/circle.svg"
            alt="circle"
            srcSet=""
          />
          <img
            id={c["crB"]}
            className={crBClasses[0]}
            src="/svg/SVG/circle.svg"
            alt="circle"
            srcSet=""
          />
        </figure>
      </div>
    </section>
  );
}

export default RegisterPage;
