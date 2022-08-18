import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  unfollowUser,
  followUser,
  getOneUser,
  getMydata,
} from "../../features/users/userSlice";
import { Followers } from "../../Data/FollowersData";
import defaultProfile from "../../img/defaultAvatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { getUserPost } from "../../features/posts/postSlice";

function FollowersCard() {
  const { allUsers, user } = useSelector((store) => store.user);
  //  console.log(user)
  const [follow, setFollow] = React.useState(true);
  const [sellall, setSeeall] = React.useState(false);
  // const currentUser = useSelector((store) => store.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllUsers({ limit: 5 }));
 
  }, []);
  React.useEffect(() => {
  
   const timerId = setTimeout(() => {
      dispatch(getMydata(user._id));
    }, 200);
    return ()=>{
      clearTimeout(timerId)
    }
  }, [follow]);
  const buttonRef = React.useRef();
  // console.log(allUsers)
  // console.log(allUsers)
  const Users = allUsers.filter((el, id) => el._id !== user._id);
  // const currentUser = allUsers.find((el)=>el._id===user._id)
  const handleFollow = (e) => {
    // console.log(e.target.dataset.unfollow)
    Users.forEach((el, id) => {
      if (user.followings.includes(el._id)) {
        if (e.target.dataset.id === el._id) {
          dispatch(unfollowUser(el._id));
          setFollow((pre) => !pre);
        }
      } else {
        if (e.target.dataset.id === el._id) {
          dispatch(followUser(el._id));
          setFollow((pre) => !pre);
        }
      }
    });
  };
  return (
    <Wrapper>
      <h3> Suggestions For You</h3>
      {Users.map((el, id) => {
        const link = `/user/${el._id}`;
        return (
          // <Link style={{textDecoration: 'none',color:"black"}} to={link} key={id}>
          <div key={id}>
            <div className="follower">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={link}
                onClick={() => {
                  dispatch(getOneUser(el._id));
                  
                  setTimeout(()=>{

                    dispatch(getUserPost(el._id))
                  },200)

                  // console.log("hello!!!");
                }}
              >
                <img
                  src={
                    el.profilePicture
                      ? `${process.env.REACT_APP_PUBLIC_FOLDER}/users/${el.profilePicture}`
                      : defaultProfile
                  }
                  className="followerImg"
                />
                <div className="name">
                  <span>{el.lastname}</span>
                  <span>@{el.username}</span>
                </div>
              </Link>
              {!user.followings.includes(el._id) ? (
                <button
                  data-id={el._id}
                  data-follow="follow"
                  onClick={handleFollow}
                  className="btn follow-btn"
                  ref={buttonRef}
                >
                  Follow
                </button>
              ) : (
                <button
                  data-id={el._id}
                  data-follow="unfollow"
                  onClick={handleFollow}
                  style={{ background: "#ad9d9d", color: "#574e4e" }}
                  className="btn follow-btn"
                  ref={buttonRef}
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>
          // </Link>
        );
      })}
      {!sellall && (
        <div className="sellall">
          <hr style={{ width: "85%", border: "1px solid var(--hrColor)" }}></hr>
          <span
            onClick={() => {
              setSeeall(true);
              dispatch(getAllUsers({ limit: 10 }));
            }}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            See all
          </span>
        </div>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  border-radius: 0.7rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  .follower {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .follower > a {
    display: flex;
    gap: 10px;
  }
  .followerImg {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
  .name {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
  }
  .name > span:nth-of-type(1) {
    font-weight: bold;
  }
  .name > span:nth-of-type(1) {
  }
  .follow-btn {
    height: 2rem;
    padding-left: 20px;
    padding-right: 20px;
  }
  .sellall {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default FollowersCard;
