import React from "react";
import styled from "styled-components";
import PostContent from "../PostContent/PostContent";
import PostShare from "../postShare/PostShare";
function PostSide({ mypage }) {
  return (
    <Wrapper>
        <PostShare /> 
      <PostContent  mypage={mypage} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  /* overflow: auto; */
`;
export default PostSide;
