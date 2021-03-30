import React from 'react';
import useDeskAuth from "../../../../../data/hooks/useDeskAuth";
import {useHistory} from "react-router-dom";

function SignedInLinks() {
    const {signOut} = useDeskAuth()
    const history = useHistory()
    const handleLogout = (e) => {
        e.preventDefault()
        signOut().then(() =>history.push('/auth/signin'))
    }
    return (
        <li><a href="" onClick={handleLogout}>Log Out</a></li>
    );
}

export default SignedInLinks
