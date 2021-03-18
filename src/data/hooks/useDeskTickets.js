import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";
import * as ticketActions from "../../store/actions/ticketActions";


const useAllTickets = ({storeAs, ...rest} = {storeAs : 'tickets', limit:50}) => {
    //If we have a listen on the query, we dont subscribe again
    const listenerExist = useSelector((state) => state.firestore.listeners.byId[storeAs])
    console.log('listenerExist', listenerExist)
    const connectQuery = useCallback(() => listenerExist ? [{
        collection: 'not-exist',
        limit: 1
    }] : [{collection: 'tickets', storeAs, ...rest}], [storeAs])
    useFirestoreConnect(connectQuery)
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
