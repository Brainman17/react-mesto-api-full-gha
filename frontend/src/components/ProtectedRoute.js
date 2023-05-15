import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({ isLoggedIn, element }) {
  return isLoggedIn ? element : <Navigate to="/sign-in" />;
}

export default ProtectedRouteElement;
