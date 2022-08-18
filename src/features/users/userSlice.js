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
  isLoading: false,
  user: getUserToLocalStorage(),
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "",
    allUsers : [],
  userWantToGet : null,
  isFollowingLoading : false ,
};
export const followUser = createAsyncThunk(
    "user/follow",
    async (idWantToFollow, thunkAPI) => {
      try {
        const resp = await customFetch.patch(`/user/${idWantToFollow}/follow`, idWantToFollow,{
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.token}`,
              },
        });
        //   console.log(resp);
        return resp.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
    }
)
export const unfollowUser = createAsyncThunk(
    "user/follow",
    async (idWantToFollow, thunkAPI) => {
      try {
        const resp = await customFetch.patch(`/user/${idWantToFollow}/unfollow`, idWantToFollow,{
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.token}`,
              },
        });
        //   console.log(resp);
        return resp.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.message);
      }
    }
)
export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      //   console.log(resp);
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);

      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/auth/logout");
      // console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const updateMydata = createAsyncThunk(
  "user/updatemydata",
  async (updateUser, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/user/updatemydata`, updateUser, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      // console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (data, thunkAPI) => {
    try {
      
       let url;
       url = `/user`;
       if(data.limit){

         url = `/user?${data.limit? `limit=${data.limit}`: `limit=5`}`;
       }
        if(data.q){
        url = `/user?q=${data.q&& data.q}&limit=${data.limit ? data.limit : "4"}`;

        }

       
      
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.token}`,
        },
      });
      // console.log(resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
export const getOneUser = createAsyncThunk(
  "user/getoneuser",
  async (userwanttogetId, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/user/${userwanttogetId}`, {
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
export const getMydata = createAsyncThunk(
  "user/getmydata",
  async (userCurrentId, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/user/${userCurrentId}`, {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logoutUser : (state,{payload})=>{
    //     state.user = null;
    //     removeUserToLocalStorage();
    //      if(payload){
    //       toast.success(payload);
    //      }
    //    }

  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const user = payload.data.user;
      state.user = { ...user };
      state.token = payload.token;

      addUserToLocalStorage(user);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const user = payload.data.user;
      state.user = { ...user };
      state.token = payload.token;
      localStorage.setItem("token", JSON.stringify(payload.token));
      state.isLoading = false;
      addUserToLocalStorage(user);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      //   console.log(payload)
      toast.error(payload);
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = "";
      localStorage.removeItem("token");

      removeUserToLocalStorage();
      toast.success("Bye Bro!");
    },
    [updateMydata.pending]: (state) => {
      state.isLoading = true;
    },
    [updateMydata.fulfilled]: (state, { payload }) => {
     
      const user = payload.user;
      state.user = { ...user };

      //   state.isLoading = false;
      addUserToLocalStorage(user);
      toast.success("Successfully Updated!");
    },
    [updateMydata.rejected]: (state, { payload }) => {
      state.isLoading = false;
      //   console.log(payload)
      toast.error(payload);
    },
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
     
      state.allUsers = payload.data.doc
      state.isLoading = false;
     
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      //   console.log(payload)
      toast.error(payload);
    },
    [followUser.pending]: (state) => {
        state.isFollowingLoading = true;
      },
      [followUser.fulfilled]: (state, { payload }) => {
        state.isFollowingLoading = false;
      
  
       
      },
      [followUser.rejected]: (state, { payload }) => {
        state.isFollowingLoading = false;
        toast.error(payload);
      },
      [unfollowUser.pending]: (state) => {
        state.isFollowingLoading = true;
      },
      [unfollowUser.fulfilled]: (state, { payload }) => {
        state.isFollowingLoading = false;
      
  
       
      },
      [unfollowUser.rejected]: (state, { payload }) => {
        state.isFollowingLoading = false;
        toast.error(payload);
      },
      [getOneUser.pending]: (state) => {
        state.isLoading = true;
      },
      [getOneUser.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        //  console.log(payload)
        //  console.log("hello")
          state.userWantToGet = payload.data;

      },
      [getOneUser.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
      [getMydata.pending]: (state) => {
        state.isLoading = true;
      },
      [getMydata.fulfilled]: (state, { payload }) => {
        state.isLoading = false;
        // console.log(payload.data._id)
        // console.log(payload.data)
       
          state.user = {...payload.data}
        
       
        // userWantToGet
  
       
      },
      [getMydata.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
  },
});

export default userSlice.reducer;
export const {  } = userSlice.actions;
