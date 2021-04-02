const initialState = {
    contracts: {},
    persons: {},
    entities: {}
}

const getAllDataNotObject = (data) => Object.fromEntries(
    Object.entries(data).filter(
        ([, value]) => typeof value !== "object")
)

const updateContractPart = (contract, entity, part, data) => {
    if (!contract[part])
        contract[part] = {}

    contract[part] = {
        ...contract[part],
        count: data.length,
        data,
        status: 'success',
        timestamp: Date.now()
    }
    entity[part] = {
        ...entity[part],
        status: 'success',
        timestamp: Date.now()
    }
}

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
                    const createLinkRef = (link, uri='') => ({
                        url: action.data._links[link].href + uri,
                        status: 'not_fetch',
                        timestamp: Date.now()
                    })

                    newState.entities[contractNumber] = {
                        ...newState.entities[contractNumber],
                        data: {url: action.url, status: 'success', timestamp: Date.now()},
                        risks: createLinkRef('contract:membership_list'),
                        roles: createLinkRef('contract:role_list', '?_inquiry=e_contract_parties_view'),
                        activities: createLinkRef('cscaia:activities'),
                        outputDocuments: createLinkRef('cscaia:output_documents'),
                    }
                    break;
                case 'risks':
                    updateContractPart(
                        newState.contracts[contractNumber],
                        newState.entities[contractNumber],
                        'risks', action.data)
                    break;
                case 'activities':
                    updateContractPart(
                        newState.contracts[contractNumber],
                        newState.entities[contractNumber],
                        'activities', action.data)
                    break;
                case 'roles':
                    updateContractPart(
                        newState.contracts[contractNumber],
                        newState.entities[contractNumber],
                        'roles', action.data)
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
