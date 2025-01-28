import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authSlice from "../features/auth/authSlice";
import blogSlice from "../features/blog/blogSlice";
import commentSlice from "../features/comments/commentSlice";

const store = configureStore(
    {
        reducer: {
            user: authSlice,
            blog: blogSlice,
            comment: commentSlice,
        },
    },
    applyMiddleware(thunk)
);

export default store;