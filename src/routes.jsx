import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <HomePage />},
            { path: "/:category", element: <ProductPage /> },
            { path: "/productPage/:productId/:productName", element: <ProductDetailsPage /> },
        ]
    }
]);

export default router;