import { NavLink, Redirect } from 'react-router-dom';
import React, {FormEvent, useRef} from 'react';

import useDeskAuth from "../../data/hooks/useDeskAuth";

const SignIn = () => {
    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()
    const {auth, signIn} = useDeskAuth()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        signIn({email, password})
    }

    const { logged, errorMessage} = auth
    if (logged)
        return <Redirect to={"/home"}/>

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
                    <button className="m-2">Submit</button>
                    <button className="m-2"><NavLink to="/signup">Sign Up</NavLink></button>
                    {errorMessage && <div className="alert alert-danger mt-2" role="alert">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
}


export default SignIn;


