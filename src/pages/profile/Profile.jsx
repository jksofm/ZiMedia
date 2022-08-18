import React from "react";
import styled from "styled-components";
import PostSide from "../../components/post/PostSide";
import ProfileSide from "../../components/profile/ProfileSide";
import ProfileCard from "../../components/profileCard/ProfileCard";
import RightSide from "../../components/RightSide/RightSide";
import { Link } from "react-router-dom";
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'

import {UilSetting} from '@iconscout/react-unicons'
function Profile() {
  return (
    <Wrapper>
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
        <ProfileSide mypage />
      </div>
      <div className="profile-center">
        <ProfileCard mypage />
        <PostSide mypage />
      </div>
      <div className="right-side">
        <RightSide />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  .nav-icons{
    display: flex;
    justify-content: space-around;
    margin-top : 1.5rem;
    margin-bottom : 2rem;

  }
  .right-side {
    display: none;
  }
  gap: 1rem;
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

export default Profile;
