import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/slice";

export function makeStore() {
    return configureStore({
        reducer: {
            post: postReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
}

export const store = makeStore();