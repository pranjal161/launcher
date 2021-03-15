import React, {useRef} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {signUp} from "../../store/actions/authActions";

const SignUp = ({signUp, auth}) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        signUp({email, password, firstName, lastName})
    }

    const { logged, errorMessage} = auth
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
                    <button className="btn btn-primary" >Submit</button>
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
        signUp : (credentials) => dispatch(signUp(credentials))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


