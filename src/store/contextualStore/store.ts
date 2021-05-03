// action creators
export const setFocus = (focus: any) => ({
    type: 'SET_FOCUS', focus
});
export const setCurrentSection = (sectionId: any) => ({
    type: 'SET_SECTION',
    sectionId
})

export const selectTicket = (ticketId: undefined) => ({
    type: 'SELECT_TICKET',
    ticketId,
});

export const closeTicketDetail = () => ({
    type: 'CLOSE_TICKET_DETAIL'
});


// reducer
export const initialState = {
    ticketId: undefined,
    sectionId: undefined,
};

export const reducer = (state = initialState, action: { type: any; sectionId: any; ticketId: any; }) => {
    switch (action.type) {
        case 'SET_SECTION':
            return {...state, sectionId: action.sectionId};
        case 'SELECT_TICKET':
            return {...state, sectionId: 'info', ticketId: action.ticketId, openTicketDetail: true};
        case 'CLOSE_TICKET_DETAIL':
            return {...state, ticketId: undefined, openTicketDetail: false};

        default:
            return state;
    }
};
