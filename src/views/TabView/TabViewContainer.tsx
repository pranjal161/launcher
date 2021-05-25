import React from 'react';
import TabView from './TabView'
import { useRouteMatch } from "react-router-dom";

const TabViewContainer = () => {
    const match = useRouteMatch({
        path: "/viewTab",
        strict: true,
        sensitive: true
    });
    console.log('TabViewContainer render match: ', match);

    return (
        <div style={{display: match ? 'block' : 'none'}}>
            <TabView />
        </div>        
    )
}

export default TabViewContainer;