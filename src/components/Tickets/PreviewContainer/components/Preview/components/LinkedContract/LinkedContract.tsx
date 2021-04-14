import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.a`
   color: blue;
  display: block;
 `;
const LinkedContract:any = (props:any) => {
    const {client, url} = props;
    return (
        <Root href={url}>{client.displayName}</Root>
    )
}

LinkedContract.propTypes = {
    client: PropTypes.any,
    url: PropTypes.any
}

export default LinkedContract;
