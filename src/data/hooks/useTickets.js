import {useDispatch, useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";
import * as ticketActions from "../../store/actions/ticketActions";
import {useCallback} from "react";
import {signUp as signUpAction} from "../../store/actions/authActions";


const useAllTickets = ({storeAs = 'tickets', ...rest} = {}) => {
    useFirestoreConnect([
        {collection: 'tickets', storeAs, ...rest}
    ])
    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useAllMyTickets = (params = {}) => {
    const auth = useSelector(state => state.firebase.auth)
    return useAllTickets({...params, storeAs: 'myTickets', where: ['creatorId', '==', auth.uid]})
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


    return {getAll, getAllMyTickets, getOne, create}
}

export default useTickets
