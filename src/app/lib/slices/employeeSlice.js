import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "../services/employeeService";

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

// Update the EmployeeUpdate 
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
      const response = await employeeService.employeedelete(employeeId);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
        const deletedEmployeeId = action.payload.employeeId;
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
