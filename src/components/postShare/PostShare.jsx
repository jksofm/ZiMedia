import React, { useState, useRef } from "react";
import styled from "styled-components";
import ProfileImg from "../../img/profileImg.jpg";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import defaultProfile from "../../img/defaultAvatar.jpg";

import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import {createPost} from "../../features/posts/postSlice"

function PostShare() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const imageRef = useRef();
  const descRef = useRef();
  const { user } = useSelector((store) => store.user);
  const { isLoading } = useSelector((store) => store.post);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  
  };
  const handleShare = (e) => {
    e.preventDefault();
    let newPost;
    if (!image) {
      newPost = {
        userId: user._id,
        desc: description,
      };
   
    } else {
      // const image = document.getElementById("imagePost");
      newPost = new FormData();
      newPost.append("userId", user._id);
      newPost.append("desc", description);
      newPost.append("image", image);

      // console.log(data)

      // console.log(imageRef)
    }
    dispatch(createPost(newPost))
    setDescription("")
    setImage(null);

    
    

  };
  const handleSetting = ()=>{
    toast.error("This feature is not updated!Please try again later!")
  }
  return (
    <Wrapper>
      <img src={ user?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          "/users/" +
                          user.profilePicture
                        : defaultProfile} alt="Profile Image" />
      <div>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is happening?"
          ref = {descRef}
        />
        <div className="postOptions">
          <div
            style={{ color: "var(--photo)" }}
            className="option"
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div onClick={handleSetting} style={{ color: "var(--video)" }} className="option">
            <UilPlayCircle />
            Video
          </div>
          <div onClick={handleSetting} style={{ color: "var(--location)" }} className="option">
            <UilLocationPoint />
            Location
          </div>
          <div onClick={handleSetting}  style={{ color: "var(--shedule)" }} className="option">
            <UilSchedule />
            Schedule
          </div>
          <button className="btn share-btn" onClick={handleShare}>
            {isLoading ? "Loading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="imagePost"
              onChange={handleImage}
              ref={imageRef}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes className="close" onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="Preview Image" />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.form`
  display: flex;
  gap: 1rem;
  background-color: var(--cardColor);
  padding: 1rem;
  border-radius: 1rem;
  /* align-items : center; */
  & > img {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
  & > div {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 1rem;
  }
  & > div > input {
    background-color: var(--inputColor);
    border-radius: 10px;
    padding: 30px;
    font-size: 17px;
    border: none;
    outline: none;
  }
  .postOptions {
    display: flex;
    justify-content: space-around;
  }
  .option {
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
  }
  .share-btn {
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 12px;
  }
  .previewImage {
    position: relative;
    img {
      width: 100%;
      /* height:40vh; */
      object-fit: cover;
      max-height: 20rem;
    }
    .close {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      /* color: var(--orange); */
      cursor: pointer;
      background-color: white;
      border-radius: 50%;
      color: var(--orange);
    }
  }
`;

export default PostShare;
