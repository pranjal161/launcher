import { useCallback} from "react";
import {useDispatch} from "react-redux";
import {signUp as signUpAction} from "../../store/actions/authActions";


const useUserDispatch = () => {
    const dispatch = useDispatch();
    const signUp = useCallback((credentials) => dispatch(signUpAction(credentials)),[])
    return {signUp}
}

export default useUserDispatch
