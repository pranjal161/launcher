import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.span`
  color: #102A43;
  justify-self: left;
  font-size: larger;
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
    id: PropTypes.string,
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.string
}

export default SectionHeader;
