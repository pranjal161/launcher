import "./styles.scss";

import DetailWrapper from "./components/TicketView/components/DetailWrapper/DetailWrapper";
import Header from "./components/TicketView/components/Header/Header";
import React from "react";
import SideBar from "./components/TicketView/components/Sidebar/SideBar";
import useDeskTickets from "data/hooks/useDeskTickets";

const TrainingJeenal = () => {
    const ticketDesk = useDeskTickets()
    const allTickets = ticketDesk.getMyAllTickets();
    const currentTicket = allTickets && allTickets[0]
    if (!currentTicket) {
        return;
    }


    return (
        <>
            <h1>Jeenal</h1>
            <Header ticket={currentTicket} />
            <div className='row overflow-hidden'>
                <div className='col-9 min-vh-100 divider'>
                    <DetailWrapper ticket={currentTicket} />
                </div>
                <div className='col-3 min-vh-100'>
                    <SideBar ticket={currentTicket} />
                </div>
            </div>


        </>
    )
}

export default TrainingJeenal;