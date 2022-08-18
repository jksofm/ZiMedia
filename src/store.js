import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./features/users/userSlice"
import postSlice from "./features/posts/postSlice"
import chatSlice from "./features/chats/chatSlice"
import commentSlice from "./features/comments/commentSlice"
export const store = configureStore({
    reducer : {
        user : userSlice,
        post : postSlice,
        chat : chatSlice,
        comment: commentSlice

    }
})