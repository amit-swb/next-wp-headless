import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/postSlice";
import adminReducer from "../slices/adminSlice";
import companyReducer from "../slices/companySlice";
import employeeReducer from "../slices/employeeSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            post: postReducer,
            admin: adminReducer,
            company: companyReducer,
            employee: employeeReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
}

export const store = makeStore();