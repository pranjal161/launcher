import React from 'react';
import {NavLink} from "react-router-dom";
import {useDeskAuth} from "../../../../../data/hooks/useDeskAuth";

function SignedInLinks(props) {
    const {signOut, profile} = useDeskAuth()
    return (
        <ul className="right">
            <li><a className={"text-white"} onClick={() => signOut()}>Log Out</a></li>
            <li><NavLink to="/exemple/desktop">Desktop Exemple</NavLink></li>
            <li><NavLink to="/" className="btn btn-success">{profile.initials}</NavLink></li>
        </ul>
    );
}

export default SignedInLinks
