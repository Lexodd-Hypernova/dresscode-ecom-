import React, { useContext, useEffect } from "react";
// import "../components/blog/blog.css";

import "../components/blog/blog.css";
// import Header from "../components/header/Header";
import BackArrow from "/assets/images/backArrow.svg";
import sharedContext from "../context/SharedContext";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
// import Footer from "../components/footer/Footer";
import { Helmet } from "react-helmet-async";

const BlogPage = () => {
    const { blogsData } = useContext(sharedContext);
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    // Add useEffect hook to scroll to the top of the page when location state changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleViewBlog = (data) => {
        const postTitleUrl = data.heading
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
            .replace(/\s+/g, "-"); // Replace spaces with hyphens

        navigate(`/blog/${postTitleUrl}`, { state: { data } });
    };

    return (
        <>
            <Helmet>
                <title>Uniform Trends & Workwear Insights | DressCode Blog</title>
                <meta name="description" content="Stay updated with the latest trends in corporate workwear, school uniforms, and healthcare scrubs. Explore expert tips on choosing the right uniforms for offices, hospitals, and educational institutions." />
            </Helmet>
            {/* <Header /> */}
            <div className="blog-sec">
                <div className="back" onClick={goBack}>
                    <img src={BackArrow} alt="Back Arrow" style={{ cursor: "pointer" }} />
                    <p>Back</p>
                </div>
                <div className="blogs-grid">
                    {blogsData.map((data, index) => (
                        <div
                            className="blog-cards-sec"
                            key={data.id}
                            onClick={() => handleViewBlog(data)}
                        >
                            <div className="blog-post">
                                <div className="blog-img">
                                    <img src={data?.img} alt="Blog Image" />
                                </div>
                                <div className="blog-title">
                                    <p className="title">{data?.heading}</p>
                                    <p className="view" onClick={() => handleViewBlog(data)}>
                                        View More
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default BlogPage;
