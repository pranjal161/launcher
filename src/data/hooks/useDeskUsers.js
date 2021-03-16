import { useCallback} from "react";
import { useDispatch} from "react-redux";
import { signUp as signUpAction, signOut as signOutAction, signIn as signInAction} from "../../store/actions/authActions";


const useDeskUsers = () => {
    const dispatch = useDispatch();
    const signUp = useCallback((credentials) => dispatch(signUpAction(credentials)),[])
    const signOut = useCallback((credentials) => dispatch(signOutAction(credentials)),[])
    const signIn = useCallback((credentials) => dispatch(signInAction(credentials)),[])
    return {signUp, signOut, signIn}
}

export default useDeskUsers
