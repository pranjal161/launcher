import IconButton from "components/IconButton/IconButton";
import { LoginIcon } from 'assets/svg';
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
        <div title="Log In">
            <IconButton onClick={handleLogin}>
                <LoginIcon />
            </IconButton>
        </div>
    );
}

export default SignedOutLinks;
