import React, {FormEvent, useRef} from 'react';

import {Redirect} from "react-router-dom";
import useDeskAuth from "../../data/hooks/useDeskAuth";

const SignUp = () => {
    const emailRef = useRef<any>()
    const passwordRef = useRef<any>()
    const firstNameRef = useRef<any>()
    const lastNameRef = useRef<any>()
    const profileRef= useRef<any>()
    const {auth, signUp} = useDeskAuth()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const profile = profileRef.current.value
        signUp({email, password, firstName, lastName, profile})
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
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required={true}
                            placeholder="Enter email" ref={emailRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" required={true}
                            ref={passwordRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">First name</label>
                        <input type="text" className="form-control" id="firstname" required={true}
                            ref={firstNameRef}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last name</label>
                        <input type="text" className="form-control" id="lastname" required={true}
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

export default SignUp;


