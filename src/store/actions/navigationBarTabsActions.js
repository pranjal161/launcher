export const openNavBarTabs = () => ({
    type: 'OPEN_NAVIGATION_TABS'
})

export const closeNavBarTabs = () => ({
    type: 'CLOSE_NAVIGATION_TABS'
})

export const addNavBarTabByID = (tabId, displayTabLabel, type) => ({
    type: 'ADD_NAV_TAB_BY_ID',
    payload: {tabId, displayTabLabel, type}
})

export const removeNavBarTabByID = (tabId) => ({
    type: 'REMOVE_NAV_TAB_BY_ID',
    payload: tabId
})

export const setSelectedNavBarTabByID = (tabId, type) => ({
    type: 'SELECT_NAV_TAB_BY_ID',
    payload: {tabId, type}
})