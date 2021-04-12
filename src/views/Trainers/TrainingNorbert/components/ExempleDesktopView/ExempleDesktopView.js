import {Tab, Tabs} from "@material-ui/core";

import ExempleBasketsView from "./ExempleBasketsView/ExempleBasketsView";
import ExempleTicketsView from "./ExempleTicketsView/ExempleTicketsView";
import React from 'react';

/**
 * Example of tickets view on desktop
 * @returns {*} Example of tickets view on desktop
 */
function ExempleDesktopView() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="container-fluid">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Tickets" />
                <Tab label="Baskets" />
                <Tab label="Both" />
            </Tabs>
            <div className={"m-2"}>
                {value === 0 && <ExempleTicketsView/>}
                {value === 1 && <ExempleBasketsView/>}
            </div>
        </div>
    );
}

export default ExempleDesktopView;
