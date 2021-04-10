import {DoubleArrowIcon} from "assets/svg";
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
  height: 36px;
`;

const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;


const Toggle = styled.div`
  flex: 0 0 30px;
  justify-self: center;
  align-self: center;
`;

const Header = styled.div`
  background-color: lightsteelblue;
  flex: 1 1 auto;
`;

const Toolbar = styled.div`
  background-color: lightcoral;
  flex: 0 0 30px;
`;

const Content = styled.div`
  background-color: lightgreen;
  flex: 1 0 auto;
`;

const ConsultationPanels = () => (
    <Root>
        <Row1>
            <Toggle data-test="toggle">
                <DoubleArrowIcon/></Toggle>
            <Header data-test="header">
                Header
            </Header>
        </Row1>
        <Row2>
            <Toolbar data-test="toolbar">TB</Toolbar>
            <Content data-test="content">Content</Content>
        </Row2>

    </Root>)
export default ConsultationPanels
