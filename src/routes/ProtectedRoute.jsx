import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken"); // Modify this logic based on your authentication mechanism

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
