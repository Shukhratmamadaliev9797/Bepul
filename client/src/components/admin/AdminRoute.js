import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo && userInfo.isAdmin ? (
    children
  ) : (
    <Navigate to="/admin/login" replace={true} />
  );
}
