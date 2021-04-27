import { LockOpenIcon } from 'assets/svg';
import React from 'react';
import { useHistory } from "react-router-dom";

/**
 * Display for the sign out
 * @returns {*} Sign out link
 */
const SignedOutLinks = () => {
    const history = useHistory();
    const handleLogin = (e:any) => {
        e.preventDefault();
        history.push('/auth/signin');
    }

    return (
        <li title="Log In" onClick={handleLogin}>
            <LockOpenIcon />
        </li>
    );
}

export default SignedOutLinks;
