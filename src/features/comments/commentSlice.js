import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addUserToLocalStorage,
  getUserToLocalStorage,
  removeUserToLocalStorage,
} from "../../utils/localStorage";


export const getCurrentComments = createAsyncThunk(
    "comment/getcommentsofapost",
    async (postId, thunkAPI) => {
      try {
        const resp = await customFetch.get(`/comment/post/${postId}`, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        });
        // console.log(resp.data);
        return resp.data.data;
      } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
    }
  );
  export const createComment = createAsyncThunk(
    "comment/createcomment",
    async (commentData, thunkAPI) => {
      try {
        const resp = await customFetch.post(`/comment`,commentData, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        });
        // console.log(resp.data);
        return resp.data.data;
      } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
    }
  );
  export const deleteComment = createAsyncThunk(
    "comment/deletecomment",
    async (commentId, thunkAPI) => {
      try {
        const resp = await customFetch.delete(`/comment/${commentId}`, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.token}`,
          },
        });
        // console.log(resp.data);
        return resp.data.data;
      } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
    }
  );

const initialState = {
    currentComments : [],
    isLoading : false,
    isCreateComment : false,
}
const commentSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [getCurrentComments.pending] : (state,{payload})=>{
            state.isLoading = true;

        },
        [getCurrentComments.fulfilled] : (state,{payload})=>{
            state.isLoading = false;
            //  console.log(payload);
             state.currentComments = payload.doc
        },
        [getCurrentComments.rejected] : (state,{payload})=>{
            state.isLoading = false;
            toast.error(payload);
        },
        [createComment.pending] : (state,{payload})=>{
            state.isCreateComment = true;

        },
        [createComment.fulfilled] : (state,{payload})=>{
            state.isCreateComment = false;
            //  console.log(payload);
             console.log(payload)
        },
        [createComment.rejected] : (state,{payload})=>{
            state.isCreateComment = false;
            toast.error(payload);
        },
        [deleteComment.pending] : (state,{payload})=>{
            state.isCreateComment = true;

        },
        [deleteComment.fulfilled] : (state,{payload})=>{
            state.isCreateComment = false;
            //  console.log(payload);
            //  console.log(payload)
        },
        [deleteComment.rejected] : (state,{payload})=>{
            state.isCreateComment = false;
            toast.error(payload);
        },
    }
})
export default commentSlice.reducer;
