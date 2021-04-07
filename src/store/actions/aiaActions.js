import {aia} from "../../util/functions";

export const fetch = (hRef) => (dispatch, getState) => {
    //Search if we have already fetch this hRef
    const hRefs = getState().aia.hRefs
    const timestamp = Date.now()
    const alreadyFetched = hRefs[hRef] && hRefs[hRef].metadata && hRefs[hRef].metadata.status === "success"
    const actionPrefix = alreadyFetched ? 'UPDATE_FETCH_HREF' : 'FETCH_HREF'

    dispatch({type: `${actionPrefix}_START`, hRef, timestamp})

    return aia.get(hRef)
        .then(
            (response) => {
                //Pranjal => Do we have to manage _count === 1 ??
                console.log('response', response)
                let data = response.data

                dispatch({
                    type: `${actionPrefix}_SUCCESS`,
                    data,
                    hRef,
                    timestamp
                })
                return true
            })
        .catch((error) => {
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                hRef,
                timestamp
            })
            return false
        })
}
