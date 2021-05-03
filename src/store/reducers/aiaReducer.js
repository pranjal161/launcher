const initialState = {
    hRefs: {},
    subscriptions:{}
}

const aiaReducer = (state = initialState, action) => {
    const {hRef, data, error, timestamp} = action
    const newState = {...state}
    let arr=[]

    switch (action.type) {
        case 'FETCH_HREF_START':
            //If hRef not exist, we add it
            if (!newState.hRefs[action.hRef])
                newState.hRefs[action.hRef] = {status:'loading', hRef, timestamp}
            return newState

        case 'FETCH_HREF_SUCCESS':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'succeeded', data, timestamp}
            return newState

        case 'FETCH_HREF_ERROR':
            newState.hRefs[action.hRef] = {status:'error', hRef, error, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_START':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'updating', hRef, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_SUCCESS':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'succeeded', data, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_ERROR':
            newState.hRefs[action.hRef] = {status:'error', hRef, error, timestamp}
            return newState

        case 'ADD_SUBSCRIPTION':
            arr = newState.subscriptions[action.hRef]?newState.subscriptions[action.hRef]:[]
            arr.push(action.id)
            newState.subscriptions[action.hRef] = arr
            return newState

        case 'REMOVE_SUBSCRIPTION':
            arr = newState.subscriptions[action.hRef]?newState.subscriptions[action.hRef]:[]
            newState.subscriptions[action.hRef] = arr.filter((id) => id != action.id)
            return newState

        default:
            return state
    }
}
export default aiaReducer