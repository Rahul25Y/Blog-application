import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
console.log(apiUrl);

let initialState = {
  message: "",
  accessToken: "",
  user: "",
  loading: false,
  error: "",
  forget_message: "",
};

export const SignInUser = createAsyncThunk(
  "user/signInUser",
  async (body, thunkAPI) => {
    
    const reResult = await fetch(`${apiUrl}user/login`, {
    
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await reResult.json();
    if (data.success) {
      console.log("res result is", reResult);
      console.log("data is", data);
      // for error message
      console.log("***", data.success, data);
      return data;
    } else {
      console.log("wrong data", data);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "signUpUser",
  async (requestData, { rejectWithValue }) => {
    const response = await axios.post(
      `${apiUrl}user/signup`,
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }
);

export const forgetPassword = createAsyncThunk(
  "forgetpassword",
  async (body) => {
    const response = await axios.post(
      `${apiUrl}user/forgetpassword`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  "resetpassword",
  async(body) => {
    const res = await axios.post(`${apiUrl}user/reset-password/${body.user._id}/${body.token}`,
    body,
    );
    return res;
  }
)

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.message = "";
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(SignUpUser.pending, (state, { payload }) => {
        console.log("pending...");
        state.loading = true;
      })
      .addCase(SignUpUser.fulfilled, (state, { payload }) => {
        console.log("Done", payload);
        state.loading = false;
        state.message = payload.data.message;
      })
      .addCase(SignUpUser.rejected, (state, payload) => {
        state.error = payload.error.message;
        state.loading = false;
      })
      .addCase(SignInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(SignInUser.fulfilled, (state, { payload }) => {
        // console.log("this is state", state);
        state.loading = false;
        console.log("payload fulfilled:", payload);
        // console.log(typeof payload);
        // console.log("_", payload.success);
        if (payload.success) {
          console.log("inside payload success");
          state.message = payload.message;
          state.accessToken = payload.accessToken;
          state.user = payload.userData;
          localStorage.setItem("message", payload.message);
          localStorage.setItem("user", JSON.stringify(payload.userData));
          localStorage.setItem("accessToken", payload.accessToken);
          console.log("successful");
        } else {
          state.error = payload.error;
          // if promise is not fullfilled then it will run
        }
      })
      .addCase(SignInUser.rejected, (state, { payload }) => {
        console.log("this is rejected", payload);
        state.loading = false;
        state.error = payload.message;
        state.message = "";
      })
      .addCase(resetPassword.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.forget_message = payload.data.message;
      })
      .addCase(resetPassword.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload.error.message;
      })
  },
});

export default authSlice.reducer;
export const { clearState } = authSlice.actions;
