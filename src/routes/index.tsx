import {Route, Switch} from "react-router-dom";

import React from "react";
import routes from "./routes";

export interface CustomProps {
    path: string,
    name: string,
    exact: boolean,
    component: React.ComponentType,
    routes: Array<any>
}

const applyRoutes = (routes: Array<any>) => {
    if (!routes) return null
    return (
        <Switch>
            {routes.map((route: any, index: number) => applyRoute(route, index))}
        </Switch>
    );
}


const applyRoute: React.FC<CustomProps> = ({ component:Component, ...rest}, index: number) => (
    <Route {...rest} key={index} render={
        (props: any) => <Component {...props} route={rest} />
    }
    />)

export {applyRoutes};
export default routes;
