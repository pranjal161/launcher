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

const SummaryHeader = (props: any) => {
    const { title, actions, children } = props;
    return (
        <>
            <Root>
                <Title>{title}</Title>
                {actions}
            </Root>
            {children}
        </>
    );
};

SummaryHeader.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.any
}

export default SummaryHeader;
