import {deleteRequest as deleteAction, fetch as fetchAction, patch as patchAction, post as postAction} from 'store/actions/aiaActions';
import {useCallback, useContext, useEffect, useReducer} from "react";

import baContext from "context/baContext";
import {useDispatch} from "react-redux";

/**
 * get
 * @returns {*} Information for aia
 * We need to include parameter to pass headers 
 */
export default function useAia() {
    const reducerLocal = (state: any, action: any) => {
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
    const context = useContext(baContext)
    const baId: string = context.baId ? context.baId: '';

    const fetch = useCallback(
        (...params) => {
            const hRef = params[0]
            const id = Date.now()
            //Save localy the subscription ids
            dispatchLocal({type: "set", id, hRef})
            //Add the subscription into the global list
            dispatch({type: 'ADD_SUBSCRIPTION', hRef, id})
            //dispatch the fetch action
            return dispatch(fetchAction(hRef, 'get', baId))
        }, [dispatch])

    const post = useCallback(
        (...params) => {
            const hRef = params[0]
            const body = params[1] ? params[1]: {};
            
            return dispatch(postAction(hRef, body, baId))
        }, [dispatch])

    const patch = useCallback(
        (...params) => {
            const hRef = params[0]
            const payload = params[1] ? params[1]: {};
                
            return dispatch(patchAction(hRef, payload, baId))
        }, [dispatch])

    const deleteRequest = useCallback(
        (...params) => {
            const hRef = params[0]                    
            return dispatch(deleteAction(hRef, baId))
        }, [dispatch])

    //On component unmount, we unsubscribe its subscription
    useEffect(() => (() => dispatchLocal({type: "unMount"})), [])

    return {fetch, post, patch, deleteRequest}
}
