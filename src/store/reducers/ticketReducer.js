const initialState = {
    tickets: [
    ]
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TICKET':
            console.log('CREATE TICKET', action.ticket)
            return state
        case 'CREATE_TICKET_ERROR':
            console.log('CREATE TICKET error', action.err)
            return state
        default:
            return state
    }
}
export default ticketReducer
