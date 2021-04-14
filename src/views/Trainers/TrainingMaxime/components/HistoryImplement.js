import React from "react";

import Timeline from './../../../../components/Timeline/Timeline';

const HistoryImplement = () => {

    const [ticket, setTicket] = React.useState({
        history: [
            {
                1617891945000: {
                    action: "assignedTo",
                    metadata: {
                        timestamp:  1617891945000,
                        updatedBy: "Pierre",
                        updatedByDisplay: "Pierre Dumoulin",
                        updatedISODate: "2021-04-08T16:25:45+02:00"
                    },
                    newValue: "Jacques Dupont"
                }
            },
            {
                1618399270000: {
                    action: "assignedTo",
                    metadata: {
                        timestamp: 1618379370000,
                        updatedBy: "Jacques",
                        updatedByDisplay: "Jacques Dupont",
                        updatedISODate: "2021-04-14T02:50:50+02:00"
                    },
                    newValue: "Paul Boulanger"
                }
            },
            {
                1617888646700: {
                    action: "ticketUpdated",
                    metadata: {
                        timestamp: 1617888646700,
                        updatedBy: "Paul",
                        updatedByDisplay: "Paul Boulanger",
                        updatedISODate: "2021-04-08T07:40:12+02:00"
                    },
                    newValue: {}
                }
            },
            {
                1618050345000: {
                    action: "assignedTo",
                    metadata: {
                        timestamp: 1618050345000,
                        updatedBy: "Henry",
                        updatedByDisplay: "Henry Lephare",
                        updatedISODate: "2021-04-10T12:25:45+02:00"
                    },
                    newValue: "Jacques Dupont"
                }
            },
            {
                1618303635000: {
                    action: "assignedTo",
                    metadata: {
                        timestamp: 1618303635000,
                        updatedBy: "Bob",
                        updatedByDisplay: "Bob Brown",
                        updatedISODate: "2021-04-13T15:30:46+02:00"
                    },
                    newValue: "Jacques Dupont"
                }
            }
           
        ]
    });

    return (
        <div className="history-container-maxime" style={{width: "100%", height: 400}}>
            <Timeline title="Ticket history" ticket={ticket} />
        </div>
         
    )
};

export default HistoryImplement;