import { DxcLink } from '@dxc-technology/halstack-react';
import React from 'react';
import useDeskAuth from "../../../../../data/hooks/useDeskAuth";
import {useHistory} from "react-router-dom";

/**
 * Display for the sign in
 * @returns {*} Sign in link
 */
function SignedInLinks() {
    const {signOut} = useDeskAuth()
    const history = useHistory()
    const handleLogout = (e:any) => {
        e.preventDefault()
        signOut().then(() => history.push('/auth/signin'))
    }
    
    return (
        <li><DxcLink text="Log Out" onClick={handleLogout} /></li>
    );
}

export default SignedInLinks
