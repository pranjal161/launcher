import React, { useCallback, useEffect, useState } from 'react';

import { MemoTabButton } from './components/TabButton/TabButton';// TabButton,

import styled from 'styled-components';

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

/**
 * Displays content in tabbed view. Only one tab can be active at one time, and only its content would be visible.
 * Tabs hide the content with a simple css rule - display: "none". This means that tab content which is a React component is not rerendered, just hidden.
 * This way the state of each React component that is being displayed or hidden, is preserved during tab selection. 
 * Otherwise, on each tab reselect the tab content would revert to its initial state, losing all user made changes that were not saved.
 * Tabs can also be closed to be removed from the tabbed view, and can be dynamically added, without rerendering already added tabs and their content.
 * The component doesn't seem to increase memory usage much - the app starts with a memory use of about 17-18 MB, and opening a 4 tabs 
 * containing TicketView components causes an initial bump to about 50 MB, and this is about 1 minute later reduced to about 19-20 MB.
 * Re-renders are optimized to try to keep them to just what is necessary.
 * @constructor 
 * @example - how to use the component to render content, also see TicketTabs
 * <Tabs
 *      onTabClick={handleTabSelect}
 *      onTabClose={handleTabClose}>
 *      <Tab
 *          tabId="tab1"
 *          isActiveTab={true}
 *          tabLabel="Tab 1">
 *              <AnyReactComponent />
 *      </Tab>
 *      <Tab
 *          tabId="tab2"
 *          isActiveTab={false}
 *          tabLabel="Tab 2">
 *              <AnyReactComponent />
 *      </Tab>
 * </Tabs>
 * @param {any} children - the component Tab. Its props tabId, isActiveTab and tabLabel are used to render the Tab buttons, 
 * and props children - the tab content.
 * @param {string} [activeTabId = null] - the id of the active tab. The Tab component has a props named tabId, which must match the activeTabId.
 * While the default is null, it is set with a useState to the id of the first Tab component child of Tabs.
 * @param {Function} [onTabClick = null] - the function that handles what happens when the user clicks on a tab.
 * @param {Function} [onTabClose = null] - the function that handles what happens when the user closes a tab.
 */

const Tabs = (props: {children: any, activeTabId?: string, onTabClick?: Function, onTabClose?: Function}) => {

    const {children, activeTabId = null, onTabClick = null, onTabClose = null} = props;
    const [activeTab, setActiveTab] = useState(children[0].props.tabId);

    useEffect(() => {
        if(activeTabId)
            setActiveTab(activeTabId);
    }, [activeTabId]);

    /**
     * This function handles what happens when the user clicks on a tab. 
     * It uses the useCallback React hook to prevent the TabButton component from rendering with no need.
     * @function 
     * @name handleTabChange
     * @param {string} tabId - the id of the clicked tab
     * @returns {void} - if there is an onTabClick props function passed, it is called. If not, just calls the setActiveTab from useState.
     */
    const handleTabChange = useCallback((tabId: string) => {
        if(activeTabId && onTabClick)
            onTabClick(tabId);
        else
            setActiveTab(tabId);
    }, []);

    /**
     * This function handles what happens when the user closes a tab. 
     * It uses the useCallback React hook to prevent the TabButton component from rendering with no need.
     * @function 
     * @name handleTabClose
     * @param {string} tabId - the id of the tab to be closed
     * @returns {void} - if there is an onTabClose props function passed, it is called. If not, exit the function.
     */
    const handleTabClose = useCallback((tabId: string) => {
        if(activeTabId && onTabClose)
            onTabClose(tabId);
    }, [onTabClose]);


    /**
     * The return (render for a React functional component) function handles the display of the component.
     * It uses a styled component to display the tab buttons as MemoTabButton React components.
     * It displays tab content in a div element, which is hidden for all tabIds that are not the active tab Id.
     * It uses children.map for the child component Tab to get the data it needs for renderz, and uses a key that is unique - 
     * the tabId props, to make use of the React optimization engine to avoid rerenders of a component more than what is necessary.
     */
    return (
        <TabsMainContainer>
            <TabsButtonsContainer>
                {
                    children.map((child: any) => (
                        <MemoTabButton
                            key={child.props.tabId}
                            isActive={child.props.tabId === activeTab}
                            tabId={child.props.tabId}
                            label={child.props.tabLabel ? child.props.tabLabel : 'Loading'}
                            onTabClick={handleTabChange}
                            onTabCloseClick={handleTabClose}
                        />)
                    )
                }
            </TabsButtonsContainer>
            {
                children.map((child: any) => (
                    <div 
                        key={child.props.tabId} 
                        style={(child.props.tabId === activeTab) ? {} : {display: "none"}}>
                        {child.props.children}
                    </div>
                ))
            }
        </TabsMainContainer>
    );
}

export default Tabs;