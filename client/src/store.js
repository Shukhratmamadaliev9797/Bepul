import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  updateProfileReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducers,
  userSignInReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  postCategoriesReducer,
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postLatestListReducer,
  postListReducer,
  postUpdateReducer,
  postUrgentListReducer,
} from "./reducers/postReducers";
import {
  conversationCreateReducer,
  conversationListReducer,
} from "./reducers/conversationReducers";
import {
  messageCreateReducer,
  messageListReducer,
} from "./reducers/messageReducers";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducers = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducers,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  updateProfile: updateProfileReducer,
  postCreate: postCreateReducer,
  postList: postListReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
  postDetails: postDetailsReducer,
  postCategories: postCategoriesReducer,
  postLatest: postLatestListReducer,
  postUrgent: postUrgentListReducer,
  conversationList: conversationListReducer,
  conversationCreate: conversationCreateReducer,
  messageList: messageListReducer,
  messageCreate: messageCreateReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
