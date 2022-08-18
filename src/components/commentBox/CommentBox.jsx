import React from "react";
import styled from "styled-components";
import InputEmoji from "react-input-emoji";
import { Modal, Button, Group, useMantineTheme } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  getCurrentComments,
  deleteComment
} from "../../features/comments/commentSlice";
import moment from "moment";
import { io } from "socket.io-client";


function CommentBox({ postId, setModalOpend, modalOpened, post }) {
  const [newComment, setNewComment] = React.useState("");
  const theme = useMantineTheme();
  const [onlineUsers, setOnelineUsers] = React.useState([]);
  const [sendComment, setSendComment] = React.useState(null);
  const [receiveComment, setReceiveComment] = React.useState(null);
  const dispatch = useDispatch();
  const scroll = React.useRef();

  const { currentComments, isCreateComment } = useSelector(
    (store) => store.comment
  );

  const { user,allUsers } = useSelector((store) => store.user);
  //   console.log(closecomment)
  const handleComment = (newComment) => {
   
        // console.log(newComment)
        setNewComment(newComment);
  };
  const socket = React.useRef();
 
  React.useEffect(()=>{
    socket.current = io("https://zimedia.herokuapp.com");
    socket.current.emit("new-user-add", user._id);
    const handleGetUser = (users)=>{
      setOnelineUsers(users);

    }
    socket.current.on("get-users", handleGetUser);
    return ()=> socket.current.off("get-users", handleGetUser);
  },[user])
  //send comment
  React.useEffect(() => {
  
    if (sendComment !== null) {
      socket.current.emit("send-comment", sendComment);

    
    }
  }, [sendComment]);
 ///recieve comment
  React.useEffect(() => {
    const handleReceiveComment = (data)=>{
     
      setReceiveComment(data);
    }
    socket.current.on(`receive-comment-from-${postId}`,handleReceiveComment);
    return ()=>socket.current.off(`receive-comment-from-${postId}`,handleReceiveComment)
  }, []);
  React.useEffect(() => {
    dispatch(getCurrentComments(postId));
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [receiveComment]);




  const handleSend = () => {
    const newCommentData = {
      content: newComment,
      userId: user._id,
      postId: postId,
    };
    dispatch(createComment(newCommentData));
    setNewComment("");
    
    const timerId =setTimeout(()=>{

        dispatch(getCurrentComments(postId));
    },500)
    setSendComment(newCommentData)
  //  clearTimeout(timerId)

  };
  React.useEffect(() => {
    dispatch(getCurrentComments(postId));
  }, [modalOpened]);
  //   console.log(newComment);
  //   console.log(currentComments)



  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpend(false)}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.dark[2]
      }
      overlayBlur={3}
      size="100"
    >
      <Wrapper>
        <div className="comment-img">
          {post.image && (
            <img
              src={process.env.REACT_APP_PUBLIC_FOLDER + "/posts/" + post.image}
              alt=" "
            />
          )}
        </div>
        <div className="post-detail">
          <span>
            <b>@{post.userId.username} </b>
          </span>
          <span>{post.desc}</span>
        </div>

        <div>
          <div className="comment-content" >
            {currentComments.length > 0 ? (
              currentComments.map((el, id) => {
                // console.log(getTimestamp(el.createdAt))
                return (
                  <div ref={scroll} key={id} className="single-comment">
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        @{el.userId.username}
                      </span>{" "}
                      <span style={{ fontSize: "0.9rem" }}>{el.content}</span>
                    </p>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        marginLeft: "0.2rem",
                        marginTop: "0.2rem",
                      }}
                    >
                      {moment(el.createdAt).fromNow()}
                    </p>
                    {el.userId._id === user._id && (
                      <span onClick={()=>{
                        dispatch(deleteComment(el._id))
                        setTimeout(()=>{

                            dispatch(getCurrentComments(postId));
                        },500)
                      }} className="delete-comment">Delete</span>
                    )}
                  </div>
                );
              })
            ) : (
              <div>
                <h4>There is no comment!</h4>
              </div>
            )}
          </div>
          <div className="comment-input">
            <InputEmoji value={newComment}  onChange={handleComment} />
            <button onClick={handleSend} className="btn btn-comment-send">
              Send
            </button>
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.div`
  margin-top: 2rem;
  position: relative;
  .comment-img {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    img{
      width: 100%;
    }
  }
  .post-detail {
    margin-bottom: 1.5rem;
  }
  .comment-content {
    padding: 1rem 1.5rem 1rem;
    background-color: #f8f0e4;
    border-radius: 2rem;
    max-height: 30vh;
    overflow: scroll;
  }
  p {
    padding: 0;
    margin: 0;
  }

  .comment-input {
    display: flex;
    gap: 1.2rem;
    margin-top: 1rem;
  }
  .btn-comment-send {
    padding: 0 1.6rem !important;
  }
  .single-comment {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .delete-comment{
    position: absolute;
    right: 0;
    top:0;
    font-size: 0.8rem;
    cursor: pointer;
    color: orange;

  }
  .close {
    position: absolute;
    top: 0.8rem;
    right: 1.2rem;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #e6b366;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
    }
  }
`;

export default CommentBox;
