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

const initialState = {
  UserChats: [],
  isLoading: false,
  currentMessages: [],
};
export const getUserChats = createAsyncThunk(
  "chat/getuserchats",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/chat", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const createRoomChat = createAsyncThunk(
  "chat/createroomchat",
  async (dataChat, thunkAPI) => {
    try {
      const resp = await customFetch.post("/chat",dataChat, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const createMessage = createAsyncThunk(
  "chat/createmessage",
  async (message, thunkAPI) => {
    try {
      const resp = await customFetch.post(`/message/add`, message, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const getMessages = createAsyncThunk(
  "chat/getmessages",
  async (roomChatId, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/message/${roomChatId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

const chatSlice = createSlice({
  name: " chat",
  initialState,
  reducers: {},
  extraReducers: {
    [createRoomChat.pending]: (state) => {
      state.isLoading = true;
    },
    [createRoomChat.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      
    
    },
    [createRoomChat.rejected]: (state, { payload }) => {
      toast.error(payload);

      state.isLoading = false;
    },
    [getUserChats.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserChats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.UserChats = payload.chat;
    
    },
    [getUserChats.rejected]: (state, { payload }) => {
      toast.error(payload);

      state.isLoading = false;
    },
    [getMessages.pending]: (state) => {
      state.isLoading = true;
    },
    [getMessages.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      //    console.log(payload.result)
      
      state.currentMessages = payload.result;
      
    

    },
    [getMessages.rejected]: (state, { payload }) => {
      toast.error(payload);

      state.isLoading = false;
    },
    [createMessage.pending]: (state) => {
      state.isLoading = true;
    },
    [createMessage.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
    //   console.log(payload.result)
     
      // state.currentMessages.push(payload.result);
    
    },
    [createMessage.rejected]: (state, { payload }) => {
      toast.error(payload);

      state.isLoading = false;
    },
  },
});
export default chatSlice.reducer;
