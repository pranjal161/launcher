import React from 'react';
import useDeskAuth from "../../../../../data/hooks/useDeskAuth";

/**
 * Display for the sign in
 * @returns {void} Sign in link
 */
function SignedInLinks() {
    const {signOut} = useDeskAuth()
    return (
        <li><a href="" onClick={() => signOut()}>Log Out</a></li>
    );
}

export default SignedInLinks
