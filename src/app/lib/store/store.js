import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/adminSlice";
import companyReducer from "../slices/companySlice";
import employeeReducer from "../slices/employeeSlice";
import hrReducer from "../slices/hrSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            admin: adminReducer,
            company: companyReducer,
            employee: employeeReducer,
            hr: hrReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
}

export const store = makeStore();