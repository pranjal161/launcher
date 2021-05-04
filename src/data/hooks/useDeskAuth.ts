import {
    signIn as signInAction,
    signOut as signOutAction,
    signUp as signUpAction
} from "../../store/actions/authActions";
import {useDispatch, useSelector} from "react-redux";

import {useCallback} from "react";

/**
 * Login page information
 * @returns {*} Information for the login page
 */
export default function useDeskAuth() {
    const auth = useSelector((state: any) => state.auth)
    const profile = useSelector((state:any) => state.firebase.profile)
    const dispatch = useDispatch();
    const signUp = useCallback((credentials) => dispatch(signUpAction(credentials)), [dispatch])
    const signOut = useCallback(() => dispatch(signOutAction()), [dispatch])
    const signIn = useCallback((credentials) => dispatch(signInAction(credentials)), [dispatch])

    return {auth, profile, currentUserId: auth.id, signUp, signOut, signIn}
}
