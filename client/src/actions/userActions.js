import axios from "axios";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const register = (firstName, lastName, email, phone, password) => {
  return async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { firstName, lastName, email, phone, password },
    });
    try {
      const { data } = await axios.post("/api/users/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      setTimeout(() => {
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }, 1000);
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signIn = (email, password, keepSigned) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      setTimeout(() => {
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }, 1000);
    } catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_SIGNOUT });
  };
};

export const listUsers = ({ firstName = "" }) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      staffSignIn: { staffInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/users?firstName=${firstName}`, {
        headers: {
          Authorization: `Bearer ${staffInfo.token}`,
        },
      });
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_LIST_FAIL, payload: message });
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setTimeout(() => {
        dispatch({
          type: USER_DELETE_SUCCESS,
          payload: data,
        });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_DELETE_FAIL, payload: message });
    }
  };
};

export const updateUser = (
  userID,
  firstName,
  lastName,
  email,
  phone,
  address
) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
      payload: { firstName, lastName, email, phone, address },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/users/${userID}`,
        { firstName, lastName, email, phone, address },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
  };
};

export const detailsUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setTimeout(() => {
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      }, 2000);
    } catch (error) {
      const message =
        error.message && error.response?.data.message
          ? error.response.data?.message
          : error.message;
      dispatch({ type: USER_DETAILS_FAIL, payload: message });
    }
  };
};

export const updateUserProfile = ({
  userId,
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  postcode,
  image,
  about,
  password,
}) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
      payload: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postcode,
        image,
        about,
        password,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/users/profile/${userId}`,
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          postcode,
          image,
          about,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
  };
};
