import * as popupWindowActions from "../../store/actions/popupWindowTabsActions";

import React, {useEffect, useState} from 'react';

import TabButton from './components/TabButton/TabButton';
import styled from 'styled-components';
import {useDispatch} from "react-redux";

const TabsMainContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const TabsButtonsContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #D9D9D9;
`;


const Tabs = (props: {children: any, activeTabId: string}) => {

    const {children, activeTabId} = props;
    const [activeTab, setActiveTab] = useState(children[0].props.tabId);
    let tabContent = null;
    let dispatch = useDispatch();
    useEffect(() => {
        setActiveTab(activeTabId);
    }, [activeTabId]);


    const changeTab = (tabId: string) => {
        if(activeTabId)
            dispatch(popupWindowActions.setSelectedTicketTabByID(tabId));
        else
            setActiveTab(tabId);
    }

    const handleTabClose = (tabId: string) => {
        for(let i = 0; i < children.length; i++) {
            if(children[i].props.tabId === tabId) {
                let onTabCloseClick = children[i].props.onTabCloseClick;
                onTabCloseClick(tabId);
                break;
            }
        }
    }

    return (
        <TabsMainContainer>
            <TabsButtonsContainer>
                {
                    children.map((child: any) => {
                        if(child.props.tabId === activeTab) 
                            tabContent = child.props.children;
                        return (
                            <TabButton
                                key={child.props.tabId}
                                isActive={child.props.tabId === activeTab}
                                tabId={child.props.tabId}
                                label={child.props.tabLabel ? child.props.tabLabel : 'Loading'}
                                onTabClick={() => changeTab(child.props.tabId)}
                                onTabCloseClick={() => handleTabClose(child.props.tabId)}
                            />
                        )
                    })
                }

            </TabsButtonsContainer>

            <div>
                {tabContent}
            </div>

        </TabsMainContainer>
    );
}

export default Tabs;
