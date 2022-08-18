import React from 'react'
import styled from 'styled-components'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'

import {UilSetting} from '@iconscout/react-unicons'
import TrendCard from '../trendCard/TrendCard'
import ShareModal from '../shareModal/ShareModal'
import {Link} from "react-router-dom"

function RightSide() {
    const [modalOpend,setModalOpend] = React.useState(false);
  return (
    <Wrapper>
       <div className="navIcons">
        <Link to="/">

        <img style={{width: "1.5rem",height: "1.5rem"}} src={Home} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to="/chat">

        <img src={Comment} alt="" />
        </Link>
       </div>
        <div className="trend-card">

       <TrendCard />
       <button className="btn btn-trend-share" onClick={()=>setModalOpend(true)}>Share
       </button>
        </div>
       <ShareModal modalOpened = {modalOpend} setModalOpend={setModalOpend} />
    </Wrapper>
  )
}
const Wrapper = styled.div`

    .RightSide{
        display: flex;
        flex-direction: column;
        gap : 2rem;
    }
    .navIcons {
        margin-top: 1rem;
        display : flex;
        justify-content: space-between;
    }
    .navIcons >img{
        width: 1.5rem;
        height: 1.5rem;
    }
    .btn-trend-share{
        height: 3rem;
        width: 80%;
        align-self: center;
      
        margin : 30px auto 0;
    }
`

export default RightSide