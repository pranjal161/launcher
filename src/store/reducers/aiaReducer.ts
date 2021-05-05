const initialState = {
    hRefs: {},
    subscriptions:{}
}

const aiaReducer = (state = initialState, action: any) => {
    let newState:any = {...state}
    let newBa: any

    switch (action.type) {
        case 'BA_START':
            newState[action.baId] = {}
            return newState

        case 'BA_END':
            newBa = delete newState[action.baId]
            newState = newBa
            return newState

        case 'BA_GET_PENDING':
            return newState

        case 'BA_GET_SUCCESS':
            newState[action.baId][action.href] = {data:{...action.data}}
            return newState

        case 'BA_GET_ERROR':
            console.log('Error in BA_GET', action)
            return newState

        case 'BA_POST_PENDING':
            return newState

        case 'BA_POST_SUCCESS':
            return newState

        case 'BA_POST_ERROR':
            console.log('Error in BA_POST', action)
            return newState

        case 'BA_PATCH_PENDING':
            return newState
    
        case 'BA_PATCH_SUCCESS':
            newState[action.baId][action.href] = {data:{...action.data}}
            return newState
    
        case 'BA_PATCH_ERROR':
            console.log('Error in BA_PATCH', action)
            return newState

        case 'BA_DELETE_PENDING':
            return newState
        
        case 'BA_DELETE_SUCCESS':
            let resources = newState[action.baId] ? newState[action.baId] : {};
            delete resources[action.href];
            newState[action.baId] = resources;
            return newState
        
        case 'BA_DELETE_ERROR':
            console.log('Error in BA_DELETE', action)
            return newState

            // case 'FETCH_HREF_START':
            //     //If hRef not exist, we add it
            //     if (!newState.hRefs[action.hRef])
            //         newState.hRefs[action.hRef] = {status:'loading', hRef, timestamp}
            //     return newState

            // case 'FETCH_HREF_SUCCESS':
            //     newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'succeeded', data, timestamp}
            //     return newState

            // case 'FETCH_HREF_ERROR':
            //     newState.hRefs[action.hRef] = {status:'error', hRef, error, timestamp}
            //     return newState

            // case 'UPDATE_FETCH_HREF_START':
            //     newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'updating', hRef, timestamp}
            //     return newState

            // case 'UPDATE_FETCH_HREF_SUCCESS':
            //     newState.hRefs[action.hRef] = {...newState.hRefs[action.hRef], status:'succeeded', data, timestamp}
            //     return newState

            // case 'UPDATE_FETCH_HREF_ERROR':
            //     newState.hRefs[action.hRef] = {status:'error', hRef, error, timestamp}
            //     return newState

            // case 'ADD_SUBSCRIPTION':
            //     arr = newState.subscriptions[action.hRef]?newState.subscriptions[action.hRef]:[]
            //     arr.push(action.id)
            //     newState.subscriptions[action.hRef] = arr
            //     return newState

            // case 'REMOVE_SUBSCRIPTION':
            //     arr = newState.subscriptions[action.hRef]?newState.subscriptions[action.hRef]:[]
            //     newState.subscriptions[action.hRef] = arr.filter((id) => id != action.id)
            //     return newState

        default:
            return state
    }
}
export default aiaReducer
