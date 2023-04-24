import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { POST_CREATE_RESET } from "../../constants/postConstants";
import { createPost } from "../../actions/postActions";
import Geocode from "react-geocode";

export default function AddPost() {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [urgent, setUrgent] = useState();
  const [condition, setCondition] = useState("");
  const [type, setType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [postcode, setPostcode] = useState("");
  const [description, setDescription] = useState("");
  const [loadingUpload1, setLoadingUpload1] = useState(false);
  const [loadingUpload2, setLoadingUpload2] = useState(false);
  const [loadingUpload3, setLoadingUpload3] = useState(false);
  const [loadingUpload4, setLoadingUpload4] = useState(false);
  const [errorUpload1, setErrorUpload1] = useState("");
  const [errorUpload2, setErrorUpload2] = useState("");
  const [errorUpload3, setErrorUpload3] = useState("");
  const [errorUpload4, setErrorUpload4] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: createLoading,
    error: createError,
    success: successCreate,
    successMessage,
  } = postCreate;

  const uploadImageHandler1 = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload1(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage1(data);
      setLoadingUpload1(false);
    } catch (error) {
      setErrorUpload1(error.message);
      setLoadingUpload1(false);
    }
  };
  const uploadImageHandler2 = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload2(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage2(data);
      setLoadingUpload2(false);
    } catch (error) {
      setErrorUpload2(error.message);
      setLoadingUpload2(false);
    }
  };
  const uploadImageHandler3 = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload3(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage3(data);
      setLoadingUpload3(false);
    } catch (error) {
      setErrorUpload3(error.message);
      setLoadingUpload3(false);
    }
  };
  const uploadImageHandler4 = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload4(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage4(data);
      setLoadingUpload4(false);
    } catch (error) {
      setErrorUpload4(error.message);
      setLoadingUpload4(false);
    }
  };

  Geocode.setApiKey("AIzaSyDyhUnZcPbVhD0XANlGwu3ONXoSbqDjAEw");

  const notifyError = (message) => toast.error(message);
  const notifySuccessCreate = (message) => toast.success(message);

  useEffect(() => {
    if (successCreate) {
      navigate("/profile/my-posts");
      dispatch({ type: POST_CREATE_RESET });
      notifySuccessCreate(successMessage);
    }
    if (
      createError ||
      errorUpload1 ||
      errorUpload2 ||
      errorUpload3 ||
      errorUpload4
    ) {
      notifyError(
        createError ||
          errorUpload1 ||
          errorUpload2 ||
          errorUpload3 ||
          errorUpload4
      );
    }
    if (postcode) {
      Geocode.fromAddress(postcode).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLat(lat);

          console.log(lat, lng, "here");
          setLng(lng);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [
    successCreate,
    navigate,
    dispatch,
    successMessage,
    createError,
    errorUpload1,
    errorUpload2,
    errorUpload3,
    errorUpload4,
    postcode,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createPost(
        title,
        userInfo._id,
        userInfo.firstName + " " + userInfo.lastName,
        image1,
        image2,
        image3,
        image4,
        category,
        urgent,
        condition,
        type,
        contactNumber,
        contactEmail,
        address,
        city,
        postcode,
        description,
        lat,
        lng
      )
    );
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
      <div className="profileEdit">
        <div className="profileEdit__title">
          <h3>Add New Post</h3>
        </div>
        <form onSubmit={submitHandler}>
          <div className="addPost__images">
            <div className="addPost__image">
              {loadingUpload1 ? (
                <Oval
                  height={40}
                  width={40}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : image1 ? (
                <img src={image1} alt="" />
              ) : (
                <i class="fa-regular fa-image addPost__image-icon"></i>
              )}
            </div>

            <div className="addPost__image">
              {loadingUpload2 ? (
                <Oval
                  height={40}
                  width={40}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : image2 ? (
                <img src={image2} alt="" />
              ) : (
                <i class="fa-regular fa-image addPost__image-icon"></i>
              )}
            </div>
            <div className="addPost__image">
              {loadingUpload3 ? (
                <Oval
                  height={40}
                  width={40}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : image3 ? (
                <img src={image3} alt="" />
              ) : (
                <i class="fa-regular fa-image addPost__image-icon"></i>
              )}
            </div>
            <div className="addPost__image">
              {loadingUpload4 ? (
                <Oval
                  height={40}
                  width={40}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : image4 ? (
                <img src={image4} alt="" />
              ) : (
                <i class="fa-regular fa-image addPost__image-icon"></i>
              )}
            </div>
          </div>
          <div className="profileEdit__inputBox1">
            <div>
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="addPost__inputBox4">
            <div>
              <label htmlFor="">Upload Image 1</label>
              <input
                type="file"
                placeholder="About Myself"
                onChange={uploadImageHandler1}
              />
            </div>
            <div>
              <label htmlFor="">Upload Image 2</label>
              <input
                type="file"
                placeholder="About Myself"
                onChange={uploadImageHandler2}
              />
            </div>
            <div>
              <label htmlFor="">Upload Image 3</label>
              <input
                type="file"
                placeholder="About Myself"
                onChange={uploadImageHandler3}
              />
            </div>
            <div>
              <label htmlFor="">Upload Image 4</label>
              <input
                type="file"
                placeholder="About Myself"
                onChange={uploadImageHandler4}
              />
            </div>
          </div>
          <div className="addPost__inputBox2">
            <div>
              <label htmlFor="">Category</label>
              <select
                name=""
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" selected hidden>
                  Choose Category
                </option>
                <option value="Construction">Construction</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothes</option>
                <option value="Beauty">Beauty</option>
                <option value="Education">Education</option>
                <option value="Computers">Computers</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Is It Urgent?</label>
              <select
                name=""
                id=""
                value={urgent}
                onChange={(e) => setUrgent(e.target.value)}
              >
                <option value="" selected hidden>
                  Choose Option
                </option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
          <div className="addPost__inputBox2">
            <div>
              <label htmlFor="">Condition</label>
              <select
                name=""
                id=""
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="" selected hidden>
                  Choose Condition
                </option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Fair">Fair</option>
                <option value="Old">Old</option>
                <option value="Need To Repair">Need To Repair</option>
              </select>
            </div>
            <div>
              <label htmlFor="">Type</label>
              <select
                name=""
                id=""
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" selected hidden>
                  Choose Type
                </option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
          <div className="profileEdit__inputBox2">
            <div>
              <label htmlFor="">Contact Number</label>
              <input
                type="tel"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Contact Email</label>
              <input
                type="email"
                placeholder="Contact Email"
                value={contactEmail}
                onChange={(e) => {
                  setContactEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="profileEdit__inputBox1">
            <div>
              <label htmlFor="">Address</label>
              <input
                type="text"
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
              <label htmlFor="">Description</label>
              <textarea
                cols={20}
                rows={6}
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="profileEdit__button">
            <button type="submit">
              {" "}
              {createLoading ? (
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
                "Add New Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
