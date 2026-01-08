import React from "react";
import {Navigate, Outlet,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
const PublicRoute = () => {
  const { isLoggedIn, isAuthChecked,twostep } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  if (!isAuthChecked) {
    return null;
  }

//  if (twostep) {
//     return (
//       <Navigate
//         to="/2step"
//         replace
//         state={{ from: location }}
//       />
//     );
//   }
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }
  
  return <Outlet />;
};

export default PublicRoute;

