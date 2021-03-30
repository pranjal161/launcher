import React from 'react';
import {NavLink} from "react-router-dom";

function SignedOutLinks() {
    return (
        <>
            <li><NavLink to="/auth/signin">Log In</NavLink></li>
        </>
    );
}

export default SignedOutLinks;
