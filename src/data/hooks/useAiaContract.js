import { get as getAction, getActivities as getActivitiesAction, getRisks as getRisksAction, getRoles as getRolesAction  } from '../../store/actions/aiaContractActions'

import {useCallback} from "react";
import {useDispatch} from "react-redux";

/**
 * get
 * @returns {*} Information for aia
 */
export default function useAiaContract() {
    const dispatch = useDispatch();
    const get = useCallback((...params) => dispatch(getAction(...params)), [dispatch])
    const getActivities = useCallback((...params) => dispatch(getActivitiesAction(...params)), [dispatch])
    const getRisks = useCallback((...params) => dispatch(getRisksAction(...params)), [dispatch])
    const getRoles = useCallback((...params) => dispatch(getRolesAction(...params)), [dispatch])

    return {get, getRoles, getRisks, getActivities}
}
