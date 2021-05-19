import { shallowEqual, useSelector } from "react-redux";

import { MemoTabViewType } from "./TabViewType";
import React from 'react';

/**
 * Displays content in tabbed view for route '/viewTab'. 
 * The tabs are displayed in component SecondaryTabs, tab content is displayed here.
 * Only one tab can be active at one time, and only its content will be visible.
 * Tabs hide the content with a simple css rule - display: "none". This means that tab content which is a React component is not rerendered, just hidden.
 * This way the state of each React component that is being displayed or hidden, is preserved during tab selection. 
 * Otherwise, on each tab reselect the tab content would revert to its initial state, losing all user made changes that were not saved.
 * Tabs can also be closed to be removed from the tabbed view, and can be dynamically added, without rerendering already added tabs and their content.
 * The component doesn't seem to increase memory usage much - the app starts with a memory use of about 17-18 MB, and opening 4 tabs 
 * containing TicketView components causes an initial bump to about 25 MB, and this is about 1 minute later reduced to about 19-20 MB.
 * Opening 4 tabs containing ContractView components causes an initial bump to about 70 MB, and this is about 1 minute later reduced to about 19-20 MB.
 * Re-renders are optimized to try to keep them to just what is necessary.
 * @constructor 
 * 
 */
const TabView = () => {
    const selectedTabId: string = useSelector((state: any) => state.navBarTabs.selectedTab.id);

    /**
     * use shallowEqual, as this Redux state select hook fetches an object. Since all object in JavaScript are referred to by reference,
     * each time the useSelector runs, it would return a new object reference, thus causing a rerender. 
     * shallowEqual functions like the previous Redux connect mapStateToProps way of settign up a store in a React component.
     */
    const availableTabsObject: any = useSelector((state:any) => state.navBarTabs.tabsContentByIDs, shallowEqual);
    const availableTabsByIDArray: any[] = Object.keys(availableTabsObject);
    let displayDefault = true;

    if(availableTabsByIDArray.length && 
       availableTabsByIDArray.length > 0) {
        
        displayDefault = false;
    }

    return (
        <div>
            {
                displayDefault ? 
                    <div>
                        Content not yet defined
                    </div> : 
                    <div>
                        {
                            availableTabsByIDArray.map((tabId) => (
                                <div 
                                    key={tabId} 
                                    style={(tabId === selectedTabId) ? {} : {display: "none"}}>
                                    <MemoTabViewType 
                                        key={tabId}
                                        tabId={tabId}
                                        type={availableTabsObject[tabId].type} />
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    );
}

export default TabView;