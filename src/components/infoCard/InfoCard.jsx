import React from 'react'
import styled from 'styled-components'
import {UilPen} from "@iconscout/react-unicons"
import ProfileModal from '../profileModal/ProfileModal';
import {useSelector,useDispatch} from "react-redux";
import {logoutUser} from "../../features/users/userSlice"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

function InfoCard() {
  const [modalOpend,setModalOpend] = React.useState(false);
  const {user} =  useSelector((store)=> store.user)
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = ()=>{
     if(user){
         dispatch(logoutUser("Bye Bro!"));
       
         setTimeout(()=>{
            Navigate("/auth")
         },2000)
     }
  }
  return (
    <Wrapper>
        <div className="infoHead">
            <h4>Your Info</h4>
            <div>

            <UilPen style={{cursor: 'pointer'}} width="2rem" height="1.2rem" onClick={()=>setModalOpend(true)}/>
           <ProfileModal modalOpened = {modalOpend} setModalOpend={setModalOpend} />

            </div>
        </div>
        <div className="info">
            <span>
                <b>Status : </b>
                <span>{user.relationship? user.relationship : "????"}</span>
            </span>
        </div>
        <div className="info">
            <span>
                <b>Lives in : </b>
                <span>{user.livesin? user.livesin : "????"}</span>
            </span>
        </div>
        <div className="info">
            <span>
                <b>Works at : </b>
                <span>{user.worksAt?user.worksAt: "????"}</span>
            </span>
        </div>
        
        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
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

export default InfoCard