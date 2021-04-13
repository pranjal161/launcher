import React from "react";

import Timeline from './../../../../components/Timeline/Timeline';

const HistoryImplement = () => {

    const [ticket, setTicket] = React.useState({
        history: [
            {
                1618303635000: {
                    action: "test",
                    metadata: {
                        timestamp: 1618303635000,
                        updatedBy: "Henry",
                        updatedByDisplay: "CB2",
                        updatedISODate: "2021-04-08T15:30:46+02:00"
                    }
                }
            },
            {
                1617888646700: {
                    action: "assignedTo",
                    metadata: {
                        timestamp: 1617888646700,
                        updatedBy: "Henry",
                        updatedByDisplay: "CB2",
                        updatedISODate: "2021-04-08T14:06:41+02:00"
                    }
                }
            },
            {
                1617888649700: {
                    action: "assignedTo",
                    metadata: {
                        timestamp: 1617888649700,
                        updatedBy: "Jacques",
                        updatedByDisplay: "CB2",
                        updatedISODate: "2021-04-08T14:50:50+02:00"
                    }
                }
            },
            {
                1617888749700: {
                    action: "ticketUpdated",
                    metadata: {
                        timestamp: 1617998749700,
                        updatedBy: "Paul",
                        updatedByDisplay: "CB2",
                        updatedISODate: "2021-04-09T07:40:12+02:00"
                    }
                }
            },
            {
                1617888769700: {
                    action: "assignedTo",
                    metadata: {
                        timestamp: 1617998769700,
                        updatedBy: "Henry",
                        updatedByDisplay: "CB2",
                        updatedISODate: "2021-04-08T15:30:46+02:00"
                    }
                }
            },
           
        ]
    });

    return (
        <div>
            <Timeline title="Ticket summary" ticket={ticket} />
        </div>
         
    )
};

export default HistoryImplement;