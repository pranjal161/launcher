import React, { MouseEvent } from 'react';

import IconButton from "components/IconButton/IconButton";
import { LogoutIcon } from 'assets/svg';
import useDeskAuth from "data/hooks/useDeskAuth";
import { useHistory } from "react-router-dom";


/**
 * Display for the sign in
 * @returns {*} Sign in link
 */
const SignedInLinks = () => {
    const { signOut } = useDeskAuth();
    const history = useHistory();
    const handleLogout = async (e:MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        await signOut();

        history.push('/auth/signin');
    }

    const emptyFunc = () => {
        console.log("Log Out");
    }
    
    return (
        <div 
            title="Log Out"
            onClick={(e:MouseEvent<HTMLDivElement>) => handleLogout(e)}>
            <IconButton
                onClick={emptyFunc}>
                <LogoutIcon />
            </IconButton>
        </div>
    );
}

export default SignedInLinks
