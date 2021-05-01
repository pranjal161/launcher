import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import {DxcBox} from "@dxc-technology/halstack-react";
import PropTypes from "prop-types";
import React from 'react';
import SelectEntity from "components/ConsultationPanels/components/SelectEntity/SelectEntity";
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
    const { t } = useTranslation();
    const history = useHistory();
    const selectedTicket = getOne(ticketId)
    const entities: any = {
        ticket: [{display: t("_TICKET_DETAILS"), id: ticketId}]
    };

    const SelectEntities = () => <SelectEntity entities={entities['ticket']} onChange={() => false} value={''}/>

    const Content = () => <TicketPreview ticket={selectedTicket ? selectedTicket : []}/>

    const openTicketNewTab = () => {
        openInNewTab(ticketId, selectedTicket.title, 'ticket')
        history.push('/viewTab')
    }

    return (
        <Root>
            <DxcBox padding={"xxsmall"} shadowDepth={2}>
                <ConsultationPanels header={<SelectEntities/>} content={<Content/>} onOpenInNew={() => openTicketNewTab()} onNewTab={() => openInSecondary(ticketId, 'TICKET DETAILS')} />
            </DxcBox>
        </Root>
    )
}

TicketsDetails.propTypes = {
    ticketId: PropTypes.string
}

export default TicketsDetails;
