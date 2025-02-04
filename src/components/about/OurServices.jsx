import React, { useRef, useEffect } from 'react';
import "./ourservices.css";

import Fade from 'react-reveal/Fade';

import { useInView } from "framer-motion";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OurServices = () => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline();
        tl.to(".ser__Tl-txt span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,

            stagger: {
                amount: 0.3
            },
            scrollTrigger: {
                trigger: ".ser__Tl-txt span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true
                // pin: true
            }
        })

        tl.to(".ser_Line span", 1.8, {
            width: "58%",
            ease: "power4.out",
            delay: 0.5,

            scrollTrigger: {
                trigger: ".ser_Line span",
                start: "top 80%",
                end: "+=300",
                scrub: 1,
                // markers: true,
                once: true
                // pin: true
            }
        })
    }, []);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div className='ourService__Wrap'>
            <div className='ourService__Sec'>
                <div className='ser__Ttl'>
                    <div className='ser__Tl-txt'>
                        <span>Our Services</span>
                    </div>
                </div>
                <div className='ser_Line'>
                    <span></span>
                </div>
                <div className='or_Ser-card' ref={ref}>
                    <div className='or_sr-cd or_sr-cd1'>
                        <div className='or_sr-ovl or_sr-ovl1'
                            style={{
                                transform: isInView ? "translateY(0%)" : "translateY(-100%)",
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                            }}

                        ></div>
                        <div className='or_sr-cnt'
                            style={{
                                opacity: isInView ? "1" : "0",
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
                            }}
                        >
                            <h4>Choose Garment</h4>
                            <p>
                                "Smart Choices, Distinct Identity: Elevate
                                your school spirit with our meticulously
                                crafted uniforms, blending style, comfort,
                                and quality for an exceptional academic
                                experience."
                            </p>
                        </div>
                    </div>
                    <div className='or_sr-cd or_sr-cd2'>
                        <div className='or_sr-ovl or_sr-ovl2'
                            style={{
                                transform: isInView ? "translateY(0%)" : "translateY(100%)",
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                            }}
                        ></div>
                        <div className='or_sr-cnt'
                            style={{
                                opacity: isInView ? "1" : "0",
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
                            }}
                        >
                            <h4>Select Size</h4>
                            <p>
                                "Discover the Perfect Fit: School Uniforms
                                Available in a Range of Sizes. Choose
                                Comfort, Style, and Confidence for
                                Every Student."

                            </p>
                        </div>
                    </div>
                    <div className='or_sr-cd or_sr-cd3'>
                        <div className='or_sr-ovl or_sr-ovl3'
                            style={{
                                transform: isInView ? "translateY(0%)" : "translateY(-100%)",
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                            }}
                        ></div>
                        <div className='or_sr-cnt'
                            style={{
                                opacity: isInView ? "1" : "0",
                                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
                            }}
                        >
                            <h4>Order</h4>
                            <p>
                                "Order School Uniforms with Ease. Elevate
                                School Spirit, Quality, and Style. Your
                                One-Stop Shop for Customized School Attire."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurServices