const initialState = {
    contracts: {},
    persons: {},
    entities : {}
}

const aiaReducer = (state = initialState, action) => {
    let contractNumber = action.contractNumber
    let newState = {...state}
    switch (action.type) {
        case 'GET_CONTRAT_PENDING':
            const isExist = newState.entities[contractNumber]
            if (!isExist)
                newState.entities[contractNumber] = {type: 'contract', id : contractNumber, status : 'fetching', timestamp : Date.now()}
            return newState
        case 'GET_CONTRAT_SUCCESS':
            newState.contracts[contractNumber] = action.contract
            newState.entities[contractNumber].url = action.url
            newState.entities[contractNumber].status = 'success'
            newState.entities[contractNumber].timestamp = Date.now()
            return newState
        case 'GET_CONTRAT_ERROR':
            newState.entities[contractNumber].status = 'error'
            newState.entities[contractNumber].errorMessage = action.errorMessage
            newState.entities[contractNumber].timestamp = Date.now()
            return newState
        default:
            return state
    }
}
export default aiaReducer
