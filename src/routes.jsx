import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Home from "./components/Home/Home";
import SelectSchool from "./components/SelectSchool/SelectSchool";
import SelectByGender from "./components/selectGender/SelectByGender";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/selectSchool", element: <SelectSchool /> },
            { path: "/selectGender", element: <SelectByGender /> },
            { path: "/:category", element: <ProductPage /> },
            { path: "/productPage/:productId/:productName", element: <ProductDetailsPage /> },
        ]
    }
]);

export default router;