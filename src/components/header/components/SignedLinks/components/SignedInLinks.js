import React from 'react';
import {NavLink} from "react-router-dom";
import {signOut} from "../../../../../store/actions/authActions";
import {connect} from "react-redux";

function SignedInLinks(props) {
    console.log('props', props)
    const signOut = () => {
        props.signOut()
    }
    return (
        <ul className="right">
            <li><a className={"text-white"} onClick={signOut}>Log Out</a></li>
            <li><NavLink to="/" className="btn btn-success">{props.profile.initials}</NavLink></li>
        </ul>
    );
}

const mapStateToProps = (state) => (
{
    profile : state.firebase.profile
}
)

const mapDispatchToProps = (dispatch) =>
{
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
