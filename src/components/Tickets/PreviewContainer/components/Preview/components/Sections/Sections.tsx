import PropTypes from 'prop-types'
import React from 'react';
import SectionHeader from "components/SectionHeader/SectionHeader";
import WithScroll from "components/WithScroll/WithScroll";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex-grow: 1;
`;
const Sections = (props: any) => {
    const { title, actions, children } = props;
    return (
        <>
            <Root>
                <SectionHeader title={title} actions={actions} />
                <Content>
                    <WithScroll visibleHeight={"650px"}>{children}</WithScroll>
                </Content>
            </Root>
        </>
    );
};

Sections.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.any,
    children: PropTypes.any
}

export default Sections;
