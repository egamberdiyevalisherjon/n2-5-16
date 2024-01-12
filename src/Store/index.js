import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/post";
import profileReducer from "./Slices/profile";
import userReducer from "./Slices/user";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    profile: profileReducer,
  },
});

export default store;
