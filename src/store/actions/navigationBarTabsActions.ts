export const openNavBarTabs = () => ({
    type: 'OPEN_NAVIGATION_TABS'
})

export const closeNavBarTabs = () => ({
    type: 'CLOSE_NAVIGATION_TABS'
})

export const addNavBarTabByID = (tabId: string, displayTabLabel: string | undefined, type: string | undefined) => ({
    type: 'ADD_NAV_TAB_BY_ID',
    payload: {tabId, displayTabLabel, type}
})

export const removeNavBarTabByID = (tabId: string) => ({
    type: 'REMOVE_NAV_TAB_BY_ID',
    payload: tabId
})

export const setSelectedNavBarTabByID = (tabId: string, type: string) => ({
    type: 'SELECT_NAV_TAB_BY_ID',
    payload: {tabId, type}
})