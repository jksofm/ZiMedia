import React from 'react'
import styled from "styled-components";
import FollowersCard from '../followersCard/FollowersCard';
import InfoCard from '../infoCard/InfoCard';

import LogoSearch from '../logosearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard';
function ProfileSide({mypage}) {
  return (
    <Wrapper className="ProfileSide">
      {mypage ? <InfoCard /> : ( <ProfileCard/>)}
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

export default ProfileSide