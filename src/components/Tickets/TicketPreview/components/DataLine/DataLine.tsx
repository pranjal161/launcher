import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
`;

const Label = styled.h6`
  width: 40%;
  justify-self: left;
  transform: translate(1 13);
  color: #829ab1;
  font-size: 14px;
`;
const Data = styled.h6`
  transform: translate(0 14);
  font-size: 14px;
  color: #243b53;
  width: 60%;
  justify-self: left;
` ;

const DataLine = (props: any) => {
    const {label, children} = props;

    return (
        <Root>
            <Label>{label}</Label>
            <Data>{children}</Data>
        </Root>
    )
}

DataLine.propTypes = {
    label: PropTypes.any,
    children: PropTypes.any
}

export default DataLine;
