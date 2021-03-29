import React from 'react';
import {applyRoutes} from "../../routes";

const AuthLayout= (props) =>  {
    console.log('props', props.route.routes)
    return (
        <div className="container">
            <div className="row">
                    {applyRoutes(props.route.routes)}
            </div>
        </div>
    );
}

export default AuthLayout;
