import React, {useRef} from 'react';
import {connect} from "react-redux";
import {signIn} from "../../store/actions/authActions";
import {Redirect} from "react-router-dom";

const SignIn = ({signIn, auth}) => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        signIn({email, password})
    }

    const { logged, errorMessage} = auth
    if (logged)
        return <Redirect to={"/"}/>

    return (
        <div className={"container"}>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Enter email" ref={emailRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                               ref={passwordRef}/>
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
        signIn : (credentials) => dispatch(signIn(credentials))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);


