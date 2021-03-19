import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    signIn as signInAction,
    signOut as signOutAction,
    signUp as signUpAction
} from "../../store/actions/authActions";

export default function useDeskAuth() {
    const auth = useSelector(state => state.auth)
    const profile = useSelector(state => state.firebase.profile)
    const dispatch = useDispatch();
    const signUp = useCallback((credentials) => dispatch(signUpAction(credentials)), [dispatch])
    const signOut = useCallback((credentials) => dispatch(signOutAction(credentials)), [dispatch])
    const signIn = useCallback((credentials) => dispatch(signInAction(credentials)), [dispatch])

    return {auth, profile, currentUserId: auth.id, signUp, signOut, signIn}
}
