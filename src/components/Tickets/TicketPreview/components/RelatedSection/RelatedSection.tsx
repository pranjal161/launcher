import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.a`
  display: block;
  margin-bottom: 4px;
  color:#0b69a3;
  font-size:14px;
`;

const RelatedSection: any = (props: { value: any, onClick: any, rowTitle: string }) => {
    const handleOnClick = () => props.onClick && props.onClick(props.value)
    return (<div className="row">
        <div className="col-5">{props.rowTitle}</div>
        <div className="col-7 pl-0"><Root onClick={handleOnClick}>{props.value.title}</Root></div>
    </div>)
}

RelatedSection.propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func
}

export default RelatedSection;