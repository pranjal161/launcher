import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.a`
   color: blue;
 `;
const LinkedClient = (props:any) => {
    const {client, url, display} = props;
    return(
        <Root href={url}>{client}{display} </Root>
    )
}

LinkedClient.propTypes = {
    client: PropTypes.any,
    url: PropTypes.string,
    display: PropTypes.any
}

export default LinkedClient;
