import React from "react";
import { Outlet } from "react-router-dom";
import ProfileNavbar from "./ProfileNavbar";

export default function ProfileLayout() {
  return (
    <div className="profileLayout">
      <div className="profileLayout__header">
        <div className="profileLayout__header-content">
          <h1>My Dashboard</h1>
          <div>Home / Dashboard</div>
        </div>
      </div>
      <div className="profileLayout__container">
        <div className="profileLayout__nav">
          <ProfileNavbar />
        </div>
        <div className="profileLayout__outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
