import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import c from "./LandingPage.module.css";

function LandingPage() {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div className={c.ldgWrp}>
        <div className={c.ldgSect}>
          <section className={c.ldg_left}>
            <div className={c.brandBig}>
              <div className={c.brand_top}>
                <figure className={c.ldgFg}>
                  <img
                    className={c.logo}
                    src="/svg/SVG/pinkbook1.svg"
                    alt="ilus-book"
                  />
                </figure>
                <p className={c.brandFB1}>Red</p>
                <p className={c.brandFB2}>bit</p>
              </div>
              <div className={c.brand_bott}>
                <h2 className={c.subTtl}>MY NEW READING HABIT</h2>
              </div>
            </div>
            <article className={c.ldgDsc}>
              <p className={c.ttlDsc}>
                Improve your reading quality by starts a new habit to taking
                notes the events, it's settings, the involved characters, the
                conflicts, the resolution, and more.
              </p>
            </article>

            <div className={c.btnWrp}>
              <button
                className={isHover ? c.regBtnAnim : c.regBtn}
                onMouseOver={() => {
                  setIsHover(true);
                }}
                onMouseOut={() => {
                  setIsHover(false);
                }}
                onClick={() => {
                  navigate("/registerPage");
                }}
              >
                <div className={c.innerBtn}>Register Book</div>
              </button>
            </div>
          </section>
          <section className={c.ldg_right}>
            <figure className={c.ilusFig}>
              <img className={c.ilus} src="/svg/SVG/knowledge_1.svg" alt="ilustration" />
            </figure>
          </section>
        </div>
      </div>
      {/* <div className={c.spacer}></div> */}
    </>
  );
}

export default LandingPage;
