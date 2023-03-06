import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <img src="/images/B-yellow.png" alt="Logo" />
          <span>epul</span>
        </div>
        <ul className="navbar__menu">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="">About</Link>
          </li>
          <li>
            <Link to="">Categories</Link>
          </li>
          <li>
            <Link to="">Posts</Link>
          </li>
          <li>
            <Link to="">Contact</Link>
          </li>
          <li>
            <Link className="navbar__login" to="">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
