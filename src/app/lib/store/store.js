import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/postSlice";
import authReducer from "../slices/authSlice";
import companyReducer from "../slices/companySlice";

export function makeStore() {
    return configureStore({
        reducer: {
            post: postReducer,
            auth: authReducer,
            company: companyReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
}

export const store = makeStore();