import React from 'react';
import styled from "styled-components";


const Root = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2b4358;
  margin-block: auto;
  span {
    color: #abbbcb;
  }
`;


const TitleBig = (props: { title: string, count?: any }) => (
    <Root>{props.title}
        {props.count >= 0 && <span>{` (${props.count})`}</span>}</Root>
);


export default TitleBig;
