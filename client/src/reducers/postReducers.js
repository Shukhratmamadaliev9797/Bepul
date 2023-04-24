import {
  POST_CATEGORIES_LIST_FAIL,
  POST_CATEGORIES_LIST_REQUEST,
  POST_CATEGORIES_LIST_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_RESET,
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
  POST_UPDATE_RESET,
  POST_UPDATE_SUCCESS,
  POST_URGENT_LIST_FAIL,
  POST_URGENT_LIST_REQUEST,
  POST_URGENT_LIST_SUCCESS,
} from "../constants/postConstants";

export const postCreateReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        successMessage: action.payload.message,
      };
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload.message };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        postLists: action.payload.posts,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postLatestListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_THELATEST_LIST_REQUEST:
      return { loading: true };
    case POST_THELATEST_LIST_SUCCESS:
      return {
        loading: false,
        postLists: action.payload,
      };
    case POST_THELATEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postUrgentListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_URGENT_LIST_REQUEST:
      return { loading: true };
    case POST_URGENT_LIST_SUCCESS:
      return {
        loading: false,
        postLists: action.payload,
      };
    case POST_URGENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        successDeleteMessage: action.payload.message,
      };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case POST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        successUpdateMessage: action.payload.message,
      };
    case POST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCategoriesReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case POST_CATEGORIES_LIST_REQUEST:
      return { loading: true };
    case POST_CATEGORIES_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case POST_CATEGORIES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
