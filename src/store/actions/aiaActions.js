import {aia} from "../../util/functions";


export const startOfBusinessActivity = (baId) => (dispatch) =>
{
    dispatch({type: 'START_BA', baId})
}

export const endOfBusinessActivity = (baId) => (dispatch) =>
{
    dispatch({type: 'END_BA', baId})
}

export const fetch = (hRef, callType = 'get', baId=null) => (dispatch, getState) => {
    //Search if we have already fetch this hRef
    const hRefs = getState().aia.hRefs
    const timestamp = Date.now()
    const alreadyFetched = hRefs[hRef] && hRefs[hRef].status === "succeeded"
    const actionPrefix = alreadyFetched ? 'UPDATE_FETCH_HREF' : 'FETCH_HREF'

    dispatch({type: `${actionPrefix}_START`, hRef, timestamp})

    aia[callType](hRef)
        .then(
            (response) => {
                dispatch({
                    type: `${actionPrefix}_SUCCESS`,
                    data: response.data,
                    hRef,
                    timestamp
                })
                dispatch({
                    type: 'BA_API_FETCH',
                    data: response.data,
                    hRef,
                    baId
                })
            })
        .catch((error) => {
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                hRef,
                timestamp
            })
        })
}
