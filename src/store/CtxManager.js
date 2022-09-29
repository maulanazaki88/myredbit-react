import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const collections = JSON.parse(localStorage.getItem("collections"));
const allBooks = collections ? collections.books : [];
const ufBooks = allBooks.filter((book) => book.isFinished === false);
const fBooks = allBooks.filter((book) => book.isFinished === true);
const favBooks = allBooks.filter((book) => book.isFavorite === true);

const CtxManager = createContext({
  currentPg: "",
  currentPgHandler: (cpg) => {},
  previousPg: "",
  previousPgHandler: (ppg) => {},
  editRequest: "",
  editRequestHandler: (id) => {},
  noteRequest: "",
  noteRequestHandler: (id) => {},
  keywords: "",
  onKeywordsChange: (e) => {},
  bookUpdated: {},
  bookUpdatedHandler: (book, stat) => {},
  currentGenre: "",
  currentGenreHandler: (genre) => {},
  currentSort: "",
  currentSortHandler: (sort) => {},
  appliedBooks: [],
  srcDisplay: [],
  genreScroll: [],
  allBooks: [],
  resetKeywordsHandler: () => {},
});

export function CtxManagerProvider(props) {
  const [currentPg, setCurrentPg] = useState("/");
  const [previousPg, setPreviousPg] = useState("/");
  const [keywords, setKeywords] = useState("");
  const [editRequest, setEditRequest] = useState(null);
  const [noteRequest, setNoteRequest] = useState(null);
  const [ufDisplay, setUfDisplay] = useState(ufBooks);
  const [fDisplay, setFDisplay] = useState(fBooks);
  const [favDisplay, setFavDisplay] = useState(favBooks);
  const [allDisplay, setAllDisplay] = useState(allBooks);
  const [srcDisplay, setSrcDisplay] = useState([]);
  const [bookUpdated, setBookUpdated] = useState(null);
  const [appliedBooks, setAppliedBooks] = useState(allBooks);
  const [currentGenre, setCurrentGenre] = useState("All");
  const [currentSort, setCurrentSort] = useState("-");
  const [genreScroll, setGenreScroll] = useState(["All"]);

  const navigate = useNavigate();

  const srcBook = () => {
    let results = [];

    try {
      if (keywords !== "") {
        const keywordsArray = keywords.split(" ");
        for (let book of allDisplay) {
          let bookTags = book.tag;
          let arrayScores = [];
          for (let n = 0; n < bookTags.length; n++) {
            let tag = bookTags[n];
            let scores = () => {
              return 5 - n;
            };

            for (let keyword of keywordsArray) {
              let isInclude = tag.includes(keyword);
              if (isInclude) {
                let matchScore = scores();
                arrayScores.push(matchScore);
              } else {
                arrayScores.push(0);
              }
            }
          }
          let totalScores = arrayScores.reduce((cumulated, score) => {
            let total = cumulated + score;
            return total;
          }, 0);
          if (totalScores > 0) {
            let scoredBook = Object.assign(
              { ...book, mScore: totalScores },
              book
            );
            results.push(scoredBook);
          } else {
          }
          navigate("/searchPage");
        }
        const resultScores = results.map((result) => {
          return result.mScore;
        });

        const sortedScores = () => {
          const scoreSet = new Set(resultScores);
          let resultScores_ = [...scoreSet];
          let swap;
          do {
            swap = false;
            for (let n = 0; n < resultScores_.length; n++) {
              if (resultScores_[n] > resultScores_[n + 1]) {
                let [a, b] = [resultScores_[n], resultScores_[n + 1]];
                [resultScores_[n], resultScores_[n + 1]] = [b, a];
                swap = true;
              } else {
              }
            }
          } while (swap);
          return resultScores_;
        };

        const populateBooks = sortedScores().map((score) => {
          return results.filter((book) => book.mScore === score);
        });

        const flatPopulateBooks = populateBooks.slice(0).flat(1);

        setSrcDisplay(flatPopulateBooks);
      } else {
        navigate("/");
      }

      console.log("data matching resolved");
    } catch (error) {
      console.log(error.stack);
    }
  };

  const resetKeywordsHandler = () => {
    setKeywords("");
  };

  const currentPgHandler = (cpg) => {
    try {
      if (
        cpg &&
        (cpg === "/unfinishedPage" ||
          cpg === "/finishedPage" ||
          cpg === "/favoritePage" ||
          cpg === "/allPage" ||
          cpg === "/searchPage" ||
          cpg === "/registerPage" ||
          cpg === "/")
      ) {
        setCurrentPg(cpg);
      } else if (!cpg) {
        throw new Error("CAN'T FETCH CURRENT PAGE ID");
      } else {
        throw new Error("INVALID PAGE ID");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const previousPgHandler = (ppg) => {
    try {
      if (
        ppg &&
        (ppg === "/unfinishedPage" ||
          ppg === "/finishedPage" ||
          ppg === "/favoritePage" ||
          ppg === "/allPage" ||
          ppg === "/searchPage" ||
          ppg === "/registerPage" ||
          ppg === "/")
      ) {
        setPreviousPg(ppg);
      } else if (!ppg) {
        throw new Error("CAN'T FETCH PREVIOUS PAGE ID");
      } else {
        throw new Error("INVALID PAGE ID");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const editRequestHandler = (id) => {
    try {
      if (id) {
        setEditRequest(id);
      } else {
        throw new Error("INVALID EDIT REQUEST ID");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const bookUpdatedHandler = (book, stat) => {
    try {
      if (book && stat) {
        setBookUpdated((prevVal) => {
          return {
            ...prevVal,
            book: book,
            stat: stat,
          };
        });
        console.log("book update successful");
      } else if (!book) {
        throw new Error("BOOK UPDATE INVALID BOOK");
      } else if (!stat) {
        throw new Error("BOOK UPDATE INVALID STATUS");
      } else {
        throw new Error("BOOK UPDATE FAILED");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const refetchBook = () => {
    const collections = JSON.parse(localStorage.getItem("collections"));
    const allBooks = collections ? collections.books : [];
    const ufBooks = allBooks.filter((book) => book.isFinished === false);
    const fBooks = allBooks.filter((book) => book.isFinished === true);
    const favBooks = allBooks.filter((book) => book.isFavorite === true);

    setAllDisplay(allBooks);
    setUfDisplay(ufBooks);
    setFDisplay(fBooks);
    setFavDisplay(favBooks);
  };

  const onKeywordsChange = (e) => {
    try {
      if (e) {
        setKeywords(e.target.value);
      } else {
        throw new Error("EVENT TARGET INACCESSIBLE");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const currentGenreHandler = (genre) => {
    try {
      if (genre) {
        setCurrentGenre(genre);
      } else {
        throw new Error("INVALID GENRE");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const currentSortHandler = (sort) => {
    try {
      if (sort) {
        setCurrentSort(sort);
      } else {
        throw new Error("INVALID SORT");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  const displayProcessor = () => {
    const currentCollection = () => {
      let collection;
      switch (currentPg) {
        case "/unfinishedPage":
          collection = ufDisplay;
          break;
        case "/finishedPage":
          collection = fDisplay;
          break;
        case "/favoritePage":
          collection = favDisplay;
          break;
        case "/allPage":
          collection = allDisplay;
          break;

        default:
          collection = [];
          break;
      }
      return collection;
    };
    if (currentCollection()[0]) {
      let genresCompiler = currentCollection().map((book) => {
        return book.genre;
      });
      let genres = genresCompiler.flat(1);
      let genreSet = new Set(genres);
      let genreScroll = [...genreSet].sort();
      setGenreScroll(["All", ...genreScroll]);

      const filteredCollection =
        currentGenre === "All"
          ? currentCollection()
          : currentCollection().filter((book) =>
              book.genre.join(" ").includes(currentGenre)
            );

      const sortCollection = () => {
        try {
          if (currentSort === "-" && filteredCollection[0]) {
            const Idxs = filteredCollection.map((book) => {
              return book.sortIndex;
            });
            const processSortIdx = () => {
              let sortedIdxs = Idxs.slice(0);
              let swap;
              do {
                swap = false;
                for (let n = 0; n < sortedIdxs.length; n++) {
                  if (sortedIdxs[n] > sortedIdxs[n + 1]) {
                    let [a, b] = [sortedIdxs[n], sortedIdxs[n + 1]];
                    [sortedIdxs[n], sortedIdxs[n + 1]] = [b, a];
                    swap = true;
                  } else {
                  }
                }
              } while (swap);
              return sortedIdxs;
            };

            const populateBooks = processSortIdx().map((idx) => {
              return allDisplay.find((book) => book.sortIndex === idx);
            });

            return populateBooks.slice(0);
          } else if (currentSort === "-") {
            return filteredCollection;
          } else if (currentSort === "Name") {
            const titleArray = filteredCollection.map((book) => {
              return book.title;
            });

            const sortedBooks = titleArray
              .sort()
              .slice(0)
              .reverse()
              .map((title) => {
                let book = filteredCollection.find(
                  (book) => book.title === title
                );
                return book;
              });

            return sortedBooks;
          } else if (currentSort === "Year") {
            const initiate = () => {
              if (filteredCollection) {
                return "start";
              } else {
              }
            };

            const formArray = (cmd) => {
              if (cmd === "start") {
                const numbers = filteredCollection.map((book) => {
                  return book.realease;
                });
                const numbersSet = new Set(numbers);
                const yearSet = [...numbersSet];
                console.log("numbers created");
                console.log(numbers);
                return yearSet;
              } else {
                throw new Error("invalid command");
              }
            };

            const sortArray = (numbers) => {
              if (numbers) {
                const sortedNumbers = numbers.slice(0);
                let newArray;
                let swap;
                do {
                  swap = false;
                  for (let n = 0; n < sortedNumbers.length; n++) {
                    if (sortedNumbers[n] < sortedNumbers[n + 1]) {
                      let [a, b] = [sortedNumbers[n], sortedNumbers[n + 1]];
                      [sortedNumbers[n], sortedNumbers[n + 1]] = [b, a];

                      swap = true;
                    } else {
                      newArray = sortedNumbers;
                    }
                  }
                } while (swap);
                console.log("sortArray successful");
                console.log(newArray);
                return newArray;
              } else {
                throw new Error("NUMBERS ARRAY ARE INVALID");
              }
            };

            const populateObj = (newArray) => {
              if (newArray) {
                const objs = newArray.map((number) => {
                  let obj = filteredCollection.filter(
                    (book) => book.realease === number
                  );
                  return obj;
                });
                console.log("populate obj is successful");
                console.log(objs);
                return objs;
              } else {
                throw new Error("SORTED ARRAY ARE INVALID ");
              }
            };

            const flattenArray = (objs) => {
              if (objs) {
                const result = objs.flat(1);
                console.log(result);
                return result;
              } else {
                throw new Error("POPULATED OBJS INVALID");
              }
            };

            const cmd = initiate();
            const numbers = formArray(cmd);
            const newArray = sortArray(numbers);
            const populatedObj = populateObj(newArray);
            const flatArray = flattenArray(populatedObj);

            return flatArray;
          }
        } catch (error) {
          console.log(error.stack);
        }
      };
      if (filteredCollection.length === 2) {
        let splicedArr = sortCollection().slice(0);
        splicedArr.splice(1, 0, "b");
        setAppliedBooks(splicedArr);
        console.log(sortCollection());
        console.log(splicedArr);
        console.log("Array Spliced");
      } else {
        setAppliedBooks(sortCollection().filter((item) => item !== "b"));
        console.log("Render normal array");
      }
    } else {
      setAppliedBooks([]);
      console.log("Render empty array");
    }
  };

  const noteRequestHandler = (id) => {
    try {
      if (id || id === null) {
        setNoteRequest(id);
      } else {
        throw new Error("INVALID NOTE ID REQUEST");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  useEffect(() => {
    refetchBook();
  }, [bookUpdated, currentPg]);

  useEffect(() => {
    srcBook();
  }, [keywords]);

  useEffect(() => {
    displayProcessor();
  }, [currentGenre, currentSort, ufDisplay, fDisplay, favDisplay, allDisplay]);

  useEffect(() => {
    if (noteRequest) {
      navigate("/notePage");
    }
  }, [noteRequest]);

  const context = {
    currentPg: currentPg,
    currentPgHandler: currentPgHandler,
    previousPg: previousPg,
    previousPgHandler: previousPgHandler,
    editRequest: editRequest,
    editRequestHandler: editRequestHandler,
    noteRequest: noteRequest,
    noteRequestHandler: noteRequestHandler,
    keywords: keywords,
    onKeywordsChange: onKeywordsChange,
    bookUpdated: bookUpdated,
    bookUpdatedHandler: bookUpdatedHandler,
    currentGenre: currentGenre,
    currentGenreHandler: currentGenreHandler,
    currentSort: currentSort,
    currentSortHandler: currentSortHandler,
    appliedBooks: appliedBooks,
    srcDisplay: srcDisplay,
    genreScroll: genreScroll,
    allBooks: allDisplay,
    resetKeywordsHandler: resetKeywordsHandler,
  };

  return (
    <CtxManager.Provider value={context}>{props.children}</CtxManager.Provider>
  );
}

export default CtxManager;
