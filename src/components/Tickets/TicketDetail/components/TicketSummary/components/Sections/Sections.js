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
const Sections = ({title, actions, children}) => (
    <>
        <Root>
            <SectionHeader title={title} actions={actions}/>
            <Content>
                {children}
            </Content>
        </Root>
    </>
)

Sections.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    children: PropTypes.string
}

export default Sections;
