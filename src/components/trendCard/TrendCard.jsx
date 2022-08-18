import React from 'react'
import styled from 'styled-components'
import {TrendData} from "../../Data/TrendDate"
function TrendCard() {
  return (
    <Wrapper>
        <h3>Trends for you</h3>
        {TrendData.map((el,id)=>{
            return <div key={id} className="trend">
                <span>#{el.name}</span>
                <span>{el.shares}k shares</span>

            </div>
        })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--cardColor);
    padding : 1rem;
    border-radius: 1rem;
    padding-left: 2rem;
    margin-top: 30px;
    .trend{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        span:nth-of-type(1){
            font-weight:bold;
        }
        span:nth-of-type(2){
            font-size: 13px;
        }
    }
`

export default TrendCard