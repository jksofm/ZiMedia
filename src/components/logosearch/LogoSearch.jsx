import React from 'react'
import styled from "styled-components";
import Logo from "../../img/logo.png"
import {UilSearch} from '@iconscout/react-unicons'
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,

  getOneUser,
} from "../../features/users/userSlice";

function LogoSearch() {
  const [input,setInput] = React.useState("")
  const dispatch = useDispatch();
  React.useEffect(()=>{
      dispatch(getAllUsers({q : input}))
  },[input])

  return (
    <Wrapper>
      <Link to="/">

      <img src={Logo} />
      </Link>
     <div className="Search">
      <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder= "#Explore" />
      <div className="s-icon">
               <UilSearch/>
      </div>
     </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
 display : flex;
 gap:0.75rem;

.Search{
  display : flex;
  background-color: var(--inputColor);
  border-radius: 10px;
  padding: 5px;
}
input {
  background-color: transparent;
  border : none;
  outline: none;

}
.s-icon{
  display :flex;
  align-items:center;
  justify-content: center;
  background : var(--buttonBg);
  border-radius: 5px;
  padding : 4px;
  color : white;
  &:hover {
    cursor: pointer;
  }
}
`
export default LogoSearch