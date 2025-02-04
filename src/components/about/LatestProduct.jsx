import React, { useRef, useEffect } from "react";
import "./latestProduct.css";

import Fade from "react-reveal/Fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useInView } from "framer-motion";
import { Link } from "react-router-dom";


const LatestProduct = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { marginTop: "80px", once: true });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();

        tl.to(".lt_ttl span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,

            stagger: {
                amount: 0.3,
            },
            scrollTrigger: {
                trigger: ".lt_ttl span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });
    }, []);

    return (
        <div className="latestProduct__Wrap">
            <div className="lt_Pr-sec">
                <div className="lt_pt-Ttl">
                    <div className="lt_txt-ttl">
                        <div className="lt_ttl">
                            <span>Latest</span>
                        </div>
                        <div className="lt_ttl">
                            <span>Products</span>
                        </div>
                    </div>
                    <div className="lt_pt-line" ref={ref}>
                        <span
                            className="lt_ln"
                            style={{
                                width: isInView ? "100%" : "64px",
                                transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
                            }}
                        ></span>
                    </div>
                </div>
                <div className="lt_Btm-row">
                    <div className="lt_para">
                        <h3>A Brand is Born</h3>
                        <p>
                            We are delighted to announce the<br></br>
                            launch of our new brand Dresscode to underscore our commitment to
                            transformation and your evolving expectations.
                        </p>
                    </div>
                    <div className="lt_Content">
                        <div className="lt_pr-Crl lt_pr-Crl1">
                            <Fade right duration={1000}>
                                <img src="assets/images/lt-pr1.png" alt="product"></img>
                            </Fade>
                        </div>
                        <div className="lt_pr-Crl lt_pr-Crl2">
                            <Fade right delay={500} duration={1000}>
                                <img src="assets/images/lt-pr2.png" alt="product"></img>
                            </Fade>
                        </div>
                        <Fade right delay={1000} duration={1000}>
                            <div className="lt_pr-halfCrl">
                                <Fade delay={1000} duration={1000}>
                                    <Link
                                        to="/"
                                    // target="_blank"
                                    // href="https://ecom.dress-code.in/"
                                    // rel="noopener noreferrer"
                                    >
                                        See All
                                    </Link>
                                </Fade>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LatestProduct;
