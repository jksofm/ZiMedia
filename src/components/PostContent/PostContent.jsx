import React from "react";
import styled from "styled-components";

import PostSingle from "../postSingle/PostSingle";
import { useDispatch, useSelector } from "react-redux";
import { getTimeLinePost,getMyPost } from "../../features/posts/postSlice";

function PostContent({mypage}) {
  const dispatch = useDispatch();

  const { timelinepost, isLoading,mypost,isLoadingNewPost } = useSelector((store) => store.post);

  React.useEffect(() => {
    dispatch(getTimeLinePost());
    dispatch(getMyPost());
  }, [isLoadingNewPost]);


  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading....</h1>
      </Wrapper>
    );
  }
  if(mypage){
    return (
      <Wrapper>
        {mypost.map((post, id) => {
          return <PostSingle key={id} post={post} id={id} />;
        })}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {timelinepost.map((post, id) => {
        return <PostSingle key={id} post={post} id={id} />;
      })}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export default PostContent;
