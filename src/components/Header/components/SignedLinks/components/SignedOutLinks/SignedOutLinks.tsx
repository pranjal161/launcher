import React, { MouseEvent } from 'react';

import IconButton from "components/IconButton/IconButton";
import { LoginIcon } from 'assets/svg';
import { useHistory } from "react-router-dom";

/**
 * Display for the sign out
 * @returns {*} Sign out link
 */
const SignedOutLinks = () => {
    const history = useHistory();
    const handleLogin = (e:MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        history.push('/auth/signin');
    }

    const emptyFunc = () => {
        console.log("Log In");
    }

    return (
        <div 
            title="Log In"
            onClick={(e:MouseEvent<HTMLDivElement>) => {handleLogin(e)}}>
            <IconButton
                onClick={emptyFunc}>
                <LoginIcon />
            </IconButton>
        </div>
    );
}

export default SignedOutLinks;
