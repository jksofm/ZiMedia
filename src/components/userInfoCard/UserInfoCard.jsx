import React from 'react'
import styled from 'styled-components'
import {UilPen} from "@iconscout/react-unicons"
import ProfileModal from '../profileModal/ProfileModal';
import {useSelector,useDispatch} from "react-redux";
import {logoutUser} from "../../features/users/userSlice"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { createRoomChat, getUserChats } from '../../features/chats/chatSlice';
function UserInfoCard({...userInfo}) {
    const user = {...userInfo};
  
    const currentUser =  useSelector((store)=> store.user.user)
    const Navigate = useNavigate();
    const dispatch = useDispatch();
 
    const handleCreateRoomChat =()=>{
     const dataRoomChat = {
        senderId : currentUser._id,
        receiverId : user._id
     }
     console.log(dataRoomChat);
        dispatch(createRoomChat(dataRoomChat))
        setTimeout(()=>{
          dispatch(getUserChats());
          Navigate("/chat")
         },500)
        

    }

  return (
    
    <Wrapper>
    <div className="infoHead">
        <h4>User Info</h4>
        
    </div>
    <div className="info">
        <span>
            <b>Name : </b>
            <span style={{fontSize:"0.8rem"}}>{user.lastname && user.firstname? `${user.firstname} ${user.lastname}` : "????"}</span>
        </span>
    </div>
    <div className="info">
        <span>
            <b>Status : </b>
            <span style={{fontSize:"0.8rem"}}>{user.relationship? user.relationship : "????"}</span>
        </span>
    </div>
    <div className="info">
        <span>
            <b>Lives in : </b>
            <span style={{fontSize:"0.8rem"}}>{user.livesin? user.livesin : "????"}</span>
        </span>
    </div>
    <div className="info">
        <span>
            <b>Works at : </b>
            <span style={{fontSize:"0.8rem"}}>{user.worksAt?user.worksAt: "????"}</span>
        </span>
    </div>
    <div className="info">
        <span>
            <b>Job : </b>
            <span style={{fontSize:"0.8rem"}}>{user.job?user.job: "????"}</span>
        </span>
    </div>
    <div className="info">
        <span>
            <b>Email : </b>
            <span style={{fontSize:"0.8rem"}}>{user.email?user.email: "????"}</span>
        </span>
    </div>
    
    <button className="btn logout-btn" onClick={handleCreateRoomChat}>Send message</button>
    {/* <button className="btn logout-btn" onClick={handleLogout}>Update</button> */}
</Wrapper>
  )
}
const Wrapper = styled.div`
      display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap :0.75rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 90%;
  background-color: var(--cardColor);
  .infoHead{
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  .logout-btn{
    width: 7rem;
    height: 2rem;
    margin-top: 6rem;
    align-self: flex-end;
  }
`



export default UserInfoCard