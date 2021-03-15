import React from 'react';
import {NavLink} from "react-router-dom";

function SignedInLinks(props) {
    return (
        <ul className="right">
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-success">{"NP"}</NavLink></li>
        </ul>
    );
}

export default SignedInLinks;
