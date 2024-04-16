import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ApronsPage from "./pages/ApronsPage";
import CorporatePage from "./pages/CorporatePage";
import SkirtsPage from "./pages/SkirtsPage";
import PantsPage from "./pages/PantsPage";
import TrousersPage from "./pages/TrousersPage";
import AccessoriesPage from "./pages/AccesoriesPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index: true, element: <HomePage />},
            {path: "/aprons", element: <ApronsPage />},
            {path: "/corporate", element: <CorporatePage />},
            {path: "/skirts", element: <SkirtsPage />},
            {path: "/pants", element: <PantsPage />},
            {path: "/trousers", element: <TrousersPage />},
            {path: "/accessories", element: <AccessoriesPage />},
        ]
    }
]);

export default router;