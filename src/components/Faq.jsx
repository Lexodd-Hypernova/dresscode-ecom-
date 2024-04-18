import React from "react";
import "./productDetails.css";
import Drop from "../assets/drop.svg"

const Faq = () => {
  return (
    <div>
        <div className="faq-sec">
            <div className="ques">
                <p>Lorem ipsum dolor sit amet.</p>
                <img src={Drop} alt="Open dropdown" />
            </div>
            <div className="ques">
                <p>Lorem ipsum dolor sit amet.</p>
                <img src={Drop} alt="Open dropdown" />
            </div>
            <div className="ques">
                <p>Lorem ipsum dolor sit amet.</p>
                <img src={Drop} alt="Open dropdown" />
            </div>
        </div>
    </div>
  );
};

export default Faq;
