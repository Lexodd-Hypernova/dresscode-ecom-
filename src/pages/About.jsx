import React from 'react';
import Hero from '../components/about/Hero';
import LatestProduct from "../components/about/LatestProduct";
import AboutUs from "../components/about/AboutUs";
import Choose from "../components/about/Choose";
import OurServices from '../components/about/OurServices';
import OurProducts from '../components/about/OurProducts';
import Blog from "../components/blog/Blog";
import { Helmet } from "react-helmet-async";


function About() {
    return (

        <>
            <Helmet>
                <title>About Us | DressCode - Uniform Experts for Schools, Healthcare & Offices</title>
                <meta name="description" content="At Dresscode Online Store, we specialize in high-quality school uniforms, medical scrubs, and corporate attire. Providing custom uniform solutions for schools, hospitals, and businesses across India" />
            </Helmet>
            <div className='page__Wrap'>
                <Hero />
                <LatestProduct />
                <AboutUs />
                <Choose />
                <OurServices />
                <OurProducts />
                <Blog />
            </div>
        </>
    )
}

export default About