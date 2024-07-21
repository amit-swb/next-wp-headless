import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../services/employeeService";

// Get the employee token from localStorage if it exists and parse it
const employee =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("employeeToken"))
    : null;

// employee Auth Registration
export const EmployeeSignup = createAsyncThunk(
  "auth/employee/register",
  async (
    {
      first_Name,
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
      employee_id,
    },
    thunkAPI
  ) => {
    try {
      const response = await employeeService.employeeregister(
        first_Name,
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
        employee_id
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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

// Update the EmployeeUpdate thunk to handle formValue correctly
export const EmployeeUpdate = createAsyncThunk(
  "auth/employee/update",
  async (formValue, thunkAPI) => {
    try {
      const response = await employeeService.employeeupdate(formValue);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk action for deleting an employee
export const EmployeeDelete = createAsyncThunk(
  "auth/employee/delete",
  async (employeeId, thunkAPI) => {
    try {
      const response = await employeeService.employeedelete(employeeId); // Adjust the service method to your API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Optional: Simulate delay
      return response.data.data; // Return the deleted employee data if needed
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle errors and provide a rejected value
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: { user: null },
    allemployeesbyID: [],
    error: "",
    loading: false,
  },
  reducers: {
    setEmployee: (state, action) => {
      state.employee.user = action.payload;
    },
    setLogout: (state) => {
      state.employee = { user: null };
      state.allemployeesbyID = [];
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
      })
      .addCase(EmployeeSignup.rejected, (state, action) => {
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
      .addCase(EmployeeUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(EmployeeUpdate.fulfilled, (state, action) => {
        state.loading = false;
        const updatedEmployee = action.payload;
        state.allemployeesbyID = state.allemployeesbyID.map((employee) =>
          employee._id === updatedEmployee._id ? updatedEmployee : employee
        );
      })
      .addCase(EmployeeUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(EmployeeDelete.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(EmployeeDelete.fulfilled, (state, action) => {
        state.loading = false;
        const deletedEmployeeId = action.payload.employeeId; // Adjust based on your API response structure
        state.allemployeesbyID = state.allemployeesbyID.filter(
          (employee) => employee._id !== deletedEmployeeId
        );
      })
      .addCase(EmployeeDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmployee, setLogout } = employeeSlice.actions;

export default employeeSlice.reducer;
