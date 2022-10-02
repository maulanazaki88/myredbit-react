import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CtxManager from "../../store/CtxManager";
import Collection from "../../component/Collection";


function AllPage() {
  const navigate = useNavigate();
  const ctx = useContext(CtxManager);

  const prevPg = ctx.previousPg;
  const appliedBooks = ctx.appliedBooks;
  const genreScroll = ctx.genreScroll;
  const bookUpdated = ctx.bookUpdatedHandler;
  const currentGenre = ctx.currentGenre;
  const currentSort = ctx.currentSort;
  const changeGenreHandler = ctx.currentGenreHandler;
  const changeSortHandler = ctx.currentSortHandler;
  const currPgHandler = ctx.currentPgHandler;
  const prevPgHandler = ctx.previousPgHandler;
  const requestNoteHandler = ctx.noteRequestHandler;


  const editReqHandler = (id) => {
    ctx.editRequestHandler(id);

    navigate("/registerPage");
  };
  const backToPrevPg = () => {
    currPgHandler(prevPg);
    prevPgHandler("/");
    navigate(prevPg);
  };

  const kickedToHomeHandler = () => {
    currPgHandler("/");
    prevPgHandler("/");
    navigate("/");
  };

  const allCltnNB = {
    title: `All Books`,
    message: `You are currently do not have any books on your collection.`,
    guide: `Register Your Book Now!`,
    figure: false,
  };

  const { title, message, guide, figure } = allCltnNB;


  useEffect(() => {

    window.scrollTo(0, 0);

    return function cleanUp() {
      ctx.currentGenreHandler("All");
      ctx.currentSortHandler("-");
    };
  }, []);

 
    return (
      <Collection
        anyBook={appliedBooks[0] ? true : false}
        title={title}
        genreScroll={genreScroll}
        appliedBooks={appliedBooks}
        appliedBooksLength={appliedBooks.length}
        message={message}
        guide={guide}
        figure={figure}
        bookUpdated={(id, stat) => bookUpdated(id, stat)}
        editReqHandler={(id) => editReqHandler(id)}
        backToPrevPg={backToPrevPg}
        isFiltered={true}
        currentGenre={currentGenre}
        currentSort={currentSort}
        changeGenre={(genre) => changeGenreHandler(genre)}
        changeSort={(sort) => changeSortHandler(sort)}
        kickedToHome={kickedToHomeHandler}
        requestNote={(id) => requestNoteHandler(id)}
      />
    );
  }


export default AllPage;
