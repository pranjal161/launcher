import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import PropTypes from "prop-types";
import React from 'react';
import TicketPreview from "../../../TicketPreview/TicketPreview";
import useDeskTickets from "data/hooks/useDeskTickets";
import {useHistory} from "react-router-dom";

const TicketsDetails = (props: {ticketId: string}) => {
    const { ticketId } = props;
    const {getOne, openInSecondary, openInNewTab} = useDeskTickets();
    const history = useHistory();
    const selectedTicket = getOne(ticketId)

    const Content = () => <TicketPreview ticket={selectedTicket ? selectedTicket : []}/>

    const openTicketNewTab = () => {
        openInNewTab(ticketId, selectedTicket.title, 'ticket')
        history.push('/viewTab')
    }

    return (
        <>
            <ConsultationPanels header={"Ticket Details"} content={<Content/>} onOpenInNew={() => openTicketNewTab()} onNewTab={() => openInSecondary(ticketId, 'TICKET DETAILS')} />
        </>
    )
}

TicketsDetails.propTypes = {
    ticketId: PropTypes.string
}

export default TicketsDetails;
