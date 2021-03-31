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

const SectionHeader = ({id, title, actions, children}) => {
    return (
        <>
            <div >
                <Root sectionId={id}>
                    <Title>{title}</Title>
                    {actions}
                </Root>
                {children}
            </div>
        </>
    );
}

export default SectionHeader;
