import { useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import { signUp as signUpAction, signOut as signOutAction, signIn as signInAction} from "../../store/actions/authActions";
import {useFirestoreConnect} from "react-redux-firebase";

const useAllUsers = ({storeAs = 'users', ...rest} = {}) => {
    useFirestoreConnect([
        {collection: 'users', storeAs, ...rest}
    ])
    return useSelector((state) => state.firestore.ordered[storeAs])
}

const useDeskUsers = () => {
    const dispatch = useDispatch();
    const signUp = useCallback((credentials) => dispatch(signUpAction(credentials)),[])
    const signOut = useCallback((credentials) => dispatch(signOutAction(credentials)),[])
    const signIn = useCallback((credentials) => dispatch(signInAction(credentials)),[])
    const getAll = useAllUsers


    return {signUp, signOut, signIn, getAll}
}

export default useDeskUsers
