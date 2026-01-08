import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import React from 'react'

const withauth = (WrappedComponent) => {
  return (props) => {
    // const isLoggedIn = false;
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return <WrappedComponent {...props} />;
  };
}
export default withauth
