import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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
import GroupReview from "../pages/GroupReview";
import CustomerReviews from "../pages/CustomerReviews";
import PaymentSuccess from "../pages/PaymentSuccess";
import GetQuote from "../pages/GetQuote";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/:groupName",
        element: <Categories />,
      },
      {
        path: "/:groupName/:category",
        element: <SubCategories />,
      },
      {
        path: "/:groupName/:category/:subCategory",
        element: <ProductTypes />,
      },
      {
        path: "/:groupName/:category/:subCategory/:productType/:gender",
        element: <Products />,
      },
      {
        path: "/:productId/:color/:productType/:subCategory/:category/:groupName",
        element: <ProductDetails />,
      },
      {
        path: "/billing",
        element: (
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/getquote",
        element:
          (
            <ProtectedRoute>
              < GetQuote />
            </ProtectedRoute>
          )
      },
      {
        path: "/success",
        element:
          (
            <ProtectedRoute>
              < PaymentSuccess />
            </ProtectedRoute>
          )
      },
      {
        path: "/account-info",
        element: (
          <ProtectedRoute>
            <YourAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: "/get-user-info/:id",
        element: (
          <ProtectedRoute>
            <EditPersonalinfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/your-orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/your-address",
        element: (
          <ProtectedRoute>
            <YourAddress />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/group-review/:group/:productId",
        element: (
          <ProtectedRoute>
            <GroupReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/customer-review/:group/:productId",
        element: (
          <ProtectedRoute>
            <CustomerReviews />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthMain />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

export default router;
