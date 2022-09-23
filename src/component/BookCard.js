import React from "react";
import c from "./BookCard.module.css";

function BookCard(props) {
  return (
    <>
      <div className={c.book} id={c[props._id]}>
        <div className={c.bookWrp}>
          <button
            className={c.editBtn}
            id={c["editBtn"]}
            onClick={() => props.editReqHandler(props._id)}
          >
            <img
              id={c["editIcon"]}
              src="/svg/SVG/edit-pink.svg"
              alt="edit"
              title="Edit Book Info"
            />
          </button>
          <figure className={c.bookCvr}>
            <img id={c["cvr"]} className={c.cvr} src={props.img} alt="cover" />
            <img
              id={c["bStatus"]}
              src={
                props.isFinished
                  ? "/pngs/finished-pink.png"
                  : "/pngs/continue-pink.png"
              }
              alt="unfinished"
              className={c.bStatus}
              title={props.isFinished ? "Finished Book" : "On-read Book"}
            />{" "}
            <img
              id={c["bFav"]}
              src={
                props.isFavorite
                  ? "/pngs/bookmark-gold.png"
                  : "/pngs/bookmarkOutline-gold.png"
              }
              alt="favorite"
              className={c.bFav}
              title="Toggle Favorite"
              onClick={() => props.editBook(props._id, "favorite")}
            />
          </figure>

          <article className={c.info}>
            <h3 id={c["title"]} className={c.title}>
              {props.title}
            </h3>
            <p id={c["category"]} className={c.category}>
              {props.genres}
            </p>
            <p id={c["date"]} className={c.date}>
              {props.date}
            </p>
            <p id={c["author"]} className={c.date}>
              {props.author}
            </p>
          </article>
          <div className={c.btnGroup}>
            <button
              id={c["continueBtn"]}
              className={c.bBtnT}
              type="button"
              onClick={() => props.requestNote(props._id)}
            >
              {props.isFinished ? "Notes" : "Continue"}
            </button>
            <button
              id={c["markFinishedBtn"]}
              className={c.bBtnB}
              type="button"
              onClick={() =>
                props.showPopUp(
                  props.title,
                  props._id,
                  props.isFinished ? "reread" : "finished"
                )
              }
            >
              {props.isFinished ? "Re-read Book" : "Mark as finished"}
            </button>
            <button
              id={c["deleteBtn"]}
              className={c.vbBtnB}
              type="button"
              onClick={() => props.showPopUp(props.title, props._id, "delete")}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
