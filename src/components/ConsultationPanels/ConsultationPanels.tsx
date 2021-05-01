import { DoubleArrowIcon, OpenInNewIcon, TabIcon } from "../../assets/svg";

import IconButton from "../IconButton/IconButton";
import PropTypes from "prop-types";
import React from 'react';
import { StyledMainDivider } from "styles/global-style";
import styled from 'styled-components';

const Root = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  width: 434px;
`;
const Row1 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 1 auto;
  height: 52px;
`;
const RowDivider = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  height: 1px;
`;
const Row2 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;
const Toggle = styled.div`
  flex: 0 0 44px;
  display: flex;
  justify-content: center;
  align-self: center;
`;
const Header = styled.div`
  flex: 1 1 auto;
  margin-left: 20px;
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
  flex: 0 0 44px;
`;
const Content = styled.div`
  flex: 1 0 auto;
  width: 100%;
  margin-left: 20px ;
  margin-top: 20px ;
  
`;
const VerticalDivider = styled.div`
  flex: 0 0;
  border: 1px solid #D9E2EC;
`;
const AdjustStyledDivider = styled(StyledMainDivider)`
  margin-left: 20px;
`;

const ConsultationPanels = (props: any) => {
    const { header, content, toolbar, onToggle, onOpenInNew, onNewTab } = props;
    
    return (
        <Root>
            <Row1>
                {onToggle && <Toggle data-test="toggle">
                    <IconButton onClick={onToggle}>
                        <DoubleArrowIcon />
                    </IconButton>
                    <VerticalDivider />
                </Toggle>}

                <Header data-test="header">
                    {header}
                    <HeaderActions>
                        <IconButton onClick={onOpenInNew}>
                            <OpenInNewIcon />
                        </IconButton>
                        <IconButton onClick={onNewTab}>
                            <TabIcon />
                        </IconButton>
                    </HeaderActions>
                </Header>
            </Row1>
            <RowDivider>
                {onToggle && <VerticalDivider />}
                <AdjustStyledDivider />
            </RowDivider>
            <Row2>
                {toolbar && <><Toolbar data-test="toolbar">
                    {toolbar}
                </Toolbar>
                <VerticalDivider /></>}
                <Content data-test="content">
                    {content}
                </Content>
            </Row2>
        </Root>
    )
}

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
    onToggle: PropTypes.func,
    onOpenInNew: PropTypes.func,
    onNewTab: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
}
export default ConsultationPanels
