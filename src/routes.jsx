import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Home from "./components/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/:category", element: <ProductPage /> },
            { path: "/productPage/:productId/:productName", element: <ProductDetailsPage /> },
        ]
    }
]);

export default router;