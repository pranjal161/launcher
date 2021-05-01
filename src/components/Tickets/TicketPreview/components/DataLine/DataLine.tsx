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
  color: darkgrey;
`;
const Data = styled.h6`
  width: 60%;
  justify-self: left;
  font-weight: 400;
  color: #2b4358;
`;

const DataLine = (props: any) => {
    const { label, children } = props;

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
