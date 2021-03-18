import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";
import * as basketActions from "../../store/actions/basketActions";


const useAllBaskets = ({storeAs, ...rest} = {storeAs : 'baskets', limit:50}) => {
    //If we have a listen on the query, we dont subscribe again
    const listenerExist = useSelector((state) => state.firestore.listeners.byId[storeAs])
    const connectQuery = useCallback(() => listenerExist ? [{collection: 'not-exist', limit: 1}] : [
        {collection: 'baskets', storeAs, ...rest}
    ], [storeAs])
    useFirestoreConnect(connectQuery)


    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useMyAllBaskets = (params = {}) => {
    const auth = useSelector(state => state.auth)
    return useAllBaskets({...params, storeAs: 'myBaskets', where: ['assignedToList', 'array-contains-any', [auth.id]]})
}

const useGetOne = (id) => {
    const storeAs = 'basket_' + id
    useFirestoreConnect([
        {collection: 'baskets', doc: id, storeAs}])

    const res = useSelector((state) => state.firestore.ordered[storeAs])
    if(res)
        return res[0]
}

const useDeskBaskets = () => {
    const getAll = useAllBaskets
    const getMyAllBaskets = useMyAllBaskets
    const getOne = useGetOne

    const dispatch = useDispatch();
    const create = useCallback((...param) => dispatch(basketActions.create(...param)),[dispatch])
    const update = useCallback((...param) => dispatch(basketActions.update(...param)),[dispatch])
    const remove = useCallback((...param) => dispatch(basketActions.remove(...param)),[dispatch])
    const assignUser = useCallback((...param) => dispatch(basketActions.assignUser(...param)),[dispatch])
    const removeUser = useCallback((...param) => dispatch(basketActions.removeUser(...param)),[dispatch])

    return {getOne, getAll, getMyAllBaskets, create, update, remove, assignUser, removeUser}
}

export default useDeskBaskets
