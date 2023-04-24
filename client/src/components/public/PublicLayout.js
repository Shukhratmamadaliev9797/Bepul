import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  return (
    <div className="publicLayout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
