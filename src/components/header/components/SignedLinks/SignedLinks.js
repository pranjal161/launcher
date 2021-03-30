import React from 'react';
import SignedInLinks from "./components/SignedInLinks";
import SignedOutLinks from "./components/SignedOutLinks";
import {connect} from "react-redux";

const SignedLinks = ({logged}) => {
    const links = logged ? <SignedInLinks/> : <SignedOutLinks/>
    return (
        <>
            {links}
        </>
    );
}

SignedLinks.propTypes = {
    logged: PropTypes.string
}

const mapStateToProps = (state) => ({logged: state.auth.logged})

export default connect(mapStateToProps)(SignedLinks)
