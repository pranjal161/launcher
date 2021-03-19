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

const useDeskTickets = () => {
    const getAll = useAllTickets
    const getMyAllTickets = useMyAllTickets
    const getOne = useGetOne

    const dispatch = useDispatch();
    const create = useCallback((...param) => dispatch(ticketActions.create(...param)), [dispatch])
    const update = useCallback((...param) => dispatch(ticketActions.update(...param)), [dispatch])
    const remove = useCallback((...param) => dispatch(ticketActions.remove(...param)), [dispatch])
    const assignTo = useCallback((...param) => dispatch(ticketActions.assignTo(...param)), [dispatch])

    return {getOne, getAll, getMyAllTickets, create, update, remove, assignTo}
}

export default useDeskTickets
