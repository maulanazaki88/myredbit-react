import React from "react";
import { Link } from "react-router-dom";
import c from "./LandingPage.module.css";

function LandingPage() {
  return (
    <>
      <div className={c.ldgWrp}>
        <div className={c.brandBig}>
          <p className={c.brandFB1}>Red</p>
          <p className={c.brandFB2}>Bit</p>
        </div>
        <article className={c.ldgDsc}>
          <h2 className={c.subTtl}>MY NEW READING HABIT</h2>
          <p className={c.ttlDsc}>
            Improve your reading quality by starts a new habit to taking notes
            the events, it's settings, the involved characters, the conflicts,
            the resolution, and more.
          </p>
        </article>
        <figure className={c.ldgFg}>
          <img
            className={c.ilus}
            src="/svg/SVG/pinkbook1.svg"
            alt="ilus-book"
          />
        </figure>
        <div className={c.btnWrp}>
          <Link className={c.regBtnLink} to="/registerPage">
            <button id={c["regBtn"]}>Register Book</button>
          </Link>

          <div>
            <figure className={c.ldgBkdrop}>
              <img
                className={c.bkdrop}
                src="/svg/SVG/pinkbook1.svg"
                alt="ilus-book"
              />
            </figure>
          </div>
        </div>
      </div>
      <div className={c.spacer}></div>
    </>
  );
}

export default LandingPage;
