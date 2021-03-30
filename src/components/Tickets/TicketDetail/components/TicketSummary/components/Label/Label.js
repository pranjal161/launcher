import React from 'react';
import styled from "styled-components";

export const Root = styled.label`
  color: gray;
`;
const Label = ({children}) => (
    <Root>{children}</Root>
)

Label.propTypes = {
    children: PropTypes.string
}

export default Label;
