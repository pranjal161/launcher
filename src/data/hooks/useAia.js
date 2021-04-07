import {fetch as fetchAction} from 'store/actions/aiaActions'

import {useCallback, useEffect, useReducer, useState} from "react";
import {useDispatch} from "react-redux";




/**
 * get
 * @returns {*} Information for aia
 */
export default function useAia() {
    const reducer = (state, action) => {
        switch (action.type) {
            case "set":
                return {...state, [action.id]: action.hRef}
            case "unMount":
                console.log('unMount reducer', state)
                Object.entries(state).map(([id, hRef]) => dispatch({
                    type: 'REMOVE_SUBSCRIPTION',
                    hRef,
                    id
                }))
                return {...state}
                break;
            default:
                throw new Error();
        }
    }
    const [subscriptions, dispatchLocal] = useReducer(reducer, {});


    const removeAllSubscriptions = () => Object.entries(subscriptions).map(([hRef, id]) => dispatch({
        type: 'REMOVE_SUBSCRIPTION',
        hRef,
        id
    }))
    const dispatch = useDispatch();
    const fetch =
        (...params) => {
            const hRef = params[0]
            const id = Date.now()
            console.log(params, {id, hRef})
            dispatchLocal({ type: "set",  id, hRef})
            dispatch({type: 'ADD_SUBSCRIPTION', hRef, id})
            dispatch(fetchAction(...params))

        }

    useEffect(() => {
        console.log('subscriptions', subscriptions)
    }, [subscriptions])

    useEffect(() => {
        return () => {
            dispatchLocal({ type: "unMount" })
        }
    }, [])

    return {fetch}
}
