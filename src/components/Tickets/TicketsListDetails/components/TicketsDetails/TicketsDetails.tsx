import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import PropTypes from "prop-types";
import React from 'react';
import TicketPreview from "../../../TicketPreview/TicketPreview";
import styled from "styled-components";

import useDeskTickets from "data/hooks/useDeskTickets";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Root = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;

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
        <Root>
            <ConsultationPanels header={"Ticket Details"} content={<Content/>} onOpenInNew={() => openTicketNewTab()} onNewTab={() => openInSecondary(ticketId, 'TICKET DETAILS')} />
        </Root>
    )
}

TicketsDetails.propTypes = {
    ticketId: PropTypes.string
}

export default TicketsDetails;
