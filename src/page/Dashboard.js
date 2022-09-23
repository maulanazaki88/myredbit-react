import React, { useEffect } from "react";
import LandingPage from "./LandingPage";
import BookPage from "./BookPage";
import c from "./Dashboard.module.css";

function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={c.main}>
      <LandingPage />
      <BookPage />
    </main>
  );
}

export default Dashboard;
