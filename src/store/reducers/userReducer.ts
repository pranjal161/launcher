const initialState = {
    time: undefined,
    status: undefined
}

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'CREATE_USER_REMINDER_SUCCESS':
            return {...state}
        case 'CREATE_USER_REMINDER_ERROR':
            return {...state}
        
        case 'UPDATE_USER_REMINDER_SUCCESS':
            return {...state}
        case 'UPDATE_USER_REMINDER_ERROR':
            return {...state}

        default:
            return state
    }
}

export default userReducer
