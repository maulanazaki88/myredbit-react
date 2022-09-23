import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CtxManager from "../../store/CtxManager";
import Collection from "../../component/Collection";

function FavoritePage() {
  const navigate = useNavigate();
  const ctx = useContext(CtxManager);

  const prevPg = ctx.previousPg;
  const appliedBooks = ctx.appliedBooks;
  const genreScroll = ctx.genreScroll;
  const bookUpdated = ctx.bookUpdatedHandler;
  const currPgHandler = ctx.currentPgHandler;
  const prevPgHandler = ctx.previousPgHandler;
  const requestNoteHandler = ctx.noteRequest;

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

  const favCltnNB = {
    title: `Favorite Books`,
    message: `You are currently do not have favorite books from your collection.`,
    guide: `To set a book to favorite, click Toggle Favorite Button on top-right the book cover.`,
    figure: false,
  };

  const { title, message, guide, figure } = favCltnNB;

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
      backToPrevPg={() => backToPrevPg()}
      isFiltered={false}
      kickedToHome={kickedToHomeHandler}
      requestNote={(id) => requestNoteHandler(id)}
    />
  );
}

export default FavoritePage;
