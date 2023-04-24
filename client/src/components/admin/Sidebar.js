import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signout } from "../../actions/userActions";

export default function Sidebar() {
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(signout());
  };

  return (
    <div className="adminSidebar">
      <div className="adminSidebar__container">
        <div>
          <div className="adminSidebar__logo">
            <span>
              <i class="fas fa-database"></i>
            </span>
            Admin
          </div>
          <ul className="adminSidebar__menu">
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "adminSidebar__menu-active" : ""
                }
              >
                <i class="icon fas fa-chart-bar"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  isActive ? "adminSidebar__menu-active" : ""
                }
              >
                <i class="icon fab fa-microsoft"></i> Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/costumers"
                className={({ isActive }) =>
                  isActive ? "adminSidebar__menu-active" : ""
                }
              >
                <i class="icon fas fa-user-friends"></i> Costumers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive ? "adminSidebar__menu-active" : ""
                }
              >
                <i class="icon fas fa-tasks"></i> Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/sellers"
                className={({ isActive }) =>
                  isActive ? "adminSidebar__menu-active" : ""
                }
              >
                <i class="icon fas fa-users"></i> Sellers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/setting"
                className={({ isActive }) =>
                  isActive ? "adminSidebar__menu-active" : ""
                }
              >
                <i class="icon fas fa-cogs"></i> Setting
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="adminSidebar__logout">
          <button onClick={logoutHandler}>
            <i class="fas fa-sign-out-alt"></i> Log out
          </button>
        </div>
      </div>
    </div>
  );
}
