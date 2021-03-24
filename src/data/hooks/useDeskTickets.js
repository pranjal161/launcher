import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as ticketActions from "../../store/actions/ticketActions";


const useAllTickets = () => {
    return useSelector((state) => state.firestore.ordered['tickets'])
}

const useMyAllTickets = () => {
    const auth = useSelector(state => state.auth)
    const allTickets = useAllTickets()
    return allTickets && allTickets.filter(ticket => ticket.assignedTo && ticket.assignedTo === auth.id)
}

const useGetOne = (id) => {
    return useSelector((state) => ({id, ...state.firestore.data.tickets[id]}))
}

const useGetState = () => {
    return useSelector((state) => (state.tickets))
}

const callActionCreator = (dispatch, action, param) => {
    dispatch(ticketActions[action](...param))
}


const useDeskTickets = () => {
    const getAll = useAllTickets
    const getMyAllTickets = useMyAllTickets
    const getOne = useGetOne
    const getTicketsState = useGetState

    const dispatch = useDispatch();
    const create = useCallback((...param) => dispatch(ticketActions.create(...param)), [dispatch])
    const update = useCallback((...param) => dispatch(ticketActions.update(...param)), [dispatch])
    const remove = useCallback((...param) => dispatch(ticketActions.remove(...param)), [dispatch])
    const assignTo = useCallback((...param) => dispatch(ticketActions.assignTo(...param)), [dispatch])
    const createdBy = useCallback((...param) => dispatch(ticketActions.createdBy(...param)), [dispatch])
    const select = useCallback((...param) => dispatch(ticketActions.select(...param)), [dispatch])
    const unSelect = useCallback((...param) => dispatch(ticketActions.unSelect(...param)), [dispatch])


    return {
        getOne,
        getAll,
        getMyAllTickets,
        getTicketsState,
        create,
        update,
        remove,
        assignTo,
        createdBy,
        select,
        unSelect
    }
}

export default useDeskTickets
