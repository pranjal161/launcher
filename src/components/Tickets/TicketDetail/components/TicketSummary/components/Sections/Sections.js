import PropTypes from 'prop-types'
import React from 'react';
import SectionHeader from "../SectionHeader/SectionHeader";
import WithScroll from "components/WithScroll/WithScroll";
import styled from "styled-components";


const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex-grow: 1;
`;
const Sections = ({title, actions, children}) => (
    <>
        <Root>
            <SectionHeader title={title} actions={actions}/>
            <Content>
                <WithScroll visibleHeight={"650px"}>
                    {children}
                </WithScroll>
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
