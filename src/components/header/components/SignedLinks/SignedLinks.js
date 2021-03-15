import React from 'react';
import {connect} from "react-redux";
import SignedInLinks from "./components/SignedInLinks";
import SignedOutLinks from "./components/SignedOutLinks";

const SignedLinks = ({logged}) => {
    const links = logged ? <SignedInLinks/> : <SignedOutLinks/>
    return (
        <>
            {links}
        </>
    );
}


const mapStateToProps = (state) =>
{
    return {logged: state.auth.logged}
}

export default connect(mapStateToProps)(SignedLinks)
