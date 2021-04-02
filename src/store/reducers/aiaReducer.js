const initialState = {
    contracts: {},
    persons: {},
    entities: {}
}

const getAllDataNotObject = (data) => Object.fromEntries(
    Object.entries(data).filter(
        ([key, value]) => typeof value !== "object")
)


const aiaReducer = (state = initialState, action) => {
    let contractNumber = action.contractNumber
    let newState = {...state}
    switch (action.type) {
        case 'FETCH_CONTRAT_DATA_START':
            if (!newState.entities[contractNumber])
                newState.entities[contractNumber] = {
                    type: 'contract',
                    id: contractNumber,
                    data: {
                        status: 'fetching',
                        timestamp: Date.now()
                    }
                }
            return newState
        case 'FETCH_CONTRAT_DATA_SUCCESS':
            //Part of the contract to update with action.data
            switch (action.part) {
                case 'data':
                    if (!newState.contracts[contractNumber])
                        newState.contracts[contractNumber] = {}
                    newState.contracts[contractNumber].raw = action.data
                    newState.contracts[contractNumber].data = getAllDataNotObject(action.data)

                    //Manage links on contract entity
                    const createLinkRef = (link) => ({
                        url: action.data._links[link].href,
                        status: 'not_fetch',
                        timestamp: Date.now()
                    })

                    newState.entities[contractNumber] = {
                        ...newState.entities[contractNumber],
                        data: {url: action.url, status: 'success', timestamp: Date.now()},
                        risks: createLinkRef('contract:membership_list'),
                        roles: createLinkRef('contract:role_list'),
                        activities: createLinkRef('cscaia:activities'),
                        outputDocuments: createLinkRef('cscaia:output_documents'),
                    }
                    break;
                case 'risks':
                    if (!newState.contracts[contractNumber].risks)
                        newState.contracts[contractNumber].risks = {}
                    //newState.contracts[contractNumber].risks.raw = action.data
                    newState.contracts[contractNumber].risks.count = action.data.length
                    newState.contracts[contractNumber].risks.data = action.data
                    newState.entities[contractNumber].risks = {
                        ...newState.entities[contractNumber].risks,
                        status: 'success',
                        timestamp: Date.now()
                    }
                    break;

            }


            return newState
        case 'FETCH_CONTRAT_DATA_ERROR':
            newState.entities[contractNumber].data = {url: action.url, status: 'error', timestamp: Date.now()}
            return newState
        default:
            return state
    }
}
export default aiaReducer
