import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

export const Root = styled.label`
  color: gray;
`;
const Label = (child:any) => {
    const { children } = child;
    return (
        <Root>{children}</Root>
    )
}

Label.propTypes = {
    children: PropTypes.any
}

export default Label;
