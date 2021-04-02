import { get as getAction } from '../../store/actions/aiaContractActions'

import {useCallback} from "react";
import {useDispatch} from "react-redux";

/**
 * get
 * @returns {*} Information for aia
 */
export default function useAiaContract() {
    const dispatch = useDispatch();
    const get = useCallback((...params) => dispatch(getAction(...params)), [dispatch])

    return {get}
}
