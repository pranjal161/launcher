import { fetch as fetchAction} from 'store/actions/aiaActions'

import {useCallback} from "react";
import {useDispatch} from "react-redux";

/**
 * get
 * @returns {*} Information for aia
 */
export default function useAiaContract() {
    const dispatch = useDispatch();
    const fetch = useCallback((...params) => dispatch(fetchAction(...params)), [dispatch])

    return {fetch}
}
