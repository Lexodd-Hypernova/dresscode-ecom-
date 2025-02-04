import React, { useEffect, useContext } from "react";
import "../components/blog/blog.css";
import BackArrow from "/assets/images/backArrow.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import sharedContext from "../context/SharedContext";

import { Helmet } from "react-helmet-async";
const BlogPost = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { clickedCardData } = location.state.data;

  const navigate = useNavigate();
  const { title } = useParams(); // Get the title from the URL
  const { blogsData } = useContext(sharedContext);
  const location = useLocation();

  // Find the blog post based on the URL title
  const clickedCardData = blogsData.find(
    (blog) => encodeURIComponent(blog.heading

      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-"))
      === title
  );

  // Add useEffect hook to scroll to the top of the page when location state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    return `${month} / ${day}`;
  };

  if (!clickedCardData) {
    return <div className="error">Blog post not found</div>;
  }

  const tipsArray = clickedCardData.bodyText.split(/\d+.\s/).filter((tip) => tip.trim() !== "");

  // Split the bodyText into an array of paragraphs
  // const tipsArray = clickedCardData?.bodyText
  //   .split(/\d+.\s/)
  //   .filter((tip) => tip.trim() !== "");

  return (
    <>
      <Helmet>
        <title>
          Dresscode Blog Post - Explore Office Wear, School Uniforms, and Custom
          Uniforms for Corporate, Healthcare, and Hospitality
        </title>
        <meta name="description" content="blog page of our website dresscode" />
        <meta
          name="keywords"
          content="Benefits of custom corporate uniforms,How to design a unique school uniform,Choosing the best healthcare uniforms,Office wear fashion tips,Importance of branded uniforms,How uniforms impact corporate identity,Tips for buying durable school uniforms,Uniform sustainability in the workplace, Best materials for office uniforms, Role of uniforms in the healthcare industry,School uniform buying guide for parents, Custom uniforms for corporate branding, How uniforms improve professionalism, Healthcare uniforms for doctors and nurses, Stylish workwear for office staff, How to maintain corporate uniforms, Why school uniforms are important,Tips for choosing the right hospital uniform, Corporate uniform design inspirations"
        />
      </Helmet>
      {/* <Header /> */}
      <div className="back" onClick={goBack}>
        <img src={BackArrow} alt="Back Arrow" style={{ cursor: "pointer" }} />
        <p>Back</p>
      </div>
      <div className="post-det">
        <div className="post-sec">
          <div className="post-head">
            <h2>{clickedCardData?.heading}</h2>
          </div>
          <div className="post-img">
            <img src={clickedCardData?.img} alt="clicked card data" />
          </div>
          <div className="post-content-area">
            <div className="post-date">
              <p>{formatDate(clickedCardData?.uploadDate)}</p>
              <span className="author">By Dresscode</span>
            </div>
            <div className="post-content">
              <p>
                {tipsArray.map((tip, index) => (
                  <p key={index} style={{ marginTop: "20px" }}>
                    {tip}
                  </p>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BlogPost;
