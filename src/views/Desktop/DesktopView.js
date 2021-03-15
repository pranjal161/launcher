import React from 'react';
import AllTickets from "../../components/Tickets/AllTickets";
import MyTickets from "../../components/Tickets/MyTickets";

function DesktopView(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    All tickets
                    <AllTickets/>
                </div>
                <div className="col-sm">
                    My tickets
                    <MyTickets/>
                </div>
                <div className="col-sm">

                </div>
            </div>
        </div>
    );
}

export default DesktopView;
