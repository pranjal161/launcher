import * as basketActions from "../../store/actions/basketActions";

import {useDispatch, useSelector} from "react-redux";

import {useCallback} from "react";

const useAllBaskets = () => useSelector((state:any) => state.firestore.ordered['baskets'])

const useMyAllBaskets = () => {
    const auth = useSelector((state:any) => state.auth)
    const allBaskets = useAllBaskets()
    return allBaskets && allBaskets.filter((basket:any) => basket.assignedToList.includes(auth.id))
}

const useGetOne = (id: string | number) => useSelector((state:any) => ({id, ...state.firestore.data.baskets[id]}))

const useDeskBaskets = () => {
    const getAll = useAllBaskets
    const getMyAllBaskets = useMyAllBaskets
    const getOne = useGetOne

    const dispatch = useDispatch();
    const create = useCallback((ticket) => dispatch(basketActions.create(ticket)), [dispatch])
    const update = useCallback((ticket) => dispatch(basketActions.update(ticket)), [dispatch])
    const remove = useCallback((id) => dispatch(basketActions.remove(id)), [dispatch])
    const assignUser = useCallback((id: any, userId: any) => dispatch(basketActions.assignUser(id, userId)), [dispatch])
    const removeUser = useCallback((id: any, userId: any) => dispatch(basketActions.removeUser(id, userId)), [dispatch])

    return {getOne, getAll, getMyAllBaskets, create, update, remove, assignUser, removeUser}
}

export default useDeskBaskets
