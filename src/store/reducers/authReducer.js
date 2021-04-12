const initialState = {
    id: undefined,
    email: undefined,
    initials: undefined,
    errorMessage: undefined,
    logged: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNED_SUCCESS':
        case 'SIGNUP_SUCCESS':
            //console.log('SIGNED_SUCCESS', action)
            const {uid: id, email} = action.result.user
            return {...state, logged: true, errorMessage: undefined, id, email}

        case '@@reactReduxFirebase/LOGIN':
            return {...state, logged: true, errorMessage: undefined, id:action.auth.uid, email:action.auth.email}

        case 'SIGNED_ERROR':
            //console.log('SIGNED_ERROR', action)
            return {...state, logged: false, errorMessage: action.error.message, id: undefined}
        case 'SIGNED_OUT':
            //console.log('SIGNED_OUT', action)
            return initialState

        case 'SIGNUP_ERROR':
            return {...state, logged: false, errorMessage: action.error.message, id: undefined}

        default:
            return state
    }
}

export default authReducer
