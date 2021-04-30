const initialState = {
    data: {}
}

const dataFetchReducer = (state = initialState, action: { id: string, href: string, values: Array<{}>, timestamp: number, type: string}) => {
    const { href, values, timestamp } = action
    const newState: { data: any } = { ...state }

    switch (action.type) {
        case 'DATA_FETCH_HREF_START': {
            if (!newState.data[action.id])
                newState.data[action.id] = { status: 'loading', href, timestamp }
            return newState
        }

        case 'DATA_FETCH_HREF_SUCCESS': {
            newState.data[action.id] = { ...newState.data[action.id], status: 'fetched', options: values, timestamp }
            return newState
        }

        default:
            return state
    }
}
export default dataFetchReducer