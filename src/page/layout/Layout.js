import React, { useContext, useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CtxManager from "../../store/CtxManager";
import c from "./Layout.module.css";

function Layout() {
  const ctx = useContext(CtxManager);
  const currPg = ctx.currentPg;
  const prevPg = ctx.previousPg;
  const currPgHandler = ctx.currentPgHandler;
  const prevPgHandler = ctx.previousPgHandler;
  const keywords = ctx.keywords;
  const onChange = ctx.onKeywordsChange;

  const srchInp = useRef();

  const [isMobile, setIsMobile] = useState(false);
  const [isInputMode, setIsInputMode] = useState(false);
  const [sideMenuOn, setSideMenuOn] = useState(false);

  const navigate = useNavigate();

  const jumpToAllBooks = () => {
    currPgHandler("/allPage");
    prevPgHandler(
      currPg !== "/allPage" && currPg !== "/favoritePage" ? currPg : prevPg
    );
    navigate("/allPage");
  };

  const jumpToFavBooks = () => {
    currPgHandler("/favoritePage");
    prevPgHandler(
      currPg !== "/allPage" && currPg !== "/favoritePage" ? currPg : prevPg
    );
    navigate("/favoritePage");
  };

  const enterInpMode = () => {
    setIsInputMode(true);
  };

  const closeInputMode = () => {
    setIsInputMode(false);
  };

  const enterMobileMode = () => {
    if (window.innerWidth <= 810) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const controlSideMenu = () => {
    if (sideMenuOn) {
      setSideMenuOn(false);
    } else {
      setSideMenuOn(true);
    }
  };

  useEffect(() => {
    if (isInputMode) {
      srchInp.current.focus();
    } else {
    }
  }, [isInputMode]);

  window.addEventListener("resize", () => enterMobileMode());

  useEffect(() => {
    if (window.innerWidth <= 810) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      <header id={c["header"]}>
        <div id={c["navCtn"]} className={c.navCtn}>
          <div id={c["navWrp"]} className={c.navWrp}>
            {isMobile ? (
              <>
                {!isInputMode ? (
                  <>
                    <section id={c["navLeft"]} className={c.nav_left}>
                      <div id={c["menuCtrl"]} className={c.menuCtrl}>
                        <button type="button" className={c.ctrlIcons}>
                          {sideMenuOn ? (
                            <img
                              id={c["closeMenu"]}
                              className={c.ctrlIcon}
                              src="/svg/SVG/back-white.svg"
                              alt="back"
                              title="close"
                              onClick={controlSideMenu}
                            />
                          ) : (
                            <img
                              id={c["dotMenu"]}
                              className={c.ctrlIcon}
                              src="/svg/SVG/menu-white.svg"
                              alt="dot"
                              title="menu"
                              onClick={controlSideMenu}
                            />
                          )}
                        </button>
                      </div>
                      <aside
                        id={c["sideMenu"]}
                        className={
                          sideMenuOn
                            ? c.sideMenu
                            : [c.sideMenu, c.SMOff].join(" ")
                        }
                      >
                        <div className={c.sideMenuWrp}>
                          <ul className={c.sideMenuList}>
                            <li
                              id={c["SMAllBooks"]}
                              className={c.sideMenuItems}
                              onClick={() => {jumpToAllBooks(); setSideMenuOn(false)}}
                            >
                              <img
                                className={c.mIcons}
                                src="/pngs/list-pink.png"
                                alt="list"
                              />
                              <h3 className={c.sideMenuItem}>All Books</h3>
                            </li>
                            <li
                              id={c["SMFavBooks"]}
                              className={c.sideMenuItems}
                              onClick={() => {jumpToFavBooks(); setSideMenuOn(false)}}
                            >
                              <img
                                className={c.mIcons}
                                src="/pngs/bookmark-gold.png"
                                alt="bookmark"
                              />
                              <h3 className={c.sideMenuItem}>Favorite Books</h3>
                            </li>
                          </ul>
                          <div className={c.sideMenuFooter}>
                            <section className={c.SMcpyrg}>
                              <div className={c.SMcpyrgWrp}>
                                <div className={c.SMbrandF}>
                                  <p className={c.SMbrandFF1}>Red</p>
                                  <p className={c.SMbrandFF2}>Bit</p>
                                </div>
                                <div className={c.SMcpyrgTxt}>
                                  Copyrights 2022 &copy; Maulana Zaki
                                </div>
                                <ul className={c.SMfIconList}>
                                  <li className={c.SMfIconItem}>
                                    <img
                                      className={c.SMfIcon}
                                      src="/pngs/facebook-white.png"
                                      alt="SMFacebook"
                                      title="Facebook"
                                    />
                                  </li>
                                  <li className={c.SMfIconItem}>
                                    <img
                                      className={c.SMfIcon}
                                      src="/pngs/gmail-white.png"
                                      alt="SMEmail"
                                      title="Email"
                                    />
                                  </li>
                                  <li className={c.SMfIconItem}>
                                    <img
                                      className={c.SMfIcon}
                                      src="/pngs/instagram-white.png"
                                      alt="SMInstagram"
                                      title="Instagram"
                                    />
                                  </li>
                                  <li className={c.SMfIconItem}>
                                    <img
                                      className={c.SMfIcon}
                                      src="/pngs/twitter-white.png"
                                      alt="Twitter"
                                      title="Twitter"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </section>
                          </div>
                        </div>
                      </aside>

                      <div id={c.backdrop} className={c.backdrop}></div>
                      <div className={c.brand}>
                        <p className={c.brandF1}>Red</p>
                        <p className={c.brandF2}>Bit</p>
                      </div>
                    </section>
                    <section id={c["navRight"]} className={c.nav_right}>
                      <button
                        id={c["srchBtn"]}
                        type="submit"
                        className={c.srchBtn}
                      >
                        <img
                          className={c.mobSrcIcon}
                          src="/svg/SVG/search-white.svg"
                          alt="search"
                          onClick={enterInpMode}
                        />
                      </button>
                    </section>
                  </>
                ) : (
                  <section id={c["navMid"]} className={c.nav_mid}>
                    <button id={c["inpBackBtn"]} className={c.inpBackBtn}>
                      <img
                        id={c["inpBackIcon"]}
                        className={c.ctrlIcon}
                        src="/svg/SVG/back-white.svg"
                        alt="back"
                        title="back"
                        onClick={closeInputMode}
                      />
                    </button>
                    <form className={c.srchForm}>
                      <input
                        id={c["srchInp"]}
                        className={c.srchInp}
                        type="text"
                        placeholder="Search book"
                        ref={srchInp}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        onBlur={closeInputMode}
                      />
                      <button
                        id={c["inpSrchBtn"]}
                        type="submit"
                        className={c.srchBtn}
                      >
                        <img
                          className={c.srcIcon}
                          src="/pngs/search-black.png"
                          alt="search"
                        />
                      </button>
                    </form>
                  </section>
                )}
              </>
            ) : (
              <>
                <section className={c.nav_left}>
                  <div className={c.brand}>
                    <p className={c.brandF1}>Red</p>
                    <p className={c.brandF2}>Bit</p>
                  </div>
                </section>
                <section className={c.nav_mid}>
                  <form className={c.srchForm}>
                    <input
                      id={c["srchInp"]}
                      className={c.srchInp}
                      type="text"
                      placeholder="Search book"
                      value={keywords}
                      onChange={(e) => onChange(e)}
                    />
                    <button
                      id={c["srchBtn"]}
                      type="submit"
                      className={c.srchBtn}
                    >
                      <img
                        className={c.srcIcon}
                        src="/pngs/search-black.png"
                        alt="search"
                      />
                    </button>
                  </form>
                </section>
                <section className={c.nav_right}>
                  <ul className={c.mList}>
                    <li
                      id={c["allPage"]}
                      className={
                        currPg === "/allPage" ? c.mItem_on : c.mItem_off
                      }
                      onClick={jumpToAllBooks}
                    >
                      <img
                        className={c.mIcons}
                        src="/pngs/list-pink.png"
                        alt="list"
                      />
                      <p className={c.mText}>All Books</p>
                    </li>
                    <li
                      id={c["favPage"]}
                      className={
                        currPg === "/favoritePage" ? c.mItem_on : c.mItem_off
                      }
                      onClick={jumpToFavBooks}
                    >
                      <img
                        className={c.mIcons}
                        src="/pngs/bookmark-gold.png"
                        alt="bookmark"
                      />
                      <p className={c.mText}>Favorites</p>
                    </li>
                  </ul>
                </section>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <div className={c.spacer}></div>
      <footer id={c["footer"]} className={c.ftr}>
        <div id={c["ftrCtn"]} className={c.ftrCtn}>
          <div className={c.ftrWrp}>
            <section className={c.ftrInf}>
              <div className={c.fInfWrp}>
                <ul className={c.fInfList}>
                  <li className={c.fInfHead}>
                    <p>Social Media</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>Facebook</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>Twitter</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>Instagram</p>
                  </li>
                </ul>
                <ul className={c.fInfList}>
                  <li className={c.fInfHead}>
                    <p>Contacts</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>maulanazaki88@gmail.com</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>(021)-10010001</p>
                  </li>
                </ul>
                <ul className={c.fInfList}>
                  <li className={c.fInfHead}>
                    <p>Resource</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>Team</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>GitHub</p>
                  </li>
                  <li className={c.fInfItem}>
                    <p className={c.fInfTxt}>Hiring</p>
                  </li>
                </ul>
              </div>
            </section>
            <section className={c.cpyrg}>
              <div className={c.cpyrgWrp}>
                <div className={c.brandF}>
                  <p className={c.brandFF1}>Red</p>
                  <p className={c.brandFF2}>Bit</p>
                </div>
                <div className={c.cpyrgTxt}>
                  Copyrights 2022 &copy; Maulana Zaki
                </div>
                <ul className={c.fIconList}>
                  <li className={c.fIconItem}>
                    <img
                      className={c.fIcon}
                      src="/pngs/facebook-white.png"
                      alt="Facebook"
                      title="Facebook"
                    />
                  </li>
                  <li className={c.fIconItem}>
                    <img
                      className={c.fIcon}
                      src="/pngs/gmail-white.png"
                      alt="Email"
                      title="Email"
                    />
                  </li>
                  <li className={c.fIconItem}>
                    <img
                      className={c.fIcon}
                      src="/pngs/instagram-white.png"
                      alt="Instagram"
                      title="Instagram"
                    />
                  </li>
                  <li className={c.fIconItem}>
                    <img
                      className={c.fIcon}
                      src="/pngs/twitter-white.png"
                      alt="Twitter"
                      title="Twitter"
                    />
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
