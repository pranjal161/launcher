import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex ;
  justify-content: space-between;
  margin-bottom: 12px; 
`;
const Title = styled.span`
  justify-self: left;
   font-weight: bolder;
   font-size: larger;
 `;

const SummaryHeader = ({title, actions, children}) => (
    <>
        <Root>
            <Title>{title}</Title>
            {actions}
        </Root>
        {children}
    </>
)

SummaryHeader.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.string
}

export default SummaryHeader;
