import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="adminLayout">
        <div className="adminLayout__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
