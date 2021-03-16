import { useSelector} from "react-redux";
import {useFirestoreConnect} from "react-redux-firebase";


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

    return {getAll, getAllMyTickets, getOne}
}

export default useTickets
