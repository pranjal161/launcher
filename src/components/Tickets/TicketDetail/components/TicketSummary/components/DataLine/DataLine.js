import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px
`;

const Label = styled.div`
  width: 50%;
  justify-self: left;
`;
const Data = styled.div`
  width: 50%;
  justify-self: left;
`;

const DataLine = ({label, children}) => {
    return (
        <Root>
            <Label>{label}</Label>
            <Data>{children}</Data>
        </Root>
    );
}

export default DataLine;
