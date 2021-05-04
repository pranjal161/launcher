const initialState = {
    createTicketStatus: undefined,
    updateTicketStatus: undefined,
    deleteTicketStatus: undefined,
    assignTicketStatus: undefined,
    selectedTicketId: undefined,
    history: []
}

const ticketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'CREATE_TICKET_PENDING':
            return {...state, createTicketStatus: 'pending'}
        case 'CREATE_TICKET_SUCCESS':
            return {...state, createTicketStatus: 'done'}
        case 'CREATE_TICKET_ERROR':
            return {...state, createTicketStatus: 'error'}

        case 'UPDATE_TICKET_PENDING':
            return {...state, updateTicketStatus: 'pending'}
        case 'UPDATE_TICKET_SUCCESS':
            return {...state, updateTicketStatus: 'done'}
        case 'UPDATE_TICKET_ERROR':
            return {...state, updateTicketStatus: 'error'}

        case 'DELETE_TICKET_PENDING':
            return {...state, deleteTicketStatus: 'pending'}
        case 'DELETE_TICKET_SUCCESS':
            return {...state, deleteTicketStatus: 'done'}
        case 'DELETE_TICKET_ERROR':
            return {...state, deleteTicketStatus: 'error'}

        case 'ASSIGN_TICKET_PENDING':
            return {...state, assignTicketStatus: 'pending'}
        case 'ASSIGN_TICKET_SUCCESS':
            return {...state, assignTicketStatus: 'done'}
        case 'ASSIGN_TICKET_ERROR':
            return {...state, assignTicketStatus: 'error'}
        case 'CREATED_BY_TICKET_PENDING':
            return {...state}
        case 'CREATED_BY_TICKET_SUCCESS':
            return {...state}
        case 'CREATED_BY_TICKET_ERROR':
            return {...state}
        case 'SELECT_TICKET':
            return {...state, selectedTicketId: action.id}
        case 'UNSELECT_TICKET':
            return {...state, selectedTicketId: undefined}
        case 'ADD_RELATED_CLIENT_TICKET_SUCCESS':
            return {...state}
        case 'ADD_RELATED_CLIENT_TICKET_ERROR':
            return {...state}
        case 'ADD_RELATED_CONTRACT_TICKET_SUCCESS':
            return {...state}
        case 'ADD_RELATED_CONTRACT_TICKET_ERROR':
            return {...state}
        default:
            return state
    }
}
export default ticketReducer
