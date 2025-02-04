import React, { useEffect } from "react";
import gsap from "gsap";
import "./hero.css";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
// import src from "../../../public/assets/js/background.js"

const Hero = () => {

    useEffect(() => {
        const MIN_SPEED = 0.5; //previously 2.5
        const MAX_SPEED = 1.5; //previously 3.5

        function randomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }

        class Blob {
            constructor(el) {
                this.el = el;
                const boundingRect = this.el.getBoundingClientRect();
                this.size = boundingRect.width;
                this.initialX = randomNumber(0, window.innerWidth - this.size);
                this.initialY = randomNumber(0, window.innerHeight - this.size);
                this.el.style.top = `${this.initialY}px`;
                this.el.style.left = `${this.initialX}px`;
                this.vx =
                    randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
                this.vy =
                    randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
                this.x = this.initialX;
                this.y = this.initialY;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x >= window.innerWidth - this.size) {
                    this.x = window.innerWidth - this.size;
                    this.vx *= -1;
                }
                if (this.y >= window.innerHeight - this.size) {
                    this.y = window.innerHeight - this.size;
                    this.vy *= -1;
                }
                if (this.x <= 0) {
                    this.x = 0;
                    this.vx *= -1;
                }
                if (this.y <= 0) {
                    this.y = 0;
                    this.vy *= -1;
                }
            }

            move() {
                this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY
                    }px)`;
            }
        }

        function initBlobs() {
            const blobEls = document.querySelectorAll(".bouncing-blob");
            const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

            function update() {
                requestAnimationFrame(update);
                blobs.forEach((blob) => {
                    blob.update();
                    blob.move();
                });
            }

            requestAnimationFrame(update);
        }

        initBlobs();
    }, []);

    // title text reveal
    useEffect(() => {
        const tl = gsap.timeline();

        tl.to(".hr_ttl-txt span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0.5,
            skewY: 0,
            stagger: {
                amount: 0.3,
            },
        });

        tl.to(".hr_ttl-para span", 1.8, {
            y: 0,
            ease: "power4.out",
            delay: 0,
            skewY: 0,
            stagger: {
                amount: 0.3,
            },
        });
    }, []);

    return (
        <>
            <div className="bouncing-blobs-container">
                <div className="bouncing-blobs-glass"></div>
                <div className="bouncing-blobs">
                    <div className="bouncing-blob bouncing-blob--purple"></div>
                    <div className="bouncing-blob bouncing-blob--blue"></div>
                </div>
            </div>

            <div className="hero__Wrap">
                <div className="hero__Sec">
                    <div className="hero__Ttl">
                        <div className="hr_ttl-txt">
                            <span>the</span>
                        </div>
                        <div className="hr_ttl-txt">
                            <span>future of</span>
                        </div>
                        <div className="hr_ttl-txt">
                            <span>uniform</span>
                        </div>
                        <div className="hr_ttl-txt">
                            <span>shopping</span>
                        </div>
                    </div>
                    <div className="sub_Hero">
                        <div className="hero__Para">
                            <div className="hr_ttl-para">
                                <span>The Uniform must last. We help you choose</span>
                            </div>
                            <div className="hr_ttl-para">
                                <span>the fabric from one of the leading garment</span>
                            </div>
                            <div className="hr_ttl-para">
                                <span>
                                    manufacturers of India like Benny, Sairam, Reliance, ...
                                </span>
                            </div>
                            {/* <Fade bottom delay={1000} duration={1000}></Fade> */}
                        </div>
                        <Link
                            to="/"
                            // target="_blank"
                            // href="https://ecom.dress-code.in/"
                            className="hero__Cta"
                        // rel="noopener noreferrer"
                        >
                            <div className="shop_Now-txt">
                                <Fade bottom delay={2000} duration={1000}>
                                    <span>Shop Now</span>
                                </Fade>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
