import PropTypes from 'prop-types'
import React from 'react';
import SignedInLinks from "components/header/components/SignedLinks/components/SignedInLinks/SignedInLinks";
import SignedOutLinks from "components/header/components/SignedLinks/components/SignedOutLinks/SignedOutLinks";
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
    logged: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
}

const mapStateToProps = (state: { auth: { logged: any; }; }) => ({logged: state.auth.logged})

export default connect(mapStateToProps)(SignedLinks)
