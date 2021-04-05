import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  height: 30px;
`;

const Label = styled.div`
  width: 40%;
  justify-self: left;
`;
const Data = styled.div`
  width: 60%;
  justify-self: left;
`;

const DataLine = ({label, children}) => (
    <Root>
        <Label>{label}</Label>
        <Data>{children}</Data>
    </Root>
)

DataLine.propTypes = {
    label: PropTypes.string,
    children: PropTypes.string
}

export default DataLine;
