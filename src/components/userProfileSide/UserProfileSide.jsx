import React from 'react'
import styled from "styled-components";
import FollowersCard from '../followersCard/FollowersCard';


import LogoSearch from '../logosearch/LogoSearch'

import UserInfoCard from '../userInfoCard/UserInfoCard';
function UserProfileSide({userInfo}) {
  
  return (
    <Wrapper className="ProfileSide">
      
       <UserInfoCard {...userInfo}/>
      <LogoSearch />
      <FollowersCard/>
     
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap : 1rem;
  align-items: center;
  /* overflow: auto; */

`

export default UserProfileSide