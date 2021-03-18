import React, {useRef} from 'react';
import {Redirect} from "react-router-dom";
import useDeskAuth from "../../data/hooks/useDeskAuth";

const SignIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {auth, signIn} = useDeskAuth()

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


export default SignIn;


