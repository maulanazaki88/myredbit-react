import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CtxManager from "../../store/CtxManager";
import Collection from "../../component/Collection";


function SearchPage() {
  const navigate = useNavigate();
  const ctx = useContext(CtxManager);

  const prevPg = ctx.previousPg;
  const appliedBooks = ctx.srcDisplay;
  const genreScroll = ctx.genreScroll;
  const bookUpdated = ctx.bookUpdatedHandler;
  const keywords = ctx.keywords;
  const keywordsHandler = ctx.onKeywordsChange;
  const currPgHandler = ctx.currentPgHandler;
  const prevPgHandler = ctx.previousPgHandler;
  const resetKeywords = ctx.resetKeywordsHandler;
  const requestNoteHandler = ctx.noteRequestHandler;

  const [isLoading, setIsLoading] = useState(true);


  const editReqHandler = (id) => {
    ctx.editRequestHandler(id);

    navigate("/registerPage");
  };
  const backToPrevPg = () => {
    prevPgHandler("/");
    keywordsHandler("");
    currPgHandler(prevPg);
    navigate(prevPg);
  };

  const kickedToHomeHandler = () => {
    currPgHandler("/");
    prevPgHandler("/");
    navigate("/");
  };

  const srcCltnNB = {
    title: `Search Results`,
    message: `No result for "${keywords}"`,
    guide: `Try search books by another property such as author, genre, or year.`,
    figure: false,
  };

  const { title, message, guide, figure } = srcCltnNB;

  useEffect(() => {

    window.scrollTo(0, 0);
    return function cleanup() {
      resetKeywords();
      setIsLoading(true);
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


export default SearchPage;
