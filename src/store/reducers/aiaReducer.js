const initialState = {
    hRefs: {}
}

const aiaReducer = (state = initialState, action) => {
    const {hRef, data, error, timestamp} = action
    const newState = {...state}

    switch (action.type) {
        case 'FETCH_HREF_START':
            //If hRef not exist, we add it
            if (!newState.hRefs[action.hRef])
                newState.hRefs[action.hRef] = {status:'fetching', hRef, timestamp}
            return newState

        case 'FETCH_HREF_SUCCESS':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'success', data, timestamp}
            return newState

        case 'FETCH_HREF_ERROR':
            newState.hRefs[action.hRef] = {status:'error', hRef, error, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_START':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'updating', hRef, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_SUCCESS':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'success', data, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_ERROR':
            newState.hRefs[action.hRef] = {status:'error', hRef, error, timestamp}
            return newState

        default:
            return state
    }
}
export default aiaReducer
