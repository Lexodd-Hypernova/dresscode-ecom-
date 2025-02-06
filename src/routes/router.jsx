import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Billing from "../pages/Billing";
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
import ProtectedRoute from "./ProtectedRoute";
import ComingSoon from "../components/ComingSoon";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import RaiseQuote from "../pages/RaiseQuote";
import QuoteSuccess from "../pages/QuoteSuccess";
import ProductListWithFilters from "../pages/ProductListWithFilters";
import PageNotFound from "../pages/404";
// import Schools from "../pages/Schools";
// import ProductsBySchool from "../pages/ProductsBySchool";
import ForgetPassword from "../components/auth/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword";
import TrumsyAuth from "../components/auth/TrumsyAuth";
import Coupons from "../pages/Coupons";
import About from "../pages/About";
import BlogPage from "../pages/BlogPage";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";

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
        path: "*",
        element: < PageNotFound />,
      },

      {
        path: "/coming-soon",
        element: <ComingSoon />,
      },

      {
        path: "/togs",
        element: <ComingSoon />,
      },

      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },

      {
        path: "/blogs",
        element: <BlogPage />,
      },

      {
        path: "/blog/:title",
        element: <BlogPost />,
      },

      // {
      //   path: "/all-schools",
      //   element: <Schools />,
      // },

      {
        path: "/third",
        element: <TrumsyAuth />,
      },



      {
        path: "/:groupName",
        element: <ProductListWithFilters />,
      },

      // {
      //   path: "/products/TOGS",
      //   element: <ComingSoon />,
      // },

      // {
      //   path: "/school-products/:schoolName",
      //   element: <ProductsBySchool />,
      // },

      // {
      //   path: "/:productId/:color/:productType/:subCategory/:category/:groupName",
      //   element: <ProductDetails />,
      // },


      {
        path: "/:groupName/:category/:subCategory/:color/:productId",
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
        path: "/raise-quote",
        element:
          (
            <ProtectedRoute>
              <RaiseQuote />
            </ProtectedRoute>
          )
      },
      {
        path: "/success",
        element:
          (
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          )
      },
      {
        path: "/coupons",
        element:
          (
            <ProtectedRoute>
              <Coupons />
            </ProtectedRoute>
          )
      },
      {
        path: "/quote-success",
        element:
          (
            <ProtectedRoute>
              <QuoteSuccess />
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
    path: "/login",
    element: <AuthMain />,
    children: [
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
  {
    path: "/register",
    element: <AuthMain />,
    children: [
      {
        path: "/register",
        element: <Register />,
      }
    ],
  },
  {
    path: "/forgot-password",
    element: <AuthMain />,
    children: [
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      }
    ],
  },
  {
    path: "/reset-password",
    element: <AuthMain />,
    children: [
      {
        path: "/reset-password",
        element: <ResetPassword />,
      }
    ],
  }
]);

export default router;
