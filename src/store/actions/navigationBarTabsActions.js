export const openNavBarTabs = () => ({
    type: 'OPEN_NAVIGATION_TABS'
})

export const closeNavBarTabs = () => ({
    type: 'CLOSE_NAVIGATION_TABS'
})

export const addNavBarTabByID = (tabId, displayTabLabel) => ({
    type: 'ADD_NAV_TAB_BY_ID',
    payload: {tabId, displayTabLabel}
})

export const removeNavBarTabByID = (tabId) => ({
    type: 'REMOVE_NAV_TAB_BY_ID',
    payload: tabId
})

export const setSelectedNavBarTabByID = (tabId) => ({
    type: 'SELECT_NAV_TAB_BY_ID',
    payload: tabId
})