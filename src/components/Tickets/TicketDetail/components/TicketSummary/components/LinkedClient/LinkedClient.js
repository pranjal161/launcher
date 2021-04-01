import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.a`
   color: blue;
 `;
const LinkedClient = ({client, url, display}) => (
    <Root href={url}>{client}{display} </Root>
)

LinkedClient.propTypes = {
    client: PropTypes.string,
    url: PropTypes.string
}

export default LinkedClient;
