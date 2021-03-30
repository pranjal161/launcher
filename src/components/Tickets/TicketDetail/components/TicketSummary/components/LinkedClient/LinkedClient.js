import React from 'react';
import styled from "styled-components";
const Root = styled.a`
   color: blue;
 `;
const LinkedClient = ({client, url}) => {
    return (
        <Root href={url}>{client.displayName}</Root>
    );
}

export default LinkedClient;
