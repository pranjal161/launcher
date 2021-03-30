import {NavLink} from "react-router-dom";
import React from 'react';

/**
 * Display for the sign out
 * @returns {void} Sign out link
 */
function SignedOutLinks() {
    return (
        <>
            <li><NavLink to="/auth/signin">Log In</NavLink></li>
        </>
    );
}

export default SignedOutLinks;
