import './TicketView.scss'

import DetailWrapper from "views/Trainers/TrainingJeenal/components/TicketView/components/DetailWrapper/DetailWrapper";
import Header from "views/Trainers/TrainingJeenal/components/TicketView/components/Header/Header";
import React from 'react';
import SavingPanels from "components/Tickets/Panels/SavingPanels/SavingPanels";
import useDeskTickets from "data/hooks/useDeskTickets";

const TicketView = (props: { id: string }) => {
    const { getOneShallow } = useDeskTickets();
    const ticket = getOneShallow(props.id);

    return (
        <>
            {
                ticket ? 
                    <div style={{overflowX: 'hidden'}}>
                        <div className="w-100">
                            <Header ticket={ticket}/>
                        </div>
                        <div className="col-12 p-0" style={{display: 'inline-flex'}}>
                            <div className="col-8 p-0 vertical-divider">
                                <DetailWrapper ticket={ticket}/>
                            </div>
                            <div className="col-4 p-0">
                                <SavingPanels ticketId={ticket.id}/>
                            </div>
                        </div>
                    </div> :
                    <div>fetching ticket...</div>
            }
        </>
    );
}

export default TicketView;

export const MemoTicketView = React.memo(TicketView);