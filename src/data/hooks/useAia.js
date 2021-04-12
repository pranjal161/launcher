import {useCallback, useEffect, useReducer} from "react";

import {fetch as fetchAction} from 'store/actions/aiaActions'
import {useDispatch} from "react-redux";

/**
 * get
 * @returns {*} Information for aia
 */
export default function useAia() {
    const reducerLocal = (state, action) => {
        switch (action.type) {
            case "set":
                return {...state, [action.id]: action.hRef}
            case "unMount":
                Object.entries(state).forEach(([id, hRef]) => dispatch({
                    type: 'REMOVE_SUBSCRIPTION',
                    hRef,
                    id
                }))
                return {...state}
            default:
                throw new Error();
        }
    }
    const [, dispatchLocal] = useReducer(reducerLocal, {});
    const dispatch = useDispatch();

    const fetch = useCallback(
        (...params) => {
            const hRef = params[0]
            const id = Date.now()
            //Save localy the subscription ids
            dispatchLocal({type: "set", id, hRef})
            //Add the subscription into the global list
            dispatch({type: 'ADD_SUBSCRIPTION', hRef, id})
            //dispatch the fetch action
            dispatch(fetchAction(...params))
        }, [dispatch])

    //On component unmount, we unsubscribe its subscription
    useEffect(() => (() => dispatchLocal({type: "unMount"})), [])

    return {fetch}
}
