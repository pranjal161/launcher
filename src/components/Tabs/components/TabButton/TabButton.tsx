import { CloseIcon } from "../../../../assets/svg";
import React from 'react';
import styled from 'styled-components';

interface TabButtonComponentProps{
    isActive: boolean,
    isNavBar?: boolean,
    minWidth?: string,
    maxWidth?: string
}

const TabButtonComponent = styled.div`
    
    border-bottom: unset;
    opacity: ${(props: TabButtonComponentProps) => (props.isActive ? 1 : 0.5)};
    color: ${(props) => (props.isActive ? '#000000' : '#000000A3')};
    background-color: ${(props) => (props.isNavBar ? '#F4F6F9' : '#FFFFFF')};
    ${(props) => (props.isNavBar ? 'border-right: solid 1px #DBE3EC;' : '')}
    transition: all .5s ease;
    max-width: ${(props) => (props.maxWidth ? props.maxWidth : '270px')};

    &::after {
        content: "";
        height: 2px;
        width: ${(props) => (props.isActive ? '100%' : '0px')};
        margin: auto;
        display: block;
        position: relative;
        top: 2px;
        background-color: ${(props) => (props.isNavBar ? '#223A51' : '#6F2C91')};;
        transition: all .5s ease;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
        min-width: ${(props) => (props.minWidth ? props.minWidth : '220px')};
        padding: 0px 5px;
    }

    & > div > span {
        padding-left: 5px;
        ${(props) => (props.isNavBar && props.isActive ? 'font-weight: bold;' : '')}
    }

    & > div > span:first-child {
        flex-grow: 1;
        text-align: left;
        padding-left: 5px;
        padding-right: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;


const TabButton = ( props : {
                                isActive: boolean,
                                tabId: string,
                                tabType?: string,
                                label: string,
                                onTabClick?: any,
                                onTabCloseClick?: Function
                                minWidth?: string,
                                isNavBar?: boolean}) => {

    const { 
        isActive = false,
        tabId,
        tabType = null,
        label = "Loading",
        onTabClick,
        onTabCloseClick,
        minWidth = undefined,
        isNavBar = false
    } = props;


    const handleTabClose = (e: React.ChangeEvent<any>) => {
        e.stopPropagation();
        if(onTabCloseClick) {
            if(tabType === null)
                onTabCloseClick(tabId);
            else
                onTabCloseClick(tabId, tabType);
        }
    }

    const handleTabClick = (e: React.ChangeEvent<any>) => {
        e.stopPropagation();
        if(onTabClick)
            onTabClick(tabId);
    }

    return (
        <TabButtonComponent 
            isActive={isActive}
            onClick={handleTabClick}
            minWidth={minWidth}
            isNavBar={isNavBar}>
            <div title={label}>
                <span>{label}</span>
                <span 
                    data-test="close-icon"
                    onClick={handleTabClose}>
                    <CloseIcon />
                </span>
            </div>
        </TabButtonComponent>
    );
}

export default TabButton;

/**
 * Export a memoised version of the component to avoid unnecessary rerenders if no props are changed.
 */
export const MemoTabButton = React.memo(TabButton);