import {CloseIcon} from "../../../../assets/svg";
import React from 'react';
import styled from 'styled-components';

interface TabButtonComponentProps{
    isActive: boolean
}

const TabButtonComponent = styled.div`
    
    border-bottom: unset;
    opacity: ${(props: TabButtonComponentProps) => (props.isActive ? 1 : 0.5)};
    color: ${(props: TabButtonComponentProps) => (props.isActive ? '#000000' : '#000000A3')};
    transition: all .5s ease;

    &::after {
        content: "";
        height: 2px;
        width: ${(props: TabButtonComponentProps) => (props.isActive ? '100%' : '0px')};
        margin: auto;
        display: block;
        position: relative;
        top: 2px;
        background-color: #6F2C91;
        transition: all .5s ease;
    }

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
        min-width: 220px;
        padding: 0px 5px;
    }

    & > div > span {
        padding-left: 5px;
    }

    & > div > span:first-child {
        flex-grow: 1;
        text-align: left;
        padding-left: 5px;
    }
`;


const TabButton = ( props : {
                                isActive: boolean,
                                tabId: string,
                                label: string,
                                onTabClick: any,
                                onTabCloseClick: Function}) => {

    const { 
        isActive = false,
        tabId,
        label = "Loading",
        onTabClick,
        onTabCloseClick
    } = props;


    const handleTabClose = (e: React.ChangeEvent<any>, tabId: string) => {
        e.stopPropagation();
        onTabCloseClick(tabId);
    }

    return (
        <TabButtonComponent 
            isActive={isActive}
            onClick={onTabClick}>
            <div>
                <span>{label}</span>
                <span onClick={(e) => handleTabClose(e, tabId)}>
                    <CloseIcon />
                </span>
            </div>
        </TabButtonComponent>
    );
}

export default TabButton;