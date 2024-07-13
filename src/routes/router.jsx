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
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Billing from "../pages/Billing";
import PaymentSuccess from "../pages/PaymentSuccess";


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
                path: "/:groupName",
                element: <Categories />
            },
            {
                path: "/:groupName/:category",
                element: <SubCategories />
            },
            {
                path: "/:groupName/:category/:subCategory",
                element: <ProductTypes />
            },
            {
                path: "/:groupName/:category/:subCategory/:productType/:gender",
                element: <Products />
            },
            {
                path: "/:productId/:color/:productType/:subCategory/:category/:groupName",
                element: <ProductDetails />
            },
            {
                path: "/billing",
                element: <Billing />
            },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
        ]
    }
])

export default router;