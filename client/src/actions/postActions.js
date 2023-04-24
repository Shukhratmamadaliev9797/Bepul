import axios from "axios";
import {
  POST_CATEGORIES_LIST_FAIL,
  POST_CATEGORIES_LIST_REQUEST,
  POST_CATEGORIES_LIST_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_THELATEST_LIST_FAIL,
  POST_THELATEST_LIST_REQUEST,
  POST_THELATEST_LIST_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_URGENT_LIST_FAIL,
  POST_URGENT_LIST_REQUEST,
  POST_URGENT_LIST_SUCCESS,
} from "../constants/postConstants";

export const createPost = (
  title,
  userId,
  poster,
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
) => {
  return async (dispatch, getState) => {
    dispatch({
      type: POST_CREATE_REQUEST,
      payload: {
        title,
        userId,
        poster,
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
        lng,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(`/api/posts/createPost`, {
        title,
        userId,
        poster,
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
        lng,
      });
      setTimeout(() => {
        dispatch({ type: POST_CREATE_SUCCESS, payload: data });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_CREATE_FAIL, payload: message });
    }
  };
};

export const listLatestPosts = () => {
  return async (dispatch) => {
    dispatch({ type: POST_THELATEST_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/posts/theLatestPosts`);

      dispatch({ type: POST_THELATEST_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_THELATEST_LIST_FAIL, payload: error.message });
    }
  };
};

export const listUrgentPosts = () => {
  return async (dispatch) => {
    dispatch({ type: POST_URGENT_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/posts/UrgentPosts`);

      dispatch({ type: POST_URGENT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_URGENT_LIST_FAIL, payload: error.message });
    }
  };
};

export const listPosts = ({
  title = "",
  category = "",
  user = "",
  pageNumber = "",
  pageSize = "",
}) => {
  return async (dispatch) => {
    dispatch({ type: POST_LIST_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&title=${title}&category=${category}&user=${user}`
      );

      dispatch({ type: POST_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_LIST_FAIL, payload: error.message });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_DELETE_REQUEST, payload: postId });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.delete(`/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setTimeout(() => {
        dispatch({ type: POST_DELETE_SUCCESS, payload: data });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_DELETE_FAIL, payload: message });
    }
  };
};

export const updatePost = (
  postId,
  title,
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
) => {
  return async (dispatch, getState) => {
    dispatch({
      type: POST_UPDATE_REQUEST,
      payload: {
        title,
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
        lng,
      },
    });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.put(
        `/api/posts/${postId}`,
        {
          title,
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
          lng,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setTimeout(() => {
        dispatch({ type: POST_UPDATE_SUCCESS, payload: data });
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: POST_UPDATE_FAIL, payload: message });
    }
  };
};

export const detailsPost = (postId) => {
  return async (dispatch) => {
    dispatch({ type: POST_DETAILS_REQUEST, payload: postId });
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const categoriesPost = () => {
  return async (dispatch) => {
    dispatch({ type: POST_CATEGORIES_LIST_REQUEST });
    try {
      const { data } = await axios.get(`/api/posts/categories`);

      dispatch({ type: POST_CATEGORIES_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_CATEGORIES_LIST_FAIL, payload: error.message });
    }
  };
};
