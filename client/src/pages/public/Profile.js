import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/general/Loader";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [about, setAbout] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [image, setImage] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingUser, error: errorUser, user } = userDetails;

  const updateProfile = useSelector((state) => state.updateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    successUpdateMessage,
  } = updateProfile;

  const notifyError = (message) => toast.error(message);
  const notifySuccessUpdate = (message) => toast.success(message);

  useEffect(() => {
    document.title = "Profile";
    if (!user || successUpdate) {
      dispatch(detailsUser(userInfo._id));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setAbout(user.about);
      setCity(user.city);
      setPostcode(user.postcode);
      setImage(user.image);
    }
    if (successUpdate) {
      setUpdateStatus(true);
      notifySuccessUpdate(successUpdateMessage);
    }
    if (errorUpdate || errorUser || errorUpload) {
      notifyError(errorUpdate || errorUser || errorUpload);
    }
  }, [
    dispatch,
    user,
    userInfo,
    successUpdate,
    updateStatus,
    successUpdateMessage,
    errorUpdate,
    errorUpload,
    errorUser,
  ]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const submitHanlder = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      notifyError("Password doesn't match, please check");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          postcode,
          image,
          about,
          newPassword,
        })
      );
    }
  };

  return (
    <>
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
      {loadingUser ? (
        <div className="profileEdit__loader">
          <Loader height={90} />
        </div>
      ) : (
        <div className="profileEdit">
          <div className="profileEdit__title">
            <h3>Edit Profile</h3>
          </div>
          <form onSubmit={submitHanlder}>
            <div className="profileEdit__inputBox2">
              <div>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="profileEdit__inputBox2">
              <div>
                <label htmlFor="">Email Address</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="profileEdit__inputBox1">
              <div>
                <label htmlFor="">Address</label>
                <input
                  type="addresss"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="profileEdit__inputBox2">
              <div>
                <label htmlFor="">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Postal Code</label>
                <input
                  type="text"
                  placeholder="Postcode"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="profileEdit__inputBox1">
              <div>
                <label htmlFor="">About Me</label>
                <textarea
                  cols={20}
                  rows={6}
                  type="text"
                  placeholder="About Myself"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="profileEdit__inputBox1">
              <div>
                <label htmlFor="">Upload Image</label>
                <input
                  type="file"
                  placeholder="About Myself"
                  onChange={uploadImageHandler}
                />
              </div>
            </div>
            <div className="profileEdit__inputBox2">
              <div>
                <label htmlFor="">New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="profileEdit__button">
              <button type="submit">
                {loadingUpdate ? (
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
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
