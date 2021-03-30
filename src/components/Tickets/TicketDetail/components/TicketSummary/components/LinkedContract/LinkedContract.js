import React from 'react';
import styled from "styled-components";

const Root = styled.a`
   color: blue;
  display: block;
 `;
const LinkedContract = ({client, url}) => (
    <Root href={url}>{client.displayName}</Root>
)

LinkedContract.propTypes = {
    client: PropTypes.string,
    url: PropTypes.string
}

export default LinkedContract;
