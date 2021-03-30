import React from 'react';
import {applyRoutes} from "../../routes";

const  ErrorLayout = ({route}) =>  {
    return (
        <div>
            <h4>Error page</h4>
            {applyRoutes(route.routes)}
        </div>
    );
}

export default ErrorLayout;
