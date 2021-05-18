const initialState = {
    isNavigationBarTabsOpened: false,

    /**
     * If the user adds a tab by Id, it should be unique.
     * Since tabs have both an Id and type, maybe the function that calls the reducer should combine the type and Id
     * into one string, in case of the possibility that two different types of tabbed object can have the same Id.
     * That way, they will still be unique. 
     * Maybe create a global constants object
     * const tabTypes = {
     *      ticket: 'tckt',
     *      contract: 'cntr',
     *      client: 'clnt'
     * }
     * and get the abbreviation, and add it to the tab Id like this for a ticket - tckt__323Ohb4h308jnjwe3REc356.
     * That way, we can easily cut the Id of the object, should we need it separately.
     */
    selectedTab: {id: ''},
    tabsContentByIDs: {}
}

const navigationBarTabsReducer = (state:any = initialState, action: any) => {
    switch(action.type) {
        case 'OPEN_NAVIGATION_TABS':
            return {
                ...state, 
                isNavigationBarTabsOpened: true
            };

        case 'CLOSE_NAVIGATION_TABS':
            return {
                ...state, 
                isNavigationBarTabsOpened: false, 
                selectedTab: {id: ''}, 
                tabsContentByIDs: {}
            };

        case 'ADD_NAV_TAB_BY_ID': {
            let selectedTabObject = {id: action.payload.tabId};

            if(state.isNavigationBarTabsOpened === true) 
                return {...state, 
                    selectedTab: selectedTabObject,
                    tabsContentByIDs: {
                        ...state.tabsContentByIDs, 
                        [action.payload.tabId]: {
                            displayLabel: action.payload.displayTabLabel,
                            type: action.payload.type
                        }
                    }
                };

            else
                return {...state, 
                    isNavigationBarTabsOpened: true, 
                    selectedTab: selectedTabObject,
                    tabsContentByIDs: {
                        ...state.tabsContentByIDs, 
                        [action.payload.tabId]: {
                            displayLabel: action.payload.displayTabLabel,
                            type: action.payload.type
                        }
                    }
                };

        }
        case 'REMOVE_NAV_TAB_BY_ID': {
            let newTabsByIDs: any = {...state.tabsContentByIDs};
            let selectedTabObject;
            delete newTabsByIDs[action.payload];
            let remainingTabsIds = Object.keys(newTabsByIDs);

            if(state.selectedTab.id === action.payload) {                
                if(remainingTabsIds.length > 0)
                    selectedTabObject = {id: remainingTabsIds[0], type: state.tabsContentByIDs[remainingTabsIds[0]].type};
                else
                    selectedTabObject = {id: '', type: ''};

                return {
                    ...state, 
                    selectedTab: selectedTabObject,
                    tabsContentByIDs: newTabsByIDs
                };

            }
            else {
                return {
                    ...state, 
                    tabsContentByIDs: newTabsByIDs
                };
            }
        }

        case 'SELECT_NAV_TAB_BY_ID': 
            return {
                ...state, 
                selectedTab: {
                    id: action.payload.tabId,
                    type: state.tabsContentByIDs[action.payload.tabId] && state.tabsContentByIDs[action.payload.tabId].type
                }
            };


        default:
            return state
    }
}

export default navigationBarTabsReducer;