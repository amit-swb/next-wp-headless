import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyAuthService from "../services/companyAuthService";

// Get the company token from localStorage if it exists and parse it
const company = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('companyToken')) : null;

// Company Auth Registration
export const CompanySignup = createAsyncThunk(
    "auth/company/register",
    async ({ company_name, email_id, password, toast, router }, thunkAPI) => {
        try {
            const response = await companyAuthService.authregister(company_name, email_id, password);
            toast.success("Company Registration Successfully");
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/Company/Profile");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
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
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/Company/Profile");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
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

// Get Single Company
export const getSingleCompany = createAsyncThunk(
    "company/getSingleCompany",
    async ({ id }, thunkApi) => {
        try {
            const response = await companyAuthService.singlecompany(id);
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// Company Update
export const companyUpdate = createAsyncThunk(
    "auth/company/update",
    async ({ company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id }, thunkAPI) => {
        try {
            const response = await companyAuthService.companyupdate(company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    isLoggedIn: !!company,
    company: company || null,
    allcompany: null,
    singlecompany: null,
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
            localStorage.removeItem("companyToken");
            state.company = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CompanySignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(CompanySignup.fulfilled, (state, action) => {
                state.loading = false;
                // state.company = action.payload;
                state.company = { ...state.company, user: action.payload };
                state.isLoggedIn = true;
                localStorage.setItem("companyToken", JSON.stringify(action.payload));
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
                state.isLoggedIn = true;
                localStorage.setItem("companyToken", JSON.stringify(action.payload));
            })
            .addCase(companyLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(companyLogout.fulfilled, (state) => {
                state.loading = false;
                localStorage.removeItem("companyToken");
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
            .addCase(getSingleCompany.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.singlecompany = action.payload;
            })
            .addCase(getSingleCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(companyUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(companyUpdate.fulfilled, (state, action) => {
                state.company.loading = false;
                state.company.user = action.payload;
                localStorage.setItem("companyToken", JSON.stringify(action.payload));
            })
            .addCase(companyUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser, setLogout } = companySlice.actions;

export default companySlice.reducer;
