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
import Auth from "../components/auth/Auth";
import AuthMain from "../AuthMain";
import YourAccount from "../pages/YourAccount";
import EditPersonalinfo from "../pages/EditPersonalinfo";
import Orders from "../pages/Orders";
import YourAddress from "../pages/YourAddress";
import Cart from "../pages/Cart";
import WishList from "../pages/WishList";

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
                path: "/account-info",
                element: <YourAccount />
            },
            {
                path: "/get-user-info/:id",
                element: <EditPersonalinfo />
            },
            {
                path: "/your-orders",
                element: <Orders />
            },
            {
                path: "/your-address",
                element: <YourAddress />
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path: "/wishlist",
                element: <WishList />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthMain />,
        children: [
            {
                path: "/auth",
                element: <Auth />
            }
        ]
    }
])

export default router;
