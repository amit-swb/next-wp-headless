import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hrService from "../services/hrService";

// hr Auth Registration
export const hrSignup = createAsyncThunk(
    "auth/hr/register",
    async ({ formValue }, thunkAPI) => {
        try {
            const response = await hrService.hrregister(formValue);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


// gethrbyID
export const getHrbyID = createAsyncThunk(
    "hr/getHrbyID",
    async ({ companyID }, thunkApi) => {
        try {
            const response = await hrService.hrbyID(companyID);
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// Update the HrUpdate 
export const HrUpdate = createAsyncThunk(
    "auth/Hr/update",
    async (formValue, thunkAPI) => {
        try {
            const response = await hrService.hrupdate(formValue);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk action for deleting hr
export const HrDelete = createAsyncThunk(
    "auth/hr/delete",
    async (HrId, thunkAPI) => {
        try {
            const response = await hrService.hrdelete(HrId);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const hrSlice = createSlice({
    name: "hr",
    initialState: {
        hr: { user: null },
        allHrbyID: [],
        error: "",
        loading: false,
    },
    reducers: {
        setHr: (state, action) => {
            state.hr.user = action.payload;
        },
        setLogout: (state) => {
            state.hr = { user: null };
            state.allHrbyID = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(hrSignup.pending, (state) => {
                state.loading = true;
            })
            .addCase(hrSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.hr.user = action.payload;
            })
            .addCase(hrSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getHrbyID.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHrbyID.fulfilled, (state, action) => {
                state.loading = false;
                state.allHrbyID = action.payload;
            })
            .addCase(getHrbyID.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(HrUpdate.pending, (state) => {
                state.loading = true;
            })
            .addCase(HrUpdate.fulfilled, (state, action) => {
                state.loading = false;
                const updatedHr = action.payload;
                state.allHrbyID = state.allHrbyID.map((hr) =>
                    hr._id === updatedHr._id ? updatedHr : hr
                );
            })
            .addCase(HrUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(HrDelete.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(HrDelete.fulfilled, (state, action) => {
                state.loading = false;
                const deletedHrId = action.payload.HrId;
                state.allHrbyID = state.allHrbyID.filter(
                    (hr) => hr._id !== deletedHrId
                );
            })
            .addCase(HrDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { sethr, setLogout } = hrSlice.actions;

export default hrSlice.reducer;
