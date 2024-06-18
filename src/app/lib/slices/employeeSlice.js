import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../services/employeeService";

// Get the employee token from localStorage if it exists and parse it
const employee = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employeeToken')) : null;

// employee Auth Registration
export const EmployeeSignup = createAsyncThunk(
    "auth/employee/register",
    async ({ first_Name,
        last_name,
        middle_Name,
        date_of_birth,
        email_id,
        password,
        mobile_number,
        alternate_number,
        father_number,
        mother_number,
        current_address,
        permanent_address,
        designation,
        date_of_joining,
        company_id,
        employee_id, router }, thunkAPI) => {
        try {
            const response = await employeeService.employeeregister(first_Name,
                last_name,
                middle_Name,
                date_of_birth,
                email_id,
                password,
                mobile_number,
                alternate_number,
                father_number,
                mother_number,
                current_address,
                permanent_address,
                designation,
                date_of_joining,
                company_id,
                employee_id);
            await new Promise(resolve => setTimeout(resolve, 1500));
            // router.push("/Auth/Employee/Profile");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// employee Auth Login
export const EmployeeLogin = createAsyncThunk(
    "auth/employee/login",
    async ({ email_id, password, router }, thunkAPI) => {
        try {
            const response = await employeeService.employeelogin(email_id, password);
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push("/Auth/employee/Profile");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Company Logout
export const employeeLogout = createAsyncThunk("auth/logout", async () => {
    await employeeService.employeelogout();
});


// getEmployeesbyID
export const getEmployeesbyID = createAsyncThunk(
    "employee/getEmployeesbyID",
    async ({ companyID }, thunkApi) => {
        try {
            const response = await employeeService.employeesbyID(companyID);
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);


// Company Update
export const employeeUpdate = createAsyncThunk(
    "auth/employee/update",
    async ({ company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id }, thunkAPI) => {
        try {
            const response = await employeeService.employeeupdate(company_name, company_website_url, industry_business_location, company_address, country, city, zip_code, mobile_number, phone_number, contact_person, time_zone, date_format, company_number, company_tax_id, _id);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    // isLoggedIn: !!employee,
    employee: employee || { user: null },
    allemployeesbyID: null,
    error: "",
    loading: false,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setEmployee: (state, action) => {
            state.employee.user = action.payload;
        },
        setLogout: (state) => {
            // localStorage.removeItem("employeeToken");
            state.employee = { user: null };
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(EmployeeSignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(EmployeeSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.employee.user = action.payload;
                // state.isLoggedIn = true;
                // localStorage.setItem("employeeToken", JSON.stringify({ user: action.payload }));
            })
            .addCase(EmployeeSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(EmployeeLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(EmployeeLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.employee = action.payload;
                state.isLoggedIn = true;
                localStorage.setItem("employeeToken", JSON.stringify(action.payload));
            })
            .addCase(EmployeeLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(employeeLogout.fulfilled, (state) => {
                state.loading = false;
                localStorage.removeItem("employeeToken");
                state.employee = null;
                state.isLoggedIn = false;
            })
            .addCase(getEmployeesbyID.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEmployeesbyID.fulfilled, (state, action) => {
                state.loading = false;
                state.allemployeesbyID = action.payload;
            })
            .addCase(getEmployeesbyID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(employeeUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(employeeUpdate.fulfilled, (state, action) => {
                state.employee.loading = false;
                state.employee.user = action.payload;
                localStorage.setItem("employeeToken", JSON.stringify({ user: action.payload }));
            })
            .addCase(employeeUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setEmployee, setLogout } = employeeSlice.actions;

export default employeeSlice.reducer;
