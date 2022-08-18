import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import defaultProfile from "../../img/defaultAvatar.jpg";

function Conversation({ data, currentUserId,CheckOnlineStatus }) {

 
  const [userChatWithData, setUserchatwithData] = React.useState(null);


  React.useEffect(() => {
    
    
    const userchatwith = data.members.find((el) => {
      return el._id !== currentUserId;
    });
    setUserchatwithData(userchatwith);
    
    // console.log(userChatWith)
  }, [data, currentUserId]);
//  console.log(data)
//  console.log(allUsers)
const onlineStatusClass = `online-dot ${CheckOnlineStatus ===false && "offline" }`
  return (
    
    <Wrapper>
      <div className="follower conversation">
        <div>
          <div className={onlineStatusClass}></div>
          <img
            src={
              userChatWithData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER +
                  "/users/" +
                  userChatWithData.profilePicture
                : defaultProfile
            }
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userChatWithData?.firstname} {userChatWithData?.lastname}{" "}
            </span>
            <p className="status">Online</p>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
overflow-y: auto;
max-height: 70vh;
  .conversation:hover {
    background: #80808038;
    cursor: pointer;
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

  .online-dot {
    background-color: greenyellow;
    border-radius: 50%;
    position: absolute;
    left: 2.3rem;
    top: 0;
    width: 0.8rem;
    height: 0.8rem;
  }
  .offline{
    display: none;

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

export default Conversation;
