import {useDispatch, useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";
import * as ticketActions from "../../store/actions/ticketActions";
import {useCallback} from "react";

const useAllTickets = ({storeAs = 'tickets', ...rest} = {}) => {
    useFirestoreConnect([
        {collection: 'tickets', storeAs, ...rest}
    ])
    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useAllMyTickets = (params = {}) => {
    const auth = useSelector(state => state.auth)
    return useAllTickets({...params, storeAs: 'myTickets', where: ['creatorId', '==', auth.id]})
}

const useGetOne = (id) => {
    const storeAs = 'ticket_' + id
    useFirestoreConnect([
        {collection: 'tickets', doc: id, storeAs}])

    const res = useSelector((state) => state.firestore.ordered[storeAs])
    if(res)
        return res[0]
}

const useTickets = () => {
    const getAll = useAllTickets
    const getAllMyTickets = useAllMyTickets
    const getOne = useGetOne

    const dispatch = useDispatch();
    const create = useCallback((...param) => dispatch(ticketActions.create(...param)),[])
    const remove = useCallback((...param) => dispatch(ticketActions.remove(...param)),[])

    return {getAll, getAllMyTickets, getOne, create, remove}
}

export default useTickets
