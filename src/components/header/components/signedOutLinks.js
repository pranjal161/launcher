import React from 'react';
import {NavLink} from "react-router-dom";

function signedOutLinks() {
    return (
        <ul className="right">
            <li><NavLink to="/signup">SignUp</NavLink></li>
            <li><NavLink to="/signin">Log In</NavLink></li>
        </ul>
    );
}

export default signedOutLinks;
