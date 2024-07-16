import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Modify this logic based on your authentication mechanism

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
