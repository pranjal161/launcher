import './TicketView.scss'
import DetailWrapper from "views/Trainers/TrainingJeenal/components/TicketView/components/DetailWrapper/DetailWrapper";
import Header from "views/Trainers/TrainingJeenal/components/TicketView/components/Header/Header";
import React from 'react';
import SavingPanels from "components/Tickets/Panels/SavingPanels/SavingPanels";
import useDeskTickets from "data/hooks/useDeskTickets";

const TicketView = (props: { id: string }) => {
    const {getOne} = useDeskTickets();
    const ticket = getOne(props.id);
    return (
        <>
            {ticket ? <div style={{overflowX: 'hidden'}}>
                <div className="w-100">
                    <Header ticket={ticket}/>
                </div>
                <div className="row overflow-hidden d-flex align-content-start">
                    <div className="col-9 min-vh-100 vertical-divider">
                        <DetailWrapper ticket={ticket}/>
                    </div>
                    <div className="col-3 min-vh-100">
                        <SavingPanels ticketId={ticket.id}/>
                    </div>
                </div>
            </div> :
                <div>fetching ticket...</div>}</>
    );
}

export default TicketView;
