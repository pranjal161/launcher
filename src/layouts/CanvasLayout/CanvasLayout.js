import React from 'react';
import {applyRoutes} from "../../routes";

const  CanvasLayout = ({route}) =>  {
    return (
        <>
            {applyRoutes(route.routes)}
        </>
    );
}

export default CanvasLayout;
