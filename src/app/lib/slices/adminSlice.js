import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authServices";

const admin =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("admin"))
    : null;

// Auth Registration
export const AuthRegistration = createAsyncThunk(
  "auth/register",
  async (
    { first_name, last_name, email_id, phone_number, password, router },
    thunkAPI
  ) => {
    try {
      const response = await authService.authregister(
        first_name,
        last_name,
        email_id,
        phone_number,
        password
      );
      // Delay the redirection by 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/Auth/Admin/Profile");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// Auth Login
export const AuthLogin = createAsyncThunk(
  "auth/login",
  async ({ email_id, password, router }, thunkAPI) => {
    try {
      const response = await authService.authlogin(email_id, password);
      // Delay the redirection by 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
  isLoggedIn: !!admin,
  admin: admin || null,
  error: "",
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.admin = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("admin");
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(AuthRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = { data: { user: action.payload } }; // Ensure direct assignment
        state.isLoggedIn = true;
        localStorage.setItem("admin", JSON.stringify(state.admin));
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
        state.admin = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("admin", JSON.stringify(action.payload));
      })
      .addCase(AuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.loading = false;
        localStorage.removeItem("admin");
        state.admin = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setUser, setLogout } = adminSlice.actions;

export default adminSlice.reducer;
