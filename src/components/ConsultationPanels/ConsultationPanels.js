/* eslint-disable no-unused-vars */
import {DoubleArrowIcon, OpenInNew, OpenInNewIcon, Tab, TabIcon} from "../../assets/svg";
import PropTypes from "prop-types";
import React from 'react';
import styled from 'styled-components';


//Stylesheet
export const Root = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
`;

const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 1 auto;
  height: 52px;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;


const Toggle = styled.div`
  flex: 0 0 52px;
  display: flex;
  justify-content: center;
  align-self: center;
`;

const Header = styled.div`
  background-color: lightsteelblue;
  flex: 1 1 auto;
  padding-inline: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderActions = styled.div`
  flex: 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Toolbar = styled.div`
  background-color: lightcoral;
  flex: 0 0 52px;
`;

const Content = styled.div`
  background-color: lightgreen;
  flex: 1 0 auto;
`;

const ConsultationPanels = ({header, content, toolbar, onOpenInNew, onNewTab}) => (
    <Root>
        <Row1>
            <Toggle data-test="toggle">
                <DoubleArrowIcon/>
            </Toggle>
            <Header data-test="header">
                {header}
                <HeaderActions>
                    <div onClick={onOpenInNew}><OpenInNewIcon /></div>
                    <div onClick={onNewTab}><TabIcon /></div>
                </HeaderActions>
            </Header>
        </Row1>
        <Row2>
            <Toolbar data-test="toolbar">{toolbar}</Toolbar>
            <Content data-test="content">{content}</Content>
        </Row2>

    </Root>)

ConsultationPanels.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    toolbar: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    onOpenInNew: PropTypes.func,
    onNewTab: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
}
export default ConsultationPanels
