import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
let initialState = {
  blogcreate_msg: "",
  bloglist: "",
  blogDetail_msg: "",
  blog_data: "",
  blog_Details: "",
  loading: false,
  error:"",
  comments : "",
};

// For get Blog

export const getBlogs = createAsyncThunk("blog/getBlogs", async (thunkAPI) => {
  const reResult = await fetch(`${apiUrl}blog/blogs`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await reResult.json();
  console.log("Data", data);
  if (data.success) {
    console.log("success", data);
    return data;
  } else {
    return thunkAPI.rejectWithValues(data);
  }
});

// For create blog
export const createBlog = createAsyncThunk(
  "blog/create",
  async (body, thunkAPI) => {
    const res = await axios.post(`${apiUrl}blog/create`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  }
);

// for blog details
export const getBlogDetails = createAsyncThunk(
  "blog/BlogDetails",
  async (id, thunkAPI) => {
    console.log(id);
    const response = await fetch(`${apiUrl}blog/details/${id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Context-type": "application/json",
      },
    });
    let data = await response.json();
    console.log("Data", data);
    return data;
  //   if (data.success) {
  //   console.log("success", data);
  //   return data;
  // } else {
  //   return thunkAPI.rejectWithValues(data);
  //  }

  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearState: (state) => {
      state.blogcreate_msg = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        // For Create Company
        createBlog.pending,
        (state) => {
          console.log("pending.......");
          state.loading = true;
          state.error = "";
          state.blogcreate_msg = "";
        }
      )
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.loading = false;
        console.log("fulfilled", payload);
        state.blogcreate_msg = payload.data.message;
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        console.log("this is error", payload);
        console.log("request rejected");
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(getBlogs.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error = payload.error;
        } else {
          state.bloglist_msg = payload.message;
          state.blog_data = payload.blog;
        }
      })
      .addCase(getBlogs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
      })
      .addCase(getBlogDetails.pending, (state, { payload }) => {
        state.loading = true;
        state.error = "";
        state.blogDetail_msg = "";
        state.blog_Details = "";
      })
      .addCase(getBlogDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.error) {
          state.error = payload.error;
          state.blogcreate_msg = "";
          state.blog_Details = "";
        } else {
          state.blogDetail_msg = payload.message;
          state.blog_Details = payload.blog;
          state.comments = payload.comment;
          state.error = "";
        }
      })
      .addCase(getBlogDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.error;
        state.blogDetail_msg = "";
        state.blog_Details = "";
      });
  },
});

export default blogSlice.reducer;
export const { clearState } = blogSlice.actions;
