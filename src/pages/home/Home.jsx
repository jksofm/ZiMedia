import React from "react";
import ProfileSide from "../../components/profile/ProfileSide";
import styled from "styled-components";
import PostSide from "../../components/post/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import { Link } from "react-router-dom";
import HomeIcon from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import {UilSetting} from '@iconscout/react-unicons'


function Home() {
  return (
    <Wrapper className="Home">
       <div className="nav-icons">
            <Link to="/">
              <img
                style={{ width: "1.5rem", height: "1.5rem" }}
                src={HomeIcon}
                alt=""
              />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
      <div className="profile-side">
        <ProfileSide />
      </div>
      <div className="post-side">
        <PostSide />
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
  background: #f3f3f3;
  .nav-icons{
    display: flex;
    justify-content: space-around;
    margin-top : 1.5rem;
    margin-bottom : 2rem;

  }
  .right-side {
    display: none;
  }

  /* grid-template-columns: 1fr 1fr; */
  gap: 1rem;
  @media screen and (min-width: 1024px){
  grid-template-columns: 1fr 2fr 1fr!important;
  .right-side{
      display: block;
    }
  }
  @media screen and (min-width: 796px){
  grid-template-columns: 1fr 1fr;
  .right-side {
      display: block;
    }
    .nav-icons{
    display: none;
  }
     
  }

  /* height:100vh; */
`;
export default Home;
