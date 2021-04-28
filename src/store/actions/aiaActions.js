import {aia} from "../../util/functions";

export const fetch = (hRef, callType = 'get', baId = null) => (dispatch, getState) => {
    //Search if we have already fetch this hRef
    //const hRefs = getState().aia.hRefs
    const timestamp = Date.now()
    //const alreadyFetched = hRefs[hRef] && hRefs[hRef].status === "succeeded"
    const actionPrefix = `BA_${callType.toUpperCase()}`

    //dispatch({type: `${actionPrefix}_START`, hRef, timestamp})
    dispatch({type: `${actionPrefix}_PENDING`, hRef, timestamp, baId})

    const promise = aia[callType](hRef)
    promise.then(
        (response) => {

            /*dispatch({
                type: `${actionPrefix}_SUCCESS`,
                data: response.data,
                hRef,
                timestamp
            })*/
            dispatch({
                type: `${actionPrefix}_SUCCESS`,
                data: response.data,
                hRef,
                baId
            })
        })
        .catch((error) => {

            /* dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                hRef,
                timestamp
            })*/
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                hRef,
                baId
            })
        })
    return promise
}
