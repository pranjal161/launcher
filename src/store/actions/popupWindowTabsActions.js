export const openWindowTabs = () => ({
    type: 'OPEN_WINDOW_TABS'
})

export const closeWindowTabs = () => ({
    type: 'CLOSE_WINDOW_TABS'
})

export const addTicketTabByID = (ticketId, displayTicketLabel) => ({
    type: 'ADD_TICKET_TAB_BY_ID',
    payload: {ticketId, displayTicketLabel}
})

export const removeTicketTabByID = (ticketId) => ({
    type: 'REMOVE_TICKET_TAB_BY_ID',
    payload: ticketId
})

export const setSelectedTicketTabByID = (ticketId) => ({
    type: 'SELECT_TICKET_TAB_BY_ID',
    payload: ticketId
})