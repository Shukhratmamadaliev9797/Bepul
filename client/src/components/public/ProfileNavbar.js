import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signout } from "../../actions/userActions";

export default function ProfileNavbar() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const postCreate = useSelector((state) => state.postCreate);
  const { success: successCreate, successMessage } = postCreate;

  const postUpdate = useSelector((state) => state.postUpdate);
  const { success: updateSuccess, successUpdateMessage } = postUpdate;
  const notifySuccessCreate = (message) => toast.success(message);
  const notifySuccessUpdate = (message) => toast.success(message);
  useEffect(() => {
    if (successCreate) {
      notifySuccessCreate(successMessage);
    }
    if (updateSuccess) {
      notifySuccessUpdate(successUpdateMessage);
    }
  }, [successCreate, successMessage, updateSuccess, successUpdateMessage]);

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };
  return (
    <div className="profileNavbar">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="snackbar"
      />
      <div className="profileNavbar__container">
        <div className="profileNavbar__title">
          <h3>My Dashboard</h3>
        </div>
        <div className="profileNavbar__img">
          <img
            src={userInfo.image ? userInfo.image : "/images/profile.png"}
            alt=""
          />
          <span>
            {userInfo.firstName} {userInfo.lastName}
          </span>
        </div>
        <ul>
          <li>
            <NavLink to="/profile">
              <i className="far fa-user"></i> <span>Edit Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/add-post">
              <i className="fa-solid fa-plus"></i> <span>Add Post</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/my-posts">
              <i className="far fa-gem"></i> <span>My Posts</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <i className="far fa-heart"></i> <span>My Favorite</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/messages">
              <i className="fas fa-inbox"></i> <span>My Inbox</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <i className="fas fa-shield-alt"></i> <span>Safety Tips</span>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <i className="fas fa-cog"></i> <span>Setting</span>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={signOutHandler}>
              <i className="fas fa-sign-out-alt"></i> <span>Log out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
