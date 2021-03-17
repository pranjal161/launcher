import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";

const useAllUsers = ({storeAs , ...rest} = {storeAs : 'users', limit:50}) => {
    useFirestoreConnect([
        {collection: 'users', storeAs, ...rest}
    ])
    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useDeskUsers = () => {

    const getAll = useAllUsers


    return {getAll}
}

export default useDeskUsers
