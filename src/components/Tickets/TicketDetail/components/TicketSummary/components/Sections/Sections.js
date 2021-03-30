import React from 'react';
import SectionHeader from "../SectionHeader/SectionHeader";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y:hidden;
`;
const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  
`;
const Sections = ({title, actions, children}) => {
    return (
        <>
            <Root>
                <SectionHeader title={title} actions={actions}/>
                <Content>
                    {children}
                </Content>
            </Root>
        </>
    );
}

export default Sections;
