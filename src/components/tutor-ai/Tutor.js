import React, { useRef, useEffect } from "react";
import TutorBrain from "./TutorBrain";
import LogNav from "../LogNav.js";
import tip1 from "../../img/tip1.png";
import tip2 from "../../img/tip2.png";
import tip3 from "../../img/tip3.png";

export default function Tutor() {
  const textParagraph1 = useRef(null);
  const textParagraph2 = useRef(null);
  const textParagraph3 = useRef(null);

  useEffect(() => {
    // Set the initial width of the paragraphs
    textParagraph1.current.style.width = "14rem";
    textParagraph2.current.style.width = "14rem";
    textParagraph3.current.style.width = "14rem";
  }, []);

  const onClick1 = () => {
    if (textParagraph1.current.style.width === "14rem") {
      textParagraph1.current.style.width = "5rem";
    } else {
      textParagraph1.current.style.width = "14rem";
    }
  };

  const onClick2 = () => {
    if (textParagraph2.current.style.width === "14rem") {
      textParagraph2.current.style.width = "5rem";
    } else {
      textParagraph2.current.style.width = "14rem";
    }
  };

  const onClick3 = () => {
    if (textParagraph3.current.style.width === "14rem") {
      textParagraph3.current.style.width = "5rem";
    } else {
      textParagraph3.current.style.width = "14rem";
    }
  };

  return (
    <>
      <LogNav />
      <TutorBrain />
      <div className="tips-title-container">
        <h1 className="tips-title">How to use</h1>
      </div>
      <div className="tips-container">
        <img
          ref={textParagraph1}
          alt=""
          onClick={onClick1}
          className="tip1"
          src={tip1}
        ></img>
        <img
          ref={textParagraph2}
          alt=""
          onClick={onClick2}
          className="tip2"
          src={tip2}
        ></img>
        <img
          ref={textParagraph3}
          alt=""
          onClick={onClick3}
          className="tip3"
          src={tip3}
        ></img>
      </div>
    </>
  );
}
