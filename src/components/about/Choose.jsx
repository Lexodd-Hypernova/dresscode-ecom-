import React, { useRef, useEffect } from "react";
import "./choose.css";

import Fade from "react-reveal/Fade";

import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

const Choose = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();

        tl.to(".ch_Tl-txt span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,

            stagger: {
                amount: 0.3,
            },
            scrollTrigger: {
                trigger: ".ch_Tl-txt span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });
    }, []);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div className="choose__Wrap">
            <div className="choose__Sec">
                <div className="choose__Ttl">
                    <div className="ch__Ttl-s">
                        <div className="ch_Tl-txt">
                            <span>Choose your</span>
                        </div>
                        <div className="ch_Tl-txt">
                            <span>Uniform</span>
                        </div>
                    </div>
                    <div className="ch_ln-wp" ref={ref}>
                        <span
                            className="ch_ln"
                            style={{
                                width: isInView ? "100%" : "64px",
                                transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) .5s",
                            }}
                        ></span>
                    </div>
                </div>
                <div className="choose__Card">
                    <Fade bottom duration={1000}>
                        <Link
                            to="/togs"
                            // target="_blank"
                            // href="https://ecom.dress-code.in/products/TOGS"
                            className="ch_Crd"
                            style={{ cursor: "pointer" }}
                        // rel="noopener noreferrer"
                        >
                            <div className="ch_bx-cnt">
                                <h4>Uniforms</h4>
                            </div>
                            <div className="ch_bx-img">
                                <img src="assets/images/uniform.png" alt="dresscode uniform" />
                            </div>
                        </Link>
                    </Fade>

                    {/* <Fade bottom delay={200} duration={1000}>
            <div className="ch_Crd" style={{ cursor: "pointer" }}>
              <div className="ch_bx-cnt ch_bx-cnt-bl">
                <h4>Accessories</h4>
              </div>
              <div className="ch_bx-img">
                <img src="assets/images/shoes.png" alt="dresscode shoes" />
              </div>
            </div>
          </Fade> */}
                    <Fade bottom delay={400} duration={1000}>
                        <Link
                            to="/elite"
                            // target="_blank"
                            // href="https://ecom.dress-code.in/products/ELITE"
                            className="ch_Crd"
                            style={{ cursor: "pointer" }}
                        // rel="noopener noreferrer"
                        >
                            <div className="ch_bx-cnt">
                                <h4>Corperate Uniforms</h4>
                            </div>
                            <div className="ch_bx-img">
                                <img src="assets/images/Corporate_uniform.png" alt="dresscode socks" />
                            </div>
                        </Link>
                    </Fade>
                    <Fade bottom delay={600} duration={1000}>
                        <Link
                            to="/heal"
                            // target="_blank"
                            // href="https://ecom.dress-code.in/products/HEAL"
                            className="ch_Crd"
                            style={{ cursor: "pointer" }}
                        // rel="noopener noreferrer"
                        >
                            <div className="ch_bx-cnt ch_bx-cnt-bl">
                                <h4>Medical Wear</h4>
                            </div>
                            <div className="ch_bx-img">
                                <img src="assets/images/medical-wear.png" alt="dresscode medical wear" />
                            </div>
                        </Link>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default Choose;
