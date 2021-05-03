const initialState = {
    isPopupWindowWithTabsOpened: false,
    selectedTicketTab: {id: ''},
    ticketIDsTabs: {}
}

const popupWindowTabsReducer = (state = initialState, action:any) => {
    switch(action.type) {
        case 'OPEN_WINDOW_TABS':
            return {...state, isPopupWindowWithTabsOpened: true};
        case 'CLOSE_WINDOW_TABS':
            return {...state, isPopupWindowWithTabsOpened: false, selectedTicketTab: {id: ''}, ticketIDsTabs: {}};
        case 'ADD_TICKET_TAB_BY_ID': {
            let selectedTicketTabObject = {id: action.payload.ticketId};

            if(state.isPopupWindowWithTabsOpened === true) 
                return {...state, 
                    selectedTicketTab: selectedTicketTabObject,
                    ticketIDsTabs: {...state.ticketIDsTabs, 
                        [action.payload.ticketId]: action.payload.displayTicketLabel}};
            else
                return {...state, 
                    isPopupWindowWithTabsOpened: true, 
                    selectedTicketTab: selectedTicketTabObject,
                    ticketIDsTabs: {...state.ticketIDsTabs, 
                        [action.payload.ticketId]: action.payload.displayTicketLabel}};
        }
        case 'REMOVE_TICKET_TAB_BY_ID': {
            let newTicketIDsTabs:any = {...state.ticketIDsTabs};
            let selectedTicketTabObject;
            delete newTicketIDsTabs[action.payload];
            let remainingTicketIds = Object.keys(newTicketIDsTabs);

            if(state.selectedTicketTab.id === action.payload) {                
                if(remainingTicketIds.length > 0)
                    selectedTicketTabObject = {id: remainingTicketIds[0]};
                else
                    selectedTicketTabObject = {id: ''};

                return {...state, 
                    selectedTicketTab: selectedTicketTabObject,
                    ticketIDsTabs: newTicketIDsTabs};

            }
            else {
                return {...state, 
                    ticketIDsTabs: newTicketIDsTabs};
            }
        }

        case 'SELECT_TICKET_TAB_BY_ID': 
            return {...state, selectedTicketTab: {id: action.payload}};


        default:
            return state
    }
}

export default popupWindowTabsReducer;