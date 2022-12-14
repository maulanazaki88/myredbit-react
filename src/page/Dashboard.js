import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import BookPage from "./BookPage";
import { useLottie } from "lottie-react";
import loadingAnimation from "../animation/loading.json";
import { ParallaxProvider } from "react-scroll-parallax";
import LastReadPage from "./LastReadPage";

import c from "./Dashboard.module.css";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
        console.log("LOADING FINISHED");
      }, 200);
    }
    return function cleanUp() {
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadingOptions = {
    animationData: loadingAnimation,
    loop: true,
  };

  const { View } = useLottie(loadingOptions);

  if (isLoading) {
    return (
      <div className={c.main}>
        <div className={c.loadingAnimation}>{View}</div>
      </div>
    );
  } else {
    return (
      <ParallaxProvider>
        <div className={c.main}>
          <LandingPage />
          <LastReadPage />
          <BookPage />
        </div>
      </ParallaxProvider>
    );
  }
}

export default Dashboard;
