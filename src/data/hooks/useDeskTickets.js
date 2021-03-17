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

const useMyAllTickets = (params = {}) => {
    const auth = useSelector(state => state.auth)
    return useAllTickets({...params, storeAs: 'myTickets', where: ['assignedTo', '==', auth.id]})
}

const useGetOne = (id) => {
    const storeAs = 'ticket_' + id
    useFirestoreConnect([
        {collection: 'tickets', doc: id, storeAs}])

    const res = useSelector((state) => state.firestore.ordered[storeAs])
    if(res)
        return res[0]
}

const useDeskTickets = () => {
    const getAll = useAllTickets
    const getMyAllTickets = useMyAllTickets
    const getOne = useGetOne

    const dispatch = useDispatch();
    const create = useCallback((...param) => dispatch(ticketActions.create(...param)),[dispatch])
    const update = useCallback((...param) => dispatch(ticketActions.update(...param)),[dispatch])
    const remove = useCallback((...param) => dispatch(ticketActions.remove(...param)),[dispatch])
    const assignTo = useCallback((...param) => dispatch(ticketActions.assignTo(...param)),[dispatch])

    return {getOne, getAll, getMyAllTickets, create, update, remove, assignTo}
}

export default useDeskTickets
