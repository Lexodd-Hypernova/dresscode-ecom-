import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import Layout from "../pages/Layout";
// import HomePage from "../pages/HomePage";
// import ProductPage from "../pages/ProductPage";
// import ProductDetailsPage from "../pages/ProductDetailsPage";
// import Home from "../components/Home/Home";
// import SelectSchool from "../components/SelectSchool/SelectSchool";
// import SelectByGender from "../components/selectGender/SelectByGender";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import SubCategories from "../pages/SubCategories";
import ProductTypes from "../pages/ProductTypes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "category/:groupName",
                element: <Categories />
            },
            {
                path: "subcategory/:groupName/:category",
                element: <SubCategories />
            },
            {
                path: "productType/:groupName/:category/:subCategory",
                element: <ProductTypes />
            },
        ]
    }
])

export default router;