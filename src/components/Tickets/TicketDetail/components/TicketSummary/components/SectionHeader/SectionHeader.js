import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px; //change to use theme.space and not in px
`;
const Title = styled.span`
  justify-self: left;
  font-weight: bold;
`;

const SectionHeader = ({id, title, actions, children}) => (
    <>
        <div >
            <Root sectionId={id}>
                <Title>{title}</Title>
                {actions}
            </Root>
            {children}
        </div>
    </>
)

SectionHeader.propTypes = {
    id: propTypes.string,
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.string
}

export default SectionHeader;
