import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    comment_msg : "",
    loading: false,
    error: "",
};

export const comments = createAsyncThunk(
    "blog/blogComment",
    async(body) => {
        const response = await axios.post(
            `http://localhost:7000/comment/add/${body.blogId}`,
            body,
            {
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                },
            }
        );
        console.log("hire", response);
        return response.data;
        
    }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        clearState: (state) => {
            state.comment_msg = "";
            state.loading = "";
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase
        (comments.pending, (state) => {
            state.loading = "true";
        })
        .addCase
        (comments.fulfilled, (state, {payload}) => {
            console.log("payload", payload);
            state.loading = "false";
            if(payload.message) {  
                state.comment_msg = payload.message;
                console.log("payload.message");
            } else {
                state.error = payload.message;
            }
        })
        .addCase
        (comments.rejected, (state, {payload}) => {
            state.loading = "false";
            // console.log("rejected", payload);
            state.error = payload.message;
        })
    }
});

export default commentSlice.reducer;
export const {clearState} = commentSlice.actions;
