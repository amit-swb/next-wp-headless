import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyAuthService from "../services/companyAuthService";

const company = JSON.parse(localStorage.getItem("company"));

// Company Auth Registration
export const CompanySignup = createAsyncThunk(
    "auth/company/register",
    async ({ company_name, email_id, password, toast, router }, thunkAPI) => {
        try {
            const response = await companyAuthService.authregister(company_name, email_id, password);
            toast.success("Company Registation Successfully");
            // Delay the redirection by 1.5 seconds
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/Company/Profile");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

// Company Auth Login
export const companyLogin = createAsyncThunk(
    "auth/company/login",
    async ({ email_id, password, toast, router }, thunkAPI) => {
        try {
            const response = await companyAuthService.authlogin(email_id, password);
            toast.success("Company Login Successfully");
            // Delay the redirection by 1.5 seconds
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/Company/Profile");
            console.log(response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }
    }
);

// Company Logout
export const companyLogout = createAsyncThunk("auth/logout", async () => {
    await companyAuthService.authlogout();
});

// Get All Company
export const getAllCompany = createAsyncThunk(
    "company/getAllCompany",
    async (_, thunkApi) => {
        try {
            const response = await companyAuthService.allcompany();
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


const initialState = {
    isLoggedIn: company ? true : false,
    company: company || null,
    allcompany: [],
    error: "",
    loading: false,
};


const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.company = action.payload;
        },
        setLogout: (state) => {
            localStorage.clear();
            state.company = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CompanySignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(CompanySignup.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
                localStorage.setItem("companyTocken", JSON.stringify(action.payload.data));
            })
            .addCase(CompanySignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(companyLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(companyLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
                localStorage.setItem("companyTocken", JSON.stringify(action.payload.data));
            })
            .addCase(companyLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(companyLogout.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.removeItem("companyTocken");
                state.company = null;
                state.isLoggedIn = false;
            })
            .addCase(getAllCompany.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.allcompany = action.payload;
            })
            .addCase(getAllCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export default companySlice.reducer;