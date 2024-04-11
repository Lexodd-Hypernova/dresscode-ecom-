import React from "react";
import '../index.css';
import Arrow from '../assets/arrow.svg';

const Footer = () => {
  return (
    <div className="container">
      <div className="row1">
        <a href="#">SHIRTS</a>
        <a href="#">PANTS</a>
        <a href="#">APRONS</a>
        <a href="#">SOCKS</a>
        <a href="#">SHOES</a>
        <a href="#">DOCTOR APRONS</a>
      </div>
      <div className="row2">
            <div className="contact-sec-one section">
                <div className="regards regards-one">
                    <p>KEEP IN</p>
                    <img src={Arrow} alt="Keep in touch" />
                </div>
                <div className="regards regards-two">
                    <p>TOUCH</p>
                </div>
            </div>
            <div className="contact-sec-two section">
                <div className="contact">
                    <div className="contact-details">
                        <div className="head">
                            <h2>LOCATION</h2>
                        </div>
                        <div className="data">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, reiciendis.</p>
                        </div>
                        <div className="get-started">
                            <button>GET DIRECTIONS</button>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="contact-details">
                        <div className="head">
                            <h2>QUICK LINKS</h2>
                        </div>
                        <div className="data quick-links">
                            <a href="#">UNIFORMS</a>
                            <a href="#">NURSE APRONS</a>
                            <a href="#">DOCTOR APRONS</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-sec-three section">
                <div className="contact">
                    <div className="contact-details">
                        <div className="head">
                            <h2>CONTACT</h2>
                        </div>
                        <div className="data">
                            <p>98765432110</p>
                            <p>contact@dresscode.com</p>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="contact-details">
                        <div className="head">
                            <h2>STALK US</h2>
                        </div>
                        <div className="data quick-links">
                            <a href="#">INSTAGRAM</a>
                            <a href="#">FACEBOOK</a>
                            <a href="#">TWITTER</a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <div className="row3">
        <h3>DressCode</h3>
      </div>
    </div>
  );
};

export default Footer;
