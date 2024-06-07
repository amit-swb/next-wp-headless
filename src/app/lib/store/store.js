import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/postSlice";
import authReducer from "../slices/authSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            post: postReducer,
            auth: authReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
}

export const store = makeStore();