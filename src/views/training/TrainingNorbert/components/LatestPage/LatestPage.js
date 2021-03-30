import {DxcButton, DxcInput} from "@dxc-technology/halstack-react"
import React, {useState} from 'react';

import Documents from "./components/Documents/Documents";
import MyTickets from "../../../../../components/Tickets/MyTickets/MyTickets";
import Upload from "../../../../../components/Tickets/TicketDetail/components/Upload/Upload";

//import moment from "moment/moment";

const LatestPage = () => {
    const [ticket, setTicket] = useState(undefined)
    const [client, setClient] = useState('USA')

    const {addRelatedClients, removeRelatedClients, removeSuggestedActivity, executeActivity} = useDeskTickets()

    const handleAddRelatedClient = () => {
        addRelatedClients(ticket.id, client)
    }
    const handleRemoveRelatedClient = () => {
        removeRelatedClients(ticket.id, client)
    }
    const handleRemoveSuggestedActivity = () => {
        removeSuggestedActivity(ticket.id, 'updatePostalAddress')
    }
    const handleExecuteActivity = () => {
        executeActivity(ticket.id, 'updatePostalAddress')
    }
    return (
        <>
            <div className="row">
                <div className="col-3"><MyTickets onClick={(ticket) => setTicket(ticket)}
                    ticketId={ticket && ticket.id}/></div>
                <div className="col-3">
                    <DxcInput
                        label="Client"
                        value={client}
                        assistiveText={"assistive text"}
                        onChange={(newValue) => setClient(newValue)}
                        margin="medium"
                        disabled={!ticket}
                    />
                    <DxcButton
                        mode="primary"
                        label="Add related client"
                        onClick={handleAddRelatedClient}
                        margin="medium"
                        disabled={!ticket}
                    />
                    <DxcButton
                        mode="primary"
                        label="Remove related client"
                        onClick={handleRemoveRelatedClient}
                        margin="medium"
                        disabled={!ticket}
                    />
                    <DxcButton
                        mode="primary"
                        label="Remove Postal address"
                        onClick={handleRemoveSuggestedActivity}
                        margin="medium"
                        disabled={!ticket}
                    />
                    <DxcButton
                        mode="primary"
                        label="Execute activity"
                        onClick={handleExecuteActivity}
                        margin="small"
                        disabled={!ticket}
                    />
                </div>
                <div className="col-3">
                    Associated documents
                    {ticket && <Documents ticketId={ticket.id}/>}
                </div>

                <div className="col-3">
                    {ticket && <Upload ticketId={ticket.id}/>}
                </div>

            </div>
        </>
    )
}

export default LatestPage;
