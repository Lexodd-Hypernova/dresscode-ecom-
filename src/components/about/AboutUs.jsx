import React, { useEffect } from "react";
import "./about.css";

import Fade from "react-reveal/Fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutUs = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();

        tl.to(".abt_ttl-txt span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,
            stagger: {
                amount: 0.3,
            },
            scrollTrigger: {
                trigger: ".abt_ttl-txt span",
                start: "top 100%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });
        tl.to(".abt_Line span", 1.8, {
            width: "41%",
            ease: "power4.out",
            delay: 0.5,

            scrollTrigger: {
                trigger: ".abt_Line span",
                start: "top 100%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });
    }, []);

    return (
        <div className="about__Wrap">
            <div className="about__Sec">
                <div className="about__Ttl">
                    <div className="abt_ttl-txt">
                        <span>About Us</span>
                    </div>
                </div>
                <div className="abt_Line">
                    <span></span>
                </div>
                <div className="about__Row">
                    <div className="abt_Img">
                        <img src="assets/images/about.jpg" alt="about"></img>
                    </div>
                    <div className="abt_para abt_para1">
                        <Fade bottom duration={1000}>
                            <h3>Our Humble Beginnings</h3>
                            <p>
                                DressCode Elevating Excellence. Unparalleled quality,
                                innovation, and service tailored to your needs. Embark on a
                                journey with us for the finest in business attire.
                            </p>
                        </Fade>
                    </div>
                </div>
                <div className="about__Row about__Row2">
                    <div className="abt_para abt_para2">
                        <Fade bottom duration={1000}>
                            <h3>A Brand is Born</h3>
                            <p>
                                We are delighted to announce the launch of our new brand
                                Dresscode. to underscore our commitment to transformation and
                                your evolving expectations.
                            </p>
                        </Fade>
                        {/* <div className="abt_Cta">
              <button>
                <div className="arrow">
                  <img src="assets/images/arrow.png" alt="arrow"></img>
                </div>
                <span>Know More</span>
              </button>
            </div> */}
                    </div>
                    <div className="abt_para abt_para3">
                        <Fade bottom duration={1000}>
                            <h3>Elevate with DressCode</h3>
                            <p>
                                At DressCode, we redefine business attire with unmatched quality,
                                innovation, and personalized service. From school uniforms to
                                corporate wear, our products are designed for style,
                                comfort, and durability. Experience the future of
                                professional attire with DressCode.
                            </p>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
