import styled from "styled-components";
import React from "react";
import LogoSearch from "../../components/logosearch/LogoSearch";
import { useSelector, useDispatch } from "react-redux";
import { getUserChats } from "../../features/chats/chatSlice";
import Conversation from "../../components/conversation/Conversation";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import Noti from "../../img/noti.png";
import Home from "../../img/home.png";
import Comment from "../../img/comment.png";
import ChatBox from "../../components/chatbox/ChatBox";
import { getAllUsers, getOneUser } from "../../features/users/userSlice";
import { io } from "socket.io-client";
import Logo from "../../img/logo.png"


// import { userInfo } from "os";

function Chat() {
  const { user } = useSelector((store) => store.user);
  const { UserChats } = useSelector((store) => store.chat);
  const [onlineUsers, setOnelineUsers] = React.useState([]);
  const [chats, setChats] = React.useState([]);
  const [sendMessage, setSendMessage] = React.useState(null);
  const [receiveMessage, setReceiveMessage] = React.useState(null);

  const [currentChat, setCurrentChat] = React.useState(null);
  const dispatch = useDispatch();
  //   console.log(currentChat)

  const socket = React.useRef();

  React.useEffect(() => {
    socket.current = io("https://zimedia.herokuapp.com");
    socket.current.emit("new-user-add", user._id);
    const handleGetUser = (users)=>{
      setOnelineUsers(users);

    }
    socket.current.on("get-users", handleGetUser);
    return ()=> socket.current.off("get-users", handleGetUser);

    
  }, [user]);

  ///send Message to socket
  React.useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  ///Receive MEssage from socket
  React.useEffect(() => {
    const handleReceiveMessage = (data)=>{
      setReceiveMessage(data);
    }
    socket.current.on("receive-message", handleReceiveMessage);
    return ()=>socket.current.off("receive-message", handleReceiveMessage)
  }, []);

  React.useEffect(() => {
    // dispatch(getAllUsers());
    dispatch(getUserChats());
   
  }, []);

  const CheckOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member._id !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember._id);
    return online ? true : false;
  };
  return (
    <Wrapper>
      <div className="Left-side-chat">
        <div className="nav-chat">
          <Link to="/">
            <img className="logo-img" src={Logo} />
          </Link>
          <div className="icon-nav">
            <Link to="/">
              <img
                style={{ width: "1.5rem", height: "1.5rem" }}
                src={Home}
                alt=""
              />
            </Link>
            <UilSetting style={{ marginLeft: "6rem" }} />
            <img style={{ marginLeft: "6rem" }} src={Noti} alt="" />
            <Link style={{ marginLeft: "6rem" }} to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        
        </div>
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {UserChats.map((el, id) => {
              return (
                <div
                  onClick={() => {
                    setCurrentChat(el);
                    // console.log("Hi");
                    // console.log(el._id)

                    const userchatwith = el.members.find((ele) => {
                      return ele._id !== user._id;
                    });
                    dispatch(getOneUser(userchatwith._id));
                  }}
                  key={id}
                >
                  <Conversation
                    CheckOnlineStatus={CheckOnlineStatus(el)}
                    data={el}
                    currentUserId={user._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div>
          <div className="navIcons">
            <Link to="/">
              <img
                style={{ width: "1.5rem", height: "1.5rem" }}
                src={Home}
                alt=""
              />
            </Link>
            <UilSetting style={{ marginLeft: "6rem" }} />
            <img style={{ marginLeft: "6rem" }} src={Noti} alt="" />
            <Link style={{ marginLeft: "6rem" }} to="/chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
          <ChatBox
            setSendMessage={setSendMessage}
            chat={currentChat}
            currentUser={user._id}
            receiveMessage={receiveMessage}
          />
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto;
  gap: 1rem;

  .icon-nav{
    img{
      width: 1.5rem;
    height: 1.5rem;
    /* margin-left: 3rem!important; */
    }
  }
  .nav-chat{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 2rem 0;

  }
  @media screen and (max-width: 768px){
      .nav-chat{
        flex-direction: column;
        .logo-img{
          margin-bottom: 1rem;
        }
      }
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 22% auto;
    .Left-side-chat {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .icon-nav{
    display:none;
  }
 
  
    }
    .nav-chat{
      margin : 0;
    }
    .navIcons {
    margin-top: 1rem;
    display: flex !important;;
    justify-content: flex-end;
    /* margin-left : 2rem; */
  }
  }


  .Left-side-chat {
  }
  .navIcons{
    display: none;
  }

  .Chat-container {
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

  .Chat-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .Right-side-chat > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .conversation:hover {
    background: #80808038;
    cursor: pointer;
  }

  .conversation {
    border-radius: 0.5rem;
    padding: 10px;
  }

  .conversation > div {
    position: relative;
  }

  .online-dot {
    background-color: greenyellow;
    border-radius: 50%;
    position: absolute;
    left: 2rem;
    width: 1rem;
    height: 1rem;
  }

  .navIcons > img {
    width: 1.5rem;
    height: 1.5rem;
    /* margin-left : 2rem; */
  }

  .chatbox-empty-message {
    display: flex;
    align-self: center;
    justify-content: center;
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    .Chat {
      grid-template-columns: 16% auto;
    }
   
  }
`;
export default Chat;
