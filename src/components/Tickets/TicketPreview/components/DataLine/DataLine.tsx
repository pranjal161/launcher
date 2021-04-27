import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
`;

const Label = styled.div`
  width: 40%;
  justify-self: left;
  font-size: 13px;

  label {
    color: #abbbcb;
  }
`;
const Data = styled.div`
  width: 60%;
  justify-self: left;
  font-size: 13px;
  color: #2b4358;
`;

const DataLine = (props: any) => {
    const { label, children } = props;

    return (
        <Root>
            <Label className="mt-1">{label}</Label>
            <Data>{children}</Data>
        </Root>
    )
}

DataLine.propTypes = {
    label: PropTypes.any,
    children: PropTypes.any
}

export default DataLine;
