import PropTypes from 'prop-types'
import React from 'react';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Title = styled.h6`
  transform:translate(0 13);
  fill:#102a43;
  color: #102A43;
  font-size:14px;
  font-weight: 600;
  margin: 0;
  margin-top: 15px;
`;

const StyledDivider = styled.div`
    display: block;
    width: 100%;
    border-bottom: 1px solid #D9E2EC;
    margin: 7px 0 15px;
`;

const SectionHeader = (props: any) => {
    const { id, title, actions, children } = props;

    return (
        <>
            <div>
                <Root {...id}>
                    <Title>{title}</Title>
                    <StyledDivider />
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
