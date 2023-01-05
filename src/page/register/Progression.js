import React from "react";
import c from './Progress.module.css';

export default function Progression(props) {
  return (
    <div className={c.progressWrp}>
      <div className={c.circle} id={c["cr1"]}>
        <div className={c.fill} id={c["f1"]}></div>
      </div>
      <div className={c.circle} id={c["cr2"]}>
        <div
          className={props.idxStages >= 2 ? c.fill : c.fillOff}
          id={c["f2"]}
        ></div>
      </div>
      <div className={c.circle} id={c["cr3"]}>
        <div
          className={props.idxStages >= 3 ? c.fill : c.fillOff}
          id={c["f3"]}
        ></div>
      </div>
      <div className={c.progressGroup}>
        <div className={c.progressBar}></div>
        <div
          id={c["progress"]}
          className={props.barStages}
          onAnimationEnd={props.onBarAnimEnd}
        ></div>
      </div>
    </div>
  );
}


