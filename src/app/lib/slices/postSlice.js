import { BASE_API_URL } from "@/Readme";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Blog Post
export const fetchPost = createAsyncThunk(
    "post/getAllPost",
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/custom-ep`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// Single Blog Post
export const singleBlogDetails = createAsyncThunk(
    "post/singleBlogDetails",
    async (id, thunkApi) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/custom-ep?id=${id}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// Fetch Pages
export const fetchPages = createAsyncThunk(
    "Pages/fetchPages",
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${BASE_API_URL}/pages`);
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    posts: [],
    singlePost: null,
    pages: [],
    loading: false,
    error: null,
};

// helper function for extra reducer
const handleAsyncActions = (builder, action, key) => {
    builder
        .addCase(action.pending, (state) => {
            state.loading = true;
        })
        .addCase(action.fulfilled, (state, { payload }) => {
            state.loading = false;
            state[key] = payload;
        })
        .addCase(action.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
};
// 
const postSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        handleAsyncActions(builder, fetchPost, 'posts');
        handleAsyncActions(builder, singleBlogDetails, 'singlePost');
        handleAsyncActions(builder, fetchPages, 'pages');
    },
});

export default postSlice.reducer;