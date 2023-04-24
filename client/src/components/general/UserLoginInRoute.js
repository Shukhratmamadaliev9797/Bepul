import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Home from "../../pages/public/Home";

export default function UserLoginInRoute() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo ? <Outlet /> : <Home />;
}
