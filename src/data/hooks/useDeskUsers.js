import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {useCallback} from "react";

const useAllUsers = ({storeAs , ...rest} = {storeAs : 'users', limit:50}) => {
    //If we have a listen on the query, we dont subscribe again
    const listenerExist = useSelector((state) => state.firestore.listeners.byId[storeAs])
    const connectQuery = useCallback(() => listenerExist ? [{collection: 'not-exist', limit: 1}] : [
        {collection: 'users', storeAs, ...rest}
    ], [storeAs])
    useFirestoreConnect(connectQuery)

    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useDeskUsers = () => {

    const getAll = useAllUsers


    return {getAll}
}

export default useDeskUsers
