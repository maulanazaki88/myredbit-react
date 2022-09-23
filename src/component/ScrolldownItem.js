import React from "react";
import c from "./ScrolldownItem.module.css";

function ScrolldownItem(props) {
  return (
    <div
      id={c["scrolldownItem"]}
      className={c.scrolldownItem}
      onClick={() => props.changeGenre(props.genre)}
    >
      {props.genre}
    </div>
  );
}

export default ScrolldownItem;
