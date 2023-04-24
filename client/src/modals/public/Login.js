import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, signIn } from "../../actions/userActions";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

export default function Login({ show, handleClose, ...props }) {
  const [firstNameRegister, setFirstNameRegister] = useState("");
  const [lastNameRegister, setLastNameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [phoneRegister, setPhoneRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [doestMatch, setDoesntMatch] = useState(false);

  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSigIn, setPasswordSigIn] = useState("");
  const [loginRegister, setLoginRegister] = useState(true);
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    userInfo: Register,
    loading: registerLoading,
    error: registerError,
  } = userRegister;

  const notifyError = (message) => toast.error(message);
  useEffect(() => {
    if (error || registerError) {
      notifyError(error || registerError);
    }
  }, [error, registerError]);

  const submitLoginHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(emailSignIn.toLowerCase(), passwordSigIn));
  };

  const submitRegisterHandler = (e) => {
    e.preventDefault();
    if (passwordRegister !== passwordConfirm) {
      setDoesntMatch(true);
    } else {
      dispatch(
        register(
          firstNameRegister,
          lastNameRegister,
          emailRegister.toLowerCase(),
          phoneRegister,
          passwordRegister
        )
      );
    }
  };

  return (
    <div>
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
      <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
        {loginRegister ? (
          <div className="loginModal__box">
            <h2>Welcome Back!</h2>
            <form onSubmit={submitLoginHandler}>
              <input
                type="email"
                placeholder="Your Email"
                required
                value={emailSignIn}
                onChange={(e) => setEmailSignIn(e.target.value)}
              />
              <input
                type="password"
                placeholder="Your Password"
                required
                value={passwordSigIn}
                onChange={(e) => setPasswordSigIn(e.target.value)}
              />
              <Link>Forgot Password</Link>
              <button>
                {loading ? (
                  <Oval
                    height={20}
                    width={20}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : (
                  "Sign In"
                )}
              </button>
              <div>{error ? error : ""}</div>
            </form>
            <div>
              Not registered yet?{" "}
              <button onClick={() => setLoginRegister(false)}>Sign Up</button>
            </div>
          </div>
        ) : (
          <div className="loginModal__box">
            <h2>Welcome to Eaturkish!</h2>
            <form onSubmit={submitRegisterHandler}>
              <input
                type="text"
                placeholder="Your First Name"
                required
                value={firstNameRegister}
                onChange={(e) => setFirstNameRegister(e.target.value)}
              />
              <input
                type="text"
                placeholder="Your Last Name"
                required
                value={lastNameRegister}
                onChange={(e) => setLastNameRegister(e.target.value)}
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
              />
              <input
                type="phone"
                placeholder="Your Phone"
                required
                value={phoneRegister}
                onChange={(e) => setPhoneRegister(e.target.value)}
              />
              <input
                type="password"
                placeholder="Your Password"
                required
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Your Password"
                required
                value={passwordConfirm}
                onChange={(e) => setpasswordConfirm(e.target.value)}
              />
              {doestMatch ? (
                <div className="loginModal__error">Password does not match</div>
              ) : (
                ""
              )}

              <button type="submit">
                {registerLoading ? (
                  <Oval
                    height={20}
                    width={20}
                    color="#fff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
              <div>{registerError ? registerError : ""}</div>
            </form>
            <div>
              Already have an account?{" "}
              <button onClick={() => setLoginRegister(true)}>Sign In</button>
            </div>
          </div>
        )}
      </Offcanvas>
    </div>
  );
}
