import React from 'react';
import Hero from '../components/about/Hero';
import LatestProduct from "../components/about/LatestProduct";
import AboutUs from "../components/about/AboutUs";
import Choose from "../components/about/Choose";
import OurServices from '../components/about/OurServices';
import OurProducts from '../components/about/OurProducts';
import Blog from "../components/blog/Blog";


function About() {
    return (
        <div className='page__Wrap'>
            <Hero />
            <LatestProduct />
            <AboutUs />
            <Choose />
            <OurServices />
            <OurProducts />
            <Blog />
        </div>
    )
}

export default About