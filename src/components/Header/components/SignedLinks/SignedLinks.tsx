import PropTypes from 'prop-types'
import React from 'react';
import SignedInLinks from "components/Header/components/SignedLinks/components/SignedInLinks/SignedInLinks";
import SignedOutLinks from "components/Header/components/SignedLinks/components/SignedOutLinks/SignedOutLinks";
import {connect} from "react-redux";

const SignedLinks = ( props: {logged: any}) => {
    const { logged } = props;
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

const mapStateToProps = (state: { auth: { logged: any; }; }) => ({logged: state.auth.logged})

export default connect(mapStateToProps)(SignedLinks)
