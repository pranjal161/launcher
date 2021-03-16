import {useDispatch, useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";
import * as ticketActions from "../../store/actions/ticketActions";
import {useCallback} from "react";

const useAllBaskets = ({storeAs = 'baskets', ...rest} = {}) => {
    useFirestoreConnect([
        {collection: 'baskets', storeAs, ...rest}
    ])
    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useMyAllBaskets = (params = {}) => {
    const auth = useSelector(state => state.auth)
    return useAllBaskets({...params, storeAs: 'myBaskets', where: ['assignedTo', '==', auth.id]})
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
    const create = useCallback((...param) => dispatch(ticketActions.create(...param)),[])
    const update = useCallback((...param) => dispatch(ticketActions.update(...param)),[])
    const remove = useCallback((...param) => dispatch(ticketActions.remove(...param)),[])
    const assignTo = useCallback((...param) => dispatch(ticketActions.assignTo(...param)),[])

    return {getOne, getAll, getMyAllBaskets, create, update, remove, assignTo}
}

export default useDeskBaskets
