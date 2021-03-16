const initialState = {
    createTicketStatus:undefined,
    updateTicketStatus:undefined,
    deleteTicketStatus:undefined,
    assignTicketStatus:undefined,
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TICKET_PENDING':
            return {...state, createTicketStatus:'pending'}
        case 'CREATE_TICKET_SUCCESS':
            return {...state, createTicketStatus:'done'}
        case 'CREATE_TICKET_ERROR':
            return {...state, createTicketStatus:'error'}

        case 'UPDATE_TICKET_PENDING':
            return {...state, updateTicketStatus:'pending'}
        case 'UPDATE_TICKET_SUCCESS':
            return {...state, updateTicketStatus:'done'}
        case 'UPDATE_TICKET_ERROR':
            return {...state, updateTicketStatus:'error'}

        case 'DELETE_TICKET_PENDING':
            return {...state, deleteTicketStatus:'pending'}
        case 'DELETE_TICKET_SUCCESS':
            return {...state, deleteTicketStatus:'done'}
        case 'DELETE_TICKET_ERROR':
            return {...state, deleteTicketStatus:'error'}

        case 'ASSIGN_TICKET_PENDING':
            return {...state, assignTicketStatus:'pending'}
        case 'ASSIGN_TICKET_SUCCESS':
            return {...state, assignTicketStatus:'done'}
        case 'ASSIGN_TICKET_ERROR':
            return {...state, assignTicketStatus:'error'}

        default:
            return state
    }
}
export default ticketReducer
