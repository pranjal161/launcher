import { useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import { signUp as signUpAction, signOut as signOutAction, signIn as signInAction} from "../../store/actions/authActions";
import {useFirestoreConnect} from "react-redux-firebase";

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
