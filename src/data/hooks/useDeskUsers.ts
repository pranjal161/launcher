import * as userActions from "store/actions/userActions";

import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";

const useAllUsers = (type='ordered') => useSelector((state:any) => state.firestore[type]['users'])

const useGetOne = (id: string | number) => useSelector((state:any) => (state.firestore.data.users ? { id, ...state.firestore.data.users[id] } : undefined))

const useDeskUsers = () => {
    const getAll = useAllUsers
    const getOne = useGetOne
    const dispatch = useDispatch();
    const createReminder = useCallback((reminder) => dispatch(userActions.createReminder(reminder)), [dispatch])
    const updateReminder = useCallback((reminder) => dispatch(userActions.updateReminder(reminder)), [dispatch])
    return { getOne, getAll, createReminder, updateReminder }
}

export default useDeskUsers
