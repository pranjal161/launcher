import React from 'react';
import styled from "styled-components";

const Root = styled.a`
   color: blue;
 `;
const LinkedClient = ({client, url}) => (
    <Root href={url}>{client.displayName}</Root>
)

LinkedClient.propTypes = {
    client: PropTypes.string,
    url: PropTypes.string
}

export default LinkedClient;
