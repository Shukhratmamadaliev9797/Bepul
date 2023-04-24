import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import AdminLoading from "../admin/AdminLoading";
import { ToastContainer, toast } from "react-toastify";
export default function DashLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, error } = userSignIn;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  const notify = (message) => toast.error(message);
  useEffect(() => {
    if (error) {
      notify(error);
    }
  }, [navigate, error]);

  return (
    <div className="dashLogin">
      <ToastContainer
        position="top-center"
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

      <form className="dashLogin__form" onSubmit={submitHandler}>
        <div className="dashLogin__header">
          <i className="dashLogin__header-icon fas fa-users"></i>
          <h1>Admin Login</h1>
        </div>
        <div>{loading && <AdminLoading />}</div>
        <div className="dashLogin__body">
          <div className="dashLogin__inputBox">
            <label>Email</label>
            <input
              placeholder="Email address"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="dashLogin__inputBox">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="dashLogin__submitBox">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
