import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import defaultProfile from "../../img/defaultAvatar.jpg";
import { getMessages, createMessage } from "../../features/chats/chatSlice";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { getOneUser } from "../../features/users/userSlice";
// import dotenv from "dotenv";

function ChatBox({ chat, currentUser, setSendMessage,receiveMessage }) {
  const [userchatwithData, setUserchatwithData] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const dispatch = useDispatch();
  const scroll = React.useRef();
  useEffect(()=>{
        if(receiveMessage!==null && receiveMessage.chatId===chat._id){
                  dispatch(getMessages(chat._id))
        }
  },[receiveMessage])
  // dotenv.config();
  


  const { currentMessages } = useSelector((store) => store.chat);
  const { userWantToGet } = useSelector((store) => store.user);

  // console.log(userWantToGet)
  // console.log(chat);

  React.useEffect(() => {
    if (chat) {
      dispatch(getMessages(chat._id));
    }

   
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = (e) => {
    // e.preventDefault();
    const message = {
      text: newMessage,
      chatId: chat._id,
    };
    dispatch(createMessage(message));
 
    setTimeout(() => {
      dispatch(getMessages(chat._id));
    }, 200);
  
    setNewMessage("");

    const receiverId = userWantToGet._id;
    setSendMessage({...message,receiverId})
  };
 

  //// scoll to bottom
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  },[chat])

  return (
    <Wrapper>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userWantToGet?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          "/users/" +
                          userWantToGet.profilePicture
                        : defaultProfile
                    }
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div
                    className="name"
                    style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                  >
                    <span>
                      {userWantToGet?.firstname} {userWantToGet?.lastname}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            <div className="chat-body">
              {currentMessages.length > 0 &&
                currentMessages.map((el, id) => {
                  return (
                    <div
                    ref= {scroll}
                      key={id}
                      className={
                        el.senderId === currentUser ? "message own" : "message"
                      }
                    >
                      <span>{el.text}</span>
                      <span>{moment(el.createdAt).fromNow()}</span>
                    </div>
                  );
                })}
            </div>

            <div className="chat-sender">
              <div style={{ marginLeft: "2rem" }}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button btn" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2>Tap on a Chat to start a conversation</h2>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .conversation:hover {
    background: #80808038;
    cursor: pointer;
  }
  .message {
    background: var(--buttonBg);
    color: white;
    padding: 0.7rem;
    border-radius: 1rem 1rem 1rem 0;
    max-width: 28rem;
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .message > span:nth-child(2) {
    font-size: 0.7rem;
    color: var(--textColor);
    align-self: end;
  }

  .own {
    align-self: flex-end;
    border-radius: 1rem 1rem 0 1rem;
    background: linear-gradient(98.63deg, #24e4f0 0%, #358ff9 100%);
  }

  .chat-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    overflow: scroll;
    flex: 1;
    background: #ecebe9;
    max-height: 60vh;
  }

  .ChatBox-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: var(--cardColor);
    border-radius: 1rem;
    padding: 1rem;
    height: auto;
    min-height: 80vh;
    overflow: scroll;
  }
  .status {
    margin: 6px 0 0;
    font-weight: bold;
  }
  .conversation {
    border-radius: 0.5rem;
    padding: 10px;
  }

  .conversation > div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .followerImage {
    border-radius: 50%;
  }
  .follower > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .chatbox-empty-message {
    display: flex;
    align-self: center;
    justify-content: center;
    font-size: 20px;
  }
  .chat-sender {
    background: white;
    display: flex;
    /* justify-content: space-between; */
    height: 3.5rem;
    align-items: center;
    /* gap: 0.5rem; */
    padding: 0.8rem;
    border-radius: 1rem;
    align-self: end;
    width: 100%;
  }
  .chat-sender > input {
    height: 70%;
    background-color: rgb(236, 236, 236);
    border-radius: 0.5rem;
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
    padding: 0px 15px 0px 15px;
  }
  .chat-sender > div:nth-of-type(1) {
    background: rgb(233, 233, 233);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
  }
  .chat-sender > div {
    height: 70%;
    padding: 0px 15px 0px 15px;
  }

  @media screen and (max-width: 768px) {
    .Chat {
      grid-template-columns: 16% auto;
    }
 
  }
`;

export default ChatBox;
