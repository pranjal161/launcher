const initialState = {
    ba: {},
    hRefs: {},
    subscriptions: {}
}

const aiaReducer = (state = initialState, action) => {
    const {hRef, data, error, timestamp} = action
    const newState = {...state}
    let arr = [], newBa


    switch (action.type) {
        case 'START_BA':
            newBa = {...state.ba, [action.baId]: {data: {ready:false}, children: {}}}
            newState.ba = newBa
            return newState
        case 'END_BA':
            newBa = state.delete(action.baId)
            newState.ba = newBa
            return newState
        case 'BA_API_FETCH':
            if (hRef === action.baId) {
                newState.ba[action.baId].data = {data:{...action.data}, ready:true}

            }else {
                newState.ba[action.baId].children[action.hRef] = action.data
            }

            return newState

        case 'FETCH_HREF_START':
            //If hRef not exist, we add it
            if (!newState.hRefs[action.hRef])
                newState.hRefs[action.hRef] = {status: 'loading', hRef, timestamp}
            return newState

        case 'FETCH_HREF_SUCCESS':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status: 'succeeded', data, timestamp}
            return newState

        case 'FETCH_HREF_ERROR':
            newState.hRefs[action.hRef] = {status: 'error', hRef, error, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_START':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status: 'updating', hRef, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_SUCCESS':
            newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status: 'succeeded', data, timestamp}
            return newState

        case 'UPDATE_FETCH_HREF_ERROR':
            newState.hRefs[action.hRef] = {status: 'error', hRef, error, timestamp}
            return newState

        case 'ADD_SUBSCRIPTION':
            arr = newState.subscriptions[action.hRef] ? newState.subscriptions[action.hRef] : []
            arr.push(action.id)
            newState.subscriptions[action.hRef] = arr
            return newState

        case 'REMOVE_SUBSCRIPTION':
            arr = newState.subscriptions[action.hRef] ? newState.subscriptions[action.hRef] : []
            newState.subscriptions[action.hRef] = arr.filter((id) => id != action.id)
            return newState

        default:
            return state
    }
}
export default aiaReducer
