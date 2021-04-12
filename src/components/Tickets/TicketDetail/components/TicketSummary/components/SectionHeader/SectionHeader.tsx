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

const SectionHeader = (props: any) => {
    const { id, title, actions, children } = props;

    return (
        <>
            <div>
                <Root {...id}>
                    <Title>{title}</Title>
                    {actions}
                </Root>
                {children}
            </div>
        </>
    )
}

SectionHeader.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.any
}

export default SectionHeader;
