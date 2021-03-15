import React, {useRef} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {signUp} from "../../store/actions/authActions";
import {useFirestore} from "react-redux-firebase";

const SignUp = ({signUp, auth}) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const profileRef= useRef()
    const firestore = useFirestore()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const profile = profileRef.current.value
        signUp({email, password, firstName, lastName, profile}, firestore)
    }

    const {logged, errorMessage} = auth
    if (logged)
        return <Redirect to={"/"}/>

    return (
        <div className={"container"}>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                               placeholder="Enter email" ref={emailRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                               ref={passwordRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">First name</label>
                        <input type="text" className="form-control" id="firstname"
                               ref={firstNameRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last name</label>
                        <input type="text" className="form-control" id="lastname"
                               ref={lastNameRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile">Profile</label>
                        <select id="inputState" className="form-control" ref={profileRef}>
                            <option value={"insuranceClerk"} selected>Insurance Clerk</option>
                            <option value={"manager"}>Manager</option>
                            <option value={"phoneAdvisor"}>Phone advisor</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                    {errorMessage && <div className="alert alert-danger mt-2" role="alert">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (credentials, firestore) => dispatch(signUp(credentials, firestore))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


