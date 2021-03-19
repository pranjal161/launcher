import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as basketActions from "../../store/actions/basketActions";


const useAllBaskets = () => {
    return useSelector((state) => state.firestore.ordered['baskets'])
}

const useMyAllBaskets = () => {
    const auth = useSelector(state => state.auth)
    const allBaskets = useAllBaskets()
    return allBaskets && allBaskets.filter(basket => basket.assignedToList.includes(auth.id))
}

const useGetOne = (id) => {
    return useSelector((state) => ({id, ...state.firestore.data.baskets[id]}))
}

const useDeskBaskets = () => {
    const getAll = useAllBaskets
    const getMyAllBaskets = useMyAllBaskets
    const getOne = useGetOne

    const dispatch = useDispatch();
    const create = useCallback((...param) => dispatch(basketActions.create(...param)), [dispatch])
    const update = useCallback((...param) => dispatch(basketActions.update(...param)), [dispatch])
    const remove = useCallback((...param) => dispatch(basketActions.remove(...param)), [dispatch])
    const assignUser = useCallback((...param) => dispatch(basketActions.assignUser(...param)), [dispatch])
    const removeUser = useCallback((...param) => dispatch(basketActions.removeUser(...param)), [dispatch])

    return {getOne, getAll, getMyAllBaskets, create, update, remove, assignUser, removeUser}
}

export default useDeskBaskets
