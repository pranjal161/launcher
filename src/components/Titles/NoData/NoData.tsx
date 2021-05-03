import React from 'react';
import styled from "styled-components";


const Root = styled.h6`
  margin: 1rem;
  font-weight: 400;
  color: #2b4358;
  margin-block: auto;
  span {
    color: #abbbcb;
  }
`;

const NoData = () => (
    <Root>No data</Root>
);


export default NoData;
