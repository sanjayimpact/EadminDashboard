import React from "react";
import { Navigate,Outlet,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {



  const { isLoggedIn, isAuthChecked,twostep } = useSelector(
    (state) => state.auth
  );
    const location = useLocation();
    
  if (!isAuthChecked) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

