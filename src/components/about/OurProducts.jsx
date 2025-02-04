import React, { useRef, useEffect } from "react";
import "./ourproducts.css";

import Fade from "react-reveal/Fade";
import { useInView } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

const OurProducts = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();
        tl.to(".or__Pr-ttl span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,
            stagger: {
                amount: 0.3,
            },
            scrollTrigger: {
                trigger: ".or__Pr-ttl span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });
        tl.to(".or_Pr-line span", 1.8, {
            width: "61%",
            ease: "power4.out",
            delay: 0.5,

            scrollTrigger: {
                trigger: ".or_Pr-line span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();
        tl.to(".int__Ttl-txt span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,
            stagger: {
                amount: 0.3,
            },
            scrollTrigger: {
                trigger: ".int__Ttl-txt span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true,
                // pin: true
            },
        });

        tl.to(".in__Line span", 1.8, {
            width: "53%",
            ease: "power4.out",
            delay: 0.5,

            scrollTrigger: {
                trigger: ".in__Line span",
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
        <div className="ourProduct__Wrap">
            <div className="ourProduct__Sec">
                <div className="ourProduct_Ttl">
                    <div className="or__Pr-ttl">
                        <span>Our Products</span>
                    </div>
                </div>
                <div className="or_Pr-line">
                    <span></span>
                </div>
                <div className="our_products" ref={ref}>
                    <div
                        className="or_prd-row or_prd-row1"
                        style={{
                            transform: isInView ? "rotate(-6deg)" : "none",
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }}
                    >
                        <div className="or_prd-col">
                            <div className="or_prd-img">
                                <img src="assets/images/shirt.png" alt="dresscode shirt" />
                            </div>
                            <div className="or_prd-cnt">
                                <h3>School Uniform</h3>
                                <div className="hl"></div>
                                <p>a large selection of school uniforms</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="or_prd-row or_prd-row2"
                        style={{
                            transform: isInView ? "rotate(6deg)" : "none",
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }}
                    >
                        <div className="or_prd-col">
                            <div className="or_prd-cnt">
                                <h3>Corporate Uniforms</h3>
                                <div className="hl"></div>
                                <p>Professional Presence, Seamless Unity</p>
                            </div>
                            <div className="or_prd-img">
                                <img
                                    src="assets/images/SuitUniform.png"
                                    alt="dresscode corporate"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="or_prd-row or_prd-row3"
                        style={{
                            transform: isInView ? "rotate(-6deg)" : "none",
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }}
                    >
                        <div className="or_prd-col">
                            <div className="or_prd-cnt">
                                <h3>Accessories</h3>
                                <div className="hl"></div>
                                <p> Elevate Your Style with Dresscode Accessoriess</p>
                            </div>
                            <div className="or_prd-img">
                                <img
                                    src="assets/images/school-shoe.png"
                                    alt="dresscode school shoe"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="or_prd-row or_prd-row4"
                        style={{
                            transform: isInView ? "rotate(6deg)" : "none",
                            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                        }}
                    >
                        <div className="or_prd-col">
                            <div className="or_prd-img">
                                <img src="assets/images/medicalicon.png" alt="medicalIcon" />
                            </div>
                            <div className="or_prd-cnt">
                                <h3>Medical wear</h3>
                                <div className="hl"></div>
                                <p>
                                    Exceptional Comfort, Uncompromising Quality in Medical Wear.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="interested__Sec">
                <div className="intr__Ttl">
                    <div className="in__Ttl">
                        <div className="int__Ttl-txt">
                            <span>Interested?</span>
                        </div>
                    </div>
                    <div className="in__Line">
                        <span></span>
                    </div>
                    <p>
                        Elevate your uniform experience with us, where quality and style
                        unite seamlessly. Explore our store today and find the perfect fit
                        for your unique needs.
                    </p>
                </div>
                <div className="intr__Str">
                    <div className="intr_str-cle">
                        <img src="assets/images/str_cle.png" alt="star" />
                    </div>
                    <Link
                        to="/"
                    // target="_blank"
                    // href="https://ecom.dress-code.in/"
                    // rel="noopener noreferrer"
                    >
                        Visit Store
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OurProducts;
