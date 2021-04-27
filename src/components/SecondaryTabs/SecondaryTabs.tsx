import * as navBarTabsActions from "../../store/actions/navigationBarTabsActions";

import { useDispatch, useSelector } from "react-redux";

import React from 'react';
import TabButton from '../Tabs/components/TabButton/TabButton';

import styled from 'styled-components';

const TabsButtonsContainer = styled.div`
    display: flex;
    border-bottom: 2px solid #D9D9D9;
`;

const SecondaryTabs = () => {
    const selectedTabObject = useSelector((state:any) => state.navBarTabs.selectedTab);
    const displayedTabsObject = useSelector((state:any) => state.navBarTabs.tabsContentByIDs);
    const dispatch = useDispatch();
    const displayedTabsArray = Object.keys(displayedTabsObject);
    let displaySecTabs = true;

    if(!selectedTabObject.id ||
       displayedTabsArray.length == 0)
        displaySecTabs = false;
    
    const changeSecTab = (tabId:string) => {
        dispatch(navBarTabsActions.setSelectedNavBarTabByID(tabId));
    }

    const closeSecTab = (tabId:string) => {
        dispatch(navBarTabsActions.removeNavBarTabByID(tabId));
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
                            onTabClick={() => changeSecTab(tabId)}
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
