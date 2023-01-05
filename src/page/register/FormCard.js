import React from "react";
import c from "./FormCard.module.css";

export default function FormCard(props) {
  return (
    <div className={c.formCard}>
      <div id={c["inpGroup1"]} className={c.inpGroup}>
        <label className={c.regLabel} htmlFor="title">
          {props.topLabel}
        </label>
        <input
          className={c.regInp}
          type={props.topInpType}
          name={props.topInpName}
          id={c[props.topInpName]}
          value={props.topVal}
          onChange={props.onChange}
          maxLength="40"
          placeholder="Type Here"
          required
        />
        <p id={c["ttlErr"]} className={c.errMessage}>
          {props.topAddressErr && props.topErrMsg}
        </p>
      </div>
      <div id={c["inpGroup1"]} className={c.inpGroup}>
        <label className={c.regLabel} htmlFor="genre">
          {props.botLabel}
        </label>
        <input
          className={c.regInp}
          type={props.botInpType}
          name={props.botInpName}
          id={c[props.botInpName]}
          value={props.botVal}
          onChange={props.onChange}
          placeholder="Type here"
          maxLength="40"
        />
        <p id={c["genErr"]} className={c.errMessage}>
          {props.botAddressErr && props.botErrMsg}
        </p>
      </div>
      <div className={c.formBtnGroup}>
        {props.enableBack && (
          <button
            type="button"
            className={c.regBack}
            id={c["autRlsBBtn"]}
            onClick={props.slideBack}
          >
            {props.enableBack && props.backTxt}
          </button>
        )}

        <button
          type="button"
          className={c.regNext}
          onClick={props.slideNext}
          id={c["titGenNBtn"]}
        >
          {props.nextTxt}
        </button>
      </div>
    </div>
  );
}
