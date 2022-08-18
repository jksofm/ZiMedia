import React from "react";
import styled from "styled-components";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import defaultimg from "../../img/default.jpg";
import moment from "moment";

import Notlike from "../../img/notlike.png";
import Like from "../../img/like.png";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  deletePost,
  getTimeLinePost,
  getMyPost,
  deletePostSingle,
} from "../../features/posts/postSlice";
import DeletePostModel from "../deletePostModel/DeletePostModel";
import CommentBox from "../commentBox/CommentBox";
// import Heart from "../../img/heart.png";

function PostSingle({ post }) {
  const { user, allUsers } = useSelector((store) => store.user);
  const [liked, setLiked] = React.useState(post.likes.includes(user._id));
  const [modalOpend, setModalOpend] = React.useState(false);
  const [commentbox,setCommentbox] = React.useState(false);

  const [likenumber, setLikeNumber] = React.useState(post.likes.length);
  const dispatch = useDispatch();
  // console.log(`${process.env.REACT_APP_PUBLIC_FOLDER}/posts/${post.img}`)
  //  console.log(post.image)
  const handleLike = () => {
    setLiked((pre) => !pre);
    dispatch(likePost(post._id));
    if (liked) {
      setLikeNumber((pre) => pre - 1);
    } else {
      setLikeNumber((pre) => pre + 1);
    }
  };  


  return (
    <Wrapper>
      {/* <img src={post.image? process.env.REACT_APP_PUBLIC_FOLDER + "/posts/" + post.image : defaultimg} alt =" "/> */}

      {post.image ? (
        <>
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/posts/" + post.image}
            alt=" "
          />
          <div className="postReact">
            <img onClick={handleLike} src={liked ? Like : Notlike} alt="" />
            <img src={Comment} onClick={()=>setCommentbox(true)} alt="" />
            <img src={Share} alt="" />
          </div>
          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {likenumber} likes
          </span>
          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {moment(post.createdAt).fromNow()}
          </span>
          <span onClick={()=>setCommentbox(true)} style={{ color: "var(--gray)", fontSize: "12px",fontWeight: "bold",cursor: "pointer" }}>
            View comments
          </span>

          <div className="detail">
            <span>
              <b>@{post.userId.username} </b>
            </span>
            <span>{post.desc}</span>
            {post.userId._id === user._id && (
              <button
                style={{
                  padding: "1rem",
                  marginTop: "1rem",
                  marginLeft: "auto",
                }}
                className="btn"
                onClick={() => {
                  setModalOpend(true);
                }}
              >
                Delete my post
              </button>
            )}
            <DeletePostModel
              postId={post._id}
              modalOpened={modalOpend}
              setModalOpend={setModalOpend}
            />
            <CommentBox post={post} modalOpened={commentbox} setModalOpend={setCommentbox} postId={post._id} /> 
            
          </div>
        </>
      ) : (
        <>
          <div className="detail">
            <span>
              <b>@{post.userId.username} </b>
            </span>
            <span>{post.desc}</span>
          </div>
          <div className="postReact">
            <img onClick={handleLike} src={liked ? Like : Notlike} alt="" />
            <img src={Comment} onClick={()=>setCommentbox(true)} alt="" />
            <img src={Share} alt="" />
          </div>
          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {likenumber} likes
          </span>
          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {moment(post.createdAt).fromNow()}
          </span>
          <span onClick={()=>setCommentbox(true)} style={{ color: "var(--gray)", fontSize: "12px",fontWeight: "bold",cursor: "pointer" }}>
            View comments
          </span>
          {post.userId._id === user._id && (
            <button
              style={{ padding: "1rem", marginTop: "1rem", marginLeft: "auto" }}
              className="btn"
              onClick={() => {
                setModalOpend(true);
              }}
            >
              Delete my post
            </button>
          )}
          <DeletePostModel
            postId={post._id}
            modalOpened={modalOpend}
            setModalOpend={setModalOpend}
          />
              <CommentBox post={post} modalOpened={commentbox} setModalOpend={setCommentbox} postId={post._id} /> 
        </>
      )}

    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--cardColor);
  border-radius: 1rem;
  border: 1.5px solid #ddd;
  & > img {
    width: 100%;
    object-fit: cover;
    max-height: 50vh;
  }
  .postReact {
    margin-top: 1rem;
    margin-bottom: 1rem;

    img {
      margin-right: 1rem;
      cursor: pointer;
      /* border-radius: 30% */
    }
    img:nth-of-type(1) {
      &:hover {
        cursor: pointer;
      }
    }
  }
  & > span {
    margin-bottom: 1rem;
  }
`;

export default PostSingle;
