import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
    color: #829ab1;
    font-size: 14px;
 `;
const LinkedClient = (props:any) => {
    const { display} = props;
    return(
        <Root>{display}</Root>
    )
}

LinkedClient.propTypes = {
    client: PropTypes.any,
    url: PropTypes.string,
    display: PropTypes.any
}

export default LinkedClient;
