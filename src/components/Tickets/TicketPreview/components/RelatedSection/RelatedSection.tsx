import { DxcLink } from '@dxc-technology/halstack-react';
import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  button {
      text-align: left;
      margin-bottom: 7px;

      & > div {
        font-size: 14px;
        line-height: 18px;
      }
  }
`;

const RelatedSection: any = (props: { value: any, onClick: any }) => {
    const handleOnClick = () => props.onClick && props.onClick(props.value)
    return (<Root className="row">
        <div className="col-12"><DxcLink onClick={handleOnClick} text={props.value.title}></DxcLink></div>
    </Root>)
}

RelatedSection.propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func
}

export default RelatedSection;