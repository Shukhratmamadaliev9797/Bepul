import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Login from "../../modals/public/Login";

function Navbar(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (userInfo) {
      setShow(false);
    }
  }, [userInfo]);

  return (
    <>
      <Login show={show} onHide={handleClose} />
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__logo">
            <Link to="/">
              <img src="/images/B-yellow.png" alt="Logo" />
              <span>epul</span>
            </Link>
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
            {userInfo ? (
              <li>
                <NavLink to="/profile" className="navbar__profileLink">
                  <i className="fa-regular fa-user"></i> {userInfo.firstName}
                </NavLink>
              </li>
            ) : (
              <li className="navbar__login">
                <button onClick={handleShow} className="navbar__login">
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
