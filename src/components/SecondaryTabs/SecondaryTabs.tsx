import * as navBarTabsActions from "../../store/actions/navigationBarTabsActions";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import TabButton from '../Tabs/components/TabButton/TabButton';
import styled from 'styled-components';

const TabsButtonsContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #D9D9D9;
    z-index: 41;
`;

const SecondaryTabs = () => {
    const selectedTabObject = useSelector((state:any) => state.navBarTabs.selectedTab);
    const displayedTabsObject = useSelector((state:any) => state.navBarTabs.tabsContentByIDs);
    const dispatch = useDispatch();
    const displayedTabsArray = Object.keys(displayedTabsObject);
    let displaySecTabs = true;
    const history = useHistory();
    const location = useLocation();

    // if the user moves to a new page, make no tabs active
    useEffect(() => {
        if(location.pathname !== '/viewTab')
            dispatch(navBarTabsActions.setSelectedNavBarTabByID('empty string', "ticket"));
    }, [location.pathname]);

    if(!selectedTabObject.id ||
       displayedTabsArray.length == 0)
        displaySecTabs = false;
    
    const changeSecTab = (tabId:string, type:string) => {
        dispatch(navBarTabsActions.setSelectedNavBarTabByID(tabId, type));
        // if the current page opened isn't viewTab, go to it.
        if(location.pathname !== '/viewTab')
            history.push('/viewTab');
    }

    const closeSecTab = (tabId:string) => {
        dispatch(navBarTabsActions.removeNavBarTabByID(tabId));
        // if this will close all opened tabs, go to home page
        if(displayedTabsArray.length === 1 &&
           location.pathname === '/viewTab') {
            history.push('/home');
        }
    }

    return (
        <>
            {
                displaySecTabs &&
            <TabsButtonsContainer>
                {
                    displayedTabsArray.map((tabId, index) => (
                        <TabButton
                            isActive={selectedTabObject.id === tabId}
                            tabId={tabId}
                            label={displayedTabsObject[tabId].displayLabel}
                            onTabClick={() => changeSecTab(tabId, displayedTabsObject[tabId].type)}
                            onTabCloseClick={closeSecTab}
                            minWidth="150px"
                            isNavBar={true}
                            key={index} />))
                }
            </TabsButtonsContainer>
            }
        </>
    );
}

export default SecondaryTabs;