import React from 'react';
import styled from "styled-components";


const Root = styled.h5`
  font-weight: 600;
  color: #2b4358;
  margin-block: auto;
  span {
    color: #abbbcb;
  }
`;

const TitleMedium = (props: { title: string, count?: any }) => (
    <Root>{props.title}
        {props.count && <span>{` (${props.count})`}</span>}</Root>
);


export default TitleMedium;
