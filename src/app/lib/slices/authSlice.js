import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authServices";

const user = JSON.parse(localStorage.getItem("auth"));

// Auth Registration
export const AuthRegistration = createAsyncThunk(
    "auth/register",
    async ({ first_name, last_name, email_id, phone_number, password, toast, router }, thunkAPI) => {
        try {
            const response = await authService.authregister(first_name, last_name, email_id, phone_number, password);
            toast.success("Registation Successfully");
            // Delay the redirection by 1.5 seconds
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/Admin/Profile");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

// Auth Login
export const AuthLogin = createAsyncThunk(
    "auth/login",
    async ({ email_id, password, toast, router }, thunkAPI) => {
        try {
            const response = await authService.authlogin(email_id, password);
            toast.success("Login Successfully");
            // Delay the redirection by 1.5 seconds
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/Admin/Profile");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

export const authLogout = createAsyncThunk("auth/logout", async () => {
    await authService.authlogout();
});


const initialState = {
    isLoggedIn: user ? true : false,
    user: user ? user : null,
    error: "",
    loading: false,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state) => {
            localStorage.clear();
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AuthRegistration.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload;
                localStorage.setItem("auth", JSON.stringify(action.payload.data));
            })
            .addCase(AuthRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AuthLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload;
                localStorage.setItem("auth", JSON.stringify(action.payload.data.user));
            })
            .addCase(AuthLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(authLogout.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.removeItem("auth");
            })
    },
});


export default authSlice.reducer;