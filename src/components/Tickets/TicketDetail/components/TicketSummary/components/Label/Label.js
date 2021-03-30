import React from 'react';
import styled from "styled-components";
export const Root = styled.label`
  color: gray;
`;
const Label = ({children}) => {
    return (
        <Root>{children}</Root>
    );
}

export default Label;
