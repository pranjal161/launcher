import React from 'react';
import {Tab, Tabs} from "@material-ui/core";
import ExempleTicketsView from "./components/ExempleTicketsView/ExempleTicketsView";

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
            {value === 0 && <ExempleTicketsView></ExempleTicketsView>}
            </div>
        </div>
    );
}

export default ExempleDesktopView;
