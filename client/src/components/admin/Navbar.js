import React from "react";

export default function Navbar() {
  return (
    <div className="adminNavbar">
      <div className="adminNavbar__container">
        <ul>
          <li>
            <i class="icon fas fa-sun"></i>
          </li>
          <li>
            <i class="icon fas fa-bell"></i>
          </li>
          <li>
            <img src="/images/about.png" alt="img" />
          </li>
        </ul>
      </div>
    </div>
  );
}
