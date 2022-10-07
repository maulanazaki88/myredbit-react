import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import c from "./LastReadPage.module.css";

function LastReadPage() {
  return (
    <section className={c.lastReadPage}>
      <Parallax pages={2}>
        <ParallaxLayer  offset={1} speed={0.3}>
          <figure className={c.booksFig}>
            <img
              className={c.booksIlus}
              alt="books ilustration"
              title=""
              src="/svg/SVG/books1.svg"
            />
          </figure>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <figure className={c.headNclockFig}>
            <img
              className={c.headphoneIlus}
              alt="headphone ilustration"
              title=""
              src="/svg/SVG/headphone1.svg"
            />
            <img
              className={c.deskclockIlus}
              alt="deskclock ilustration"
              title=""
              src="/svg/SVG/deskclock1.svg"
            />
          </figure>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.8}>
          <figure className={c.phoneNcoffeeFig}>
            <img
              className={c.phoneIlus}
              alt="phone ilustration"
              title=""
              src="/svg/SVG/phone.svg"
            />
            <img
              className={c.coffeeIlus}
              alt="deskclock ilustration"
              title=""
              src="/svg/SVG/coffee3.svg"
            />
          </figure>
        </ParallaxLayer>
      </Parallax>
      <div className={c.table} ></div>
    </section>
  );
}

export default LastReadPage;
