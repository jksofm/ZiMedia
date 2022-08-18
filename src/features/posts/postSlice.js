import React from 'react';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addUserToLocalStorage,
  getUserToLocalStorage,
  removeUserToLocalStorage,
} from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    mypost : [],
    timelinepost: [],
    isLoadingNewPost : false,
    userpost : [],
   
}
export const getUserPost = createAsyncThunk("post/getuserpost",async(userId,thunkAPI)=>{
    try{
        const resp = await customFetch.get(`/post/${userId}/getuserpost`,{
            headers: {
              authorization: `Bearer ${thunkAPI.getState().user.token}`,
            },
          });
        
          return resp.data.data.doc;
    }catch(e){
        return thunkAPI.rejectWithValue(e.response.data.message);
        
    }
})
export const getMyPost = createAsyncThunk("post/getmypost",async(_,thunkAPI)=>{
    try{
        const resp = await customFetch.get(`/post/mypost/${thunkAPI.getState().user.user._id}`,{
            headers: {
              authorization: `Bearer ${thunkAPI.getState().user.token}`,
            },
          });
        
          return resp.data.data.doc;
    }catch(e){
        return thunkAPI.rejectWithValue(e.response.data.message);
        
    }
})
export const getTimeLinePost = createAsyncThunk("post/gettimelinepost",async(_,thunkAPI)=>{
    try{
        const resp = await customFetch.get(`/post/timelinepost`,{
            headers: {
              authorization: `Bearer ${thunkAPI.getState().user.token}`,
            },
          });
      
          return resp.data.data.post;
    }catch(e){
        return thunkAPI.rejectWithValue(e.response.data.message);
        
    }
})
export const createPost = createAsyncThunk("post/create",async(post,thunkAPI)=>{
    try{
        const resp = await customFetch.post("/post", post,{
            headers: {
              authorization: `Bearer ${thunkAPI.getState().user.token}`,
            },
          });
          return resp.data;
        }catch(e){
    
      return thunkAPI.rejectWithValue(e.response.data.message);


    }
})
export const likePost = createAsyncThunk("post/like",async(postId,thunkAPI)=>{
           try{
            const resp = await customFetch.patch(`/post/${postId}/favorite`,postId,{
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.token}`,
                  },
                  
            })
           
            return resp.data
           }catch(e){
               console.log(thunkAPI.getState().user.token);
            return thunkAPI.rejectWithValue(e.response.data.message);
           }

})
export const deletePost =createAsyncThunk("post/delete",async(postId,thunkAPI)=>{
    try{
     const resp = await customFetch.delete(`/post/${postId}`,{
         headers: {
             authorization: `Bearer ${thunkAPI.getState().user.token}`,
           },
           
     })
    
     return resp.data
    }catch(e){
     
     return thunkAPI.rejectWithValue(e.response.data.message);
    }

})

const postSlice = createSlice({
    name : "post",
    initialState,
    reducers : {
      deletePostSingle : (state,{payload})=>{
           state.timelinepost = state.timelinepost.filter((el,id)=>el._id!==payload)
           state.mypost = state.mypost.filter((el,id)=>el._id!==payload)

      }
    },
    extraReducers : {
        [createPost.pending] : (state)=>{
            state.isLoadingNewPost = true
        },
        [createPost.fulfilled] : (state)=>{
            state.isLoadingNewPost = false;
            toast(`🦄 Successfully!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        },
        [createPost.rejected] : (state,{payload})=>{
            state.isLoadingNewPost = false
            toast.error(payload)
        },
        [getMyPost.pending] : (state)=>{
            state.isLoading = true
        },
        [getMyPost.fulfilled] : (state,{payload})=>{
            state.isLoading = false;
            state.mypost = payload
        },
        [getMyPost.rejected] : (state,{payload})=>{
            state.isLoading = false
            toast.error(payload)
        },
        [getTimeLinePost.pending] : (state)=>{
            state.isLoading = true
        },
        [getTimeLinePost.fulfilled] : (state,{payload})=>{
            state.isLoading = false;
           
            state.timelinepost = [...payload]
            // console.log(state.timelinepost)
        },
        [getTimeLinePost.rejected] : (state,{payload})=>{
            state.isLoading = false
            toast.error(payload)
        },
        [likePost.pending] : (state)=>{
       
        },
        [likePost.fulfilled] : (state)=>{
           
        },
        [likePost.rejected] : (state,{payload})=>{
          
            toast.error(payload)
        },
        [getUserPost.pending] : (state)=>{
            state.isLoading = true
        },
        [getUserPost.fulfilled] : (state,{payload})=>{
            state.isLoading = false;
         
            state.userpost = payload
        },
        [getUserPost.rejected] : (state,{payload})=>{
            state.isLoading = false
            toast.error(payload)
        },
        [deletePost.pending] : (state)=>{
            state.isLoading = true
        },
        [deletePost.fulfilled] : (state,{payload})=>{
            state.isLoading = false;
         
           
        },
        [deletePost.rejected] : (state,{payload})=>{
            state.isLoading = false
            toast.error(payload)
        },
    }
})
export const {deletePostSingle} = postSlice.actions;
export default postSlice.reducer;
