import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../services/employeeService";

// Get the employee token from localStorage if it exists and parse it
const employee = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('employeeToken')) : null;

// Employee Auth Registration
export const EmployeeSignup = createAsyncThunk(
    "auth/employee/register",
    async (payload, thunkAPI) => {
        try {
            const response = await employeeService.employeeregister(payload);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Employee Auth Login
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

// Employee Logout
export const employeeLogout = createAsyncThunk("auth/logout", async () => {
    await employeeService.employeelogout();
});

// Get Employees by ID
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

// Employee Update
export const EmployeeUpdate = createAsyncThunk(
    "auth/employee/update",
    async (payload, thunkAPI) => {
        try {
            const response = await employeeService.employeeupdate(payload);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
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
            state.employee = { user: null };
            state.allemployeesbyID = null;
            localStorage.removeItem("employeeToken");
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
                if (state.allemployeesbyID) {
                    state.allemployeesbyID.push(action.payload);
                } else {
                    state.allemployeesbyID = [action.payload];
                }
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
                state.employee.user = action.payload;
                localStorage.setItem('employeeToken', JSON.stringify(action.payload));
            })
            .addCase(EmployeeLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(employeeLogout.fulfilled, (state) => {
                state.loading = false;
                localStorage.removeItem("employeeToken");
                state.employee = { user: null };
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
            .addCase(EmployeeUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(EmployeeUpdate.fulfilled, (state, action) => {
                state.loading = false;
                const updatedEmployee = action.payload;
                const employeeIndex = state.allemployeesbyID.findIndex((employee) => employee._id === updatedEmployee._id);
                if (employeeIndex !== -1) {
                    state.allemployeesbyID[employeeIndex] = updatedEmployee;
                }
            })
            .addCase(EmployeeUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setEmployee, setLogout } = employeeSlice.actions;

export default employeeSlice.reducer;
