import React from "react";
import { Outlet } from "react-router-dom";
import c from "./NoLayout.module.css";

function NoLayout() {
  return (
    <div className={c.noLayout}>
      <Outlet />
    </div>
  );
}

export default NoLayout;
