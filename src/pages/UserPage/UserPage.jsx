import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import PostSide from "../../components/post/PostSide";
import PostContent from "../../components/PostContent/PostContent";
import ProfileSide from "../../components/profile/ProfileSide";
import ProfileCard from "../../components/profileCard/ProfileCard";
import RightSide from "../../components/RightSide/RightSide";
import UserPostContent from "../../components/userPostContent/UserPostContent";
import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import UserProfileSide from "../../components/userProfileSide/UserProfileSide";
import { Link } from "react-router-dom";
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'

import {UilSetting} from '@iconscout/react-unicons'
import { getOneUser } from "../../features/users/userSlice";
function UserPage() {
  const { allUsers, user, userWantToGet } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getOneUser(id));
  }, [id]);

  // console.log(userWantToGet);

  // const Users = allUsers.filter((el,id)=>el._id !== user._id)

  // return Users.map((el, index) => {
  //   if (el._id === id) {

  //     return (
  //       <Wrapper key={index}>
  //         <UserProfileSide userInfo={el} />
  //         <div className="profile-center">
  //           <UserProfileCard userInfo={el} />
  //           <UserPostContent userInfo={el} />
  //         </div>
  //         <RightSide />
  //       </Wrapper>
  //     );
  //   }
  // });

  return (
    <Wrapper>
      {userWantToGet && (
        <>
          <div className="nav-icons">
            <Link to="/">
              <img
                style={{ width: "1.5rem", height: "1.5rem" }}
                src={Home}
                alt=""
              />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
          <div className="user-profile">
            <UserProfileSide userInfo={userWantToGet} />
          </div>


          <div className="profile-center">
            <UserProfileCard userInfo={userWantToGet} />
            <UserPostContent idUser={id} userInfo={userWantToGet} />
          </div>
          <div className="right-side">
            <RightSide />
          </div>
        </>
      )}

      {/* <h1>Hello</h1> */}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  .nav-icons{
    display: flex;
    justify-content: space-around;
    margin-top : 1.5rem;
    margin-bottom : 2rem;

  }
  .right-side {
    display: none;
  }
  .post-area {
    margin-top: 2rem;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 2fr 1fr !important;
    .right-side {
      display: block;
    }
  }
  @media screen and (min-width: 796px) {
    grid-template-columns: 1fr 1fr;
    .right-side {
      display: block;
    }
    .nav-icons{
    display: none;
  }
  }
`;

export default UserPage;
