import { LockCloseIcon } from 'assets/svg';
import React from 'react';
import useDeskAuth from "data/hooks/useDeskAuth";
import { useHistory } from "react-router-dom";


/**
 * Display for the sign in
 * @returns {*} Sign in link
 */
const SignedInLinks = () => {
    const { signOut } = useDeskAuth();
    const history = useHistory();
    const handleLogout = async (e:any) => {
        e.preventDefault();
        await signOut();

        history.push('/auth/signin');
    }
    
    return (
        <li title="Log Out" onClick={handleLogout}>
            <LockCloseIcon />
        </li>
    );
}

export default SignedInLinks
