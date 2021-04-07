import {aia} from "../../util/functions";

export const fetch = (hRef, callType='get') => (dispatch, getState) => {
    //Search if we have already fetch this hRef
    const hRefs = getState().aia.hRefs
    const timestamp = Date.now()
    const alreadyFetched = hRefs[hRef] && hRefs[hRef].status === "success"
    const actionPrefix = alreadyFetched ? 'UPDATE_FETCH_HREF' : 'FETCH_HREF'

    dispatch({type: `${actionPrefix}_START`, hRef, timestamp})

    aia[callType](hRef)
        .then(
            (response) => {
                dispatch({
                    type: `${actionPrefix}_SUCCESS`,
                    data : response.data,
                    hRef,
                    timestamp
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
