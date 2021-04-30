import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.a`
  color: blue;
  display: block;
  margin-bottom: 4px;
`;

const RelatedContract: any = (props: { value: any, onClick :any }) => {
    const handleOnClick = () => props.onClick && props.onClick(props.value)
    return (<Root onClick={handleOnClick}>{props.value.title}</Root>)
}

RelatedContract.propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func
}

export default RelatedContract;
