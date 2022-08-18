import React from 'react'
import PostSingle from "../postSingle/PostSingle";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {getUserPost} from "../../features/posts/postSlice"



function UserPostContent({userInfo,idUser}) {
 
    
    const dispatch = useDispatch();
    const {userpost} = useSelector((store)=> store.post)
    React.useEffect(()=>{
    

        dispatch(getUserPost(userInfo._id))
    
   
    },[idUser])
 if(userpost.length ===0){
     return <Wrapper>
        <h1 style={{marginTop: "10vh",textAlign: "center" }}>He or She have not posted any thing</h1>
     </Wrapper>
 }
  return (
    <Wrapper>
    {userpost.map((post, id) => {
      return <PostSingle key={id} post={post} id={id} />;
    })}
  </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default UserPostContent