import ExempleBasketsView from "../../Desktop/components/ExempleBasketsView/ExempleBasketsView";
import ExempleTicketsView from "../../Desktop/components/ExempleTicketsView/ExempleTicketsView";
import React from 'react';
import {Tab, Tabs} from "@material-ui/core";

function ExempleDesktopView() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="container-fluid">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Tickets"  />
                <Tab label="Baskets"  />
                <Tab label="Both"  />
            </Tabs>
            <div className={"m-2"}>
                {value === 0 && <ExempleTicketsView/>}
                {value === 1 && <ExempleBasketsView/>}
            </div>
        </div>
    );
}

export default ExempleDesktopView;
