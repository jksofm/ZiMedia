import React from "react";
import styled from "styled-components";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import {Link, useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import defaultProfile from "../../img/defaultAvatar.jpg"
import coverDefaultPicture from "../../img/defaultCover.jpg"
import { getMydata ,getOneUser, logoutUser} from "../../features/users/userSlice";


function ProfileCard({ mypage }) {
   const {allUsers,user,isFollowingLoading} = useSelector((store)=>store.user)
  //  console.log(user.coverPicture)
   const {mypost} = useSelector((store)=>store.post)
   const dispatch =useDispatch();
  //  const user = allUsers.find((el)=>el._id===user._id)
  const Navigate = useNavigate();
    React.useEffect(()=>{
      dispatch(getMydata(user._id))
    },[isFollowingLoading])
   
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
      <div className="profileImages">
        <img src={user.coverPicture? process.env.REACT_APP_PUBLIC_FOLDER + "/users/" + user.coverPicture: coverDefaultPicture } alt="" />
        <img src={user.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + "/users/" + user.profilePicture: defaultProfile} alt="" />
      </div>
      <div className="profileName">
        <span>{user.username}</span>
        <span>{user.job? user.job : "Job : ?????"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          {mypage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{mypost.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {!mypage && (
        <>
      <Link to="/mydata" className="myprofile">My Profile</Link>
      <button className="btn logout-btn" onClick={handleLogout}>Logout</button>

        </>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  border-radius: 1.5rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  overflow-x: clip;
  background-color: var(--cardColor);
  margin-bottom: ${(props) => (props.mypage ? "0" : "20px")};
  .myprofile {
    font-weight: bold;
    align-self: center;
    color: orange;
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
      opacity: 0.8;
    }
  }
  .logout-btn{
    width: 7rem;
    height: 2rem;
    /* margin-top: 6rem; */
    margin-bottom: 2rem;;
    align-self: center;
  }

  .profileImages {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .profileImages img:nth-of-type(1) {
    min-height: 200px;
    max-height: 250px;
    width: 100%;
  }
  .profileImages img:nth-of-type(2) {
    width: 8rem;
    border-radius: 50%;
    position: absolute;
    bottom: -3rem;
    box-shadow: var(--profileShadow);
  }
  .profileName {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
    gap: 10px;

    span:nth-of-type(1) {
      font-weight: bold;
    }
    span:nth-of-type(2) {
    }
  }
  //Follow
  .followStatus {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }
  .followStatus > hr {
    width: 85%;
    border: 1px solid var(--hrColor);
  }
  .followStatus > div {
    display: flex;
    gap: 1rem;
    width: 80%;
    align-items: center;
    justify-content: space-around;
  }
  .follow {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
  }
  .follow > span:nth-of-type(1) {
    font-weight: bold;
  }
  .follow > span:nth-of-type(2) {
    color: var(--gray);
    font-size: 13px;
  }

  .vl {
    height: 150%;
    border-left: 2px solid var(--hrColor);
  }
`;
export default ProfileCard;
