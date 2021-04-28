import * as userActions from "store/actions/userActions";

import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";

const useAllUsers = (type='ordered') => useSelector((state) => state.firestore[type]['users'])

const useGetOne = (id) => useSelector((state) => (state.firestore.data.users ? { id, ...state.firestore.data.users[id] } : undefined))

const useDeskUsers = () => {
    const getAll = useAllUsers
    const getOne = useGetOne
    const dispatch = useDispatch();
    const createReminder = useCallback((...param) => dispatch(userActions.createReminder(...param)), [dispatch])
    const updateReminder = useCallback((...param) => dispatch(userActions.updateReminder(...param)), [dispatch])
    return { getOne, getAll, createReminder, updateReminder }
}

export default useDeskUsers
