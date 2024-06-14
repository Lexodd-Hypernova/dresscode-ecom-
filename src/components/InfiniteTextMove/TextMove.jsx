import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import "./textMove.css";

const TextMove = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: e => direction = e.direction * -1
            },
            x: "-500px",
        })
        requestAnimationFrame(animate);
    }, [])

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        }
        else if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstText.current, { xPercent: xPercent })
        gsap.set(secondText.current, { xPercent: xPercent })
        requestAnimationFrame(animate);
        xPercent += 0.1 * direction;
    }

    return (
        <section className="text__Move-main">
            <div className="text__sliderContainer">
                <div ref={slider} className="text__Slider">
                    <p ref={firstText}>All Uniforms </p>
                    <p ref={secondText}>All Uniforms </p>
                </div>
            </div>
        </section>
    )
}

export default TextMove