const initialState = {
    isNavigationBarTabsOpened: false,
    selectedTab: {id: '', type: ''},
    tabsContentByIDs: {}
}

const navigationBarTabsReducer = (state = initialState, action) => {
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
                selectedTab: {id: '', type: ''}, 
                tabsContentByIDs: {}
            };

        case 'ADD_NAV_TAB_BY_ID': {
            let selectedTabObject = {id: action.payload.tabId, type: action.payload.type};

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
            let newTabsByIDs = {...state.tabsContentByIDs};
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
