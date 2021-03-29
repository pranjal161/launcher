import React from 'react';
import styled from "styled-components";
const Root = styled.a`
   color: blue;
  display: block;
 `;
const LinkedContract = ({client, url}) => {
    return (
        <Root href={url}>{client.displayName}</Root>
    );
}

export default LinkedContract;
