import React from 'react'
import c from "./LastReadPage.module.css"
import {Parallax, ParallaxLayer} from "@react-spring/parallax";

function LastReadPage(){
    return(
        <section className={c.lastreadPage} >
            <Parallax pages={1} >
                <ParallaxLayer offset={0} speed={0.3} >
                    <figure className={c.booksFig} >
                        <img className={c.booksIlus} alt="books ilustration" title='' src='/svg/SVG/books1.svg' />
                    </figure>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.5} >
                    <figure className={c.headNclockFig} >
                        <img className={c.headphoneIlus} alt="headphone ilustration" title='' src='/svg/SVG/headphone1.svg' />
                        <img className={c.deskclockIlus} alt="deskclock ilustration" title='' src='/svg/SVG/deskclock1.svg' />
                    </figure>
                </ParallaxLayer>
                <ParallaxLayer offset={0} speed={0.8} >
                    <figure className={c.phoneNcoffeeFig} >
                        <img className={c.phoneIlus} alt="phone ilustration" title='' src='/svg/SVG/phone.svg' />
                        <img className={c.coffeeIlus} alt="deskclock ilustration" title='' src='/svg/SVG/coffee3.svg' />
                    </figure>
                </ParallaxLayer>
            </Parallax>
        </section>
    )
}

export default LastReadPage