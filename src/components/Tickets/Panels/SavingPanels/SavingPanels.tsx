import React, { useState } from 'react';

import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import ContractPreview from "../../../Contracts/ContractPreview/ContractPreview";
import PropTypes from "prop-types";
import SavingToolbar from "./components/SavingToolbar/SavingToolbar";
import SelectEntity from "components/ConsultationPanels/components/SelectEntity/SelectEntity";
import styled from "styled-components";
import useDeskTickets from "data/hooks/useDeskTickets";
import { useHistory } from "react-router-dom";

const Root = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;


const SavingPanels = (props: {ticketId: any, onClose: any}) => {
    const { ticketId, onClose } = props;
    const { getOneShallow, openInNewTab, openInSecondary } = useDeskTickets();
    const history = useHistory();
    const [entityType, setEntityType] = useState('contract');
    const [selection, setSelection] = useState<any>({}) // We store selection per entityType
    const ticket = getOneShallow(ticketId);
    if (!ticket)
        return (<></>);


    const ticketContracts:any = {}

    ticket.relatedContract && ticket.relatedContract.forEach((contract:any) => (
        ticketContracts[contract.id] = {
            display: contract.title.split(':')[0],
            displayLong: contract.title,
            hRef:contract.hRef,
            content: <ContractPreview contractUrl={contract.hRef}/>
        })
    )

    const entities:any = {
        contract: ticketContracts,
        person: {
            person1: {hRef:1, display: "Person 1", content: <div>Person 1 detail to define</div>},
            person2: {hRef:2, display: "Person 2", content: <div>Person 2 detail to define</div>}
        }
    }

    const handleOnTicketNewTab = () => {
        const item = entities[entityType][selection[entityType]]
        openInNewTab(item.hRef, item.display, entityType)
        history.push('/viewTab')
    }

    const handleOnNewTab = () => {
        openInSecondary(ticketId, ticket && ticket.title)
    }

    const handleEntitySelection = (newSelection: any) => setSelection((prev: any) => ({...prev, [entityType]: newSelection}))
    const handleTypeSelection = (value:any) => setEntityType(value)

    const SelectEntities = () => <SelectEntity entities={entities[entityType]} onChange={handleEntitySelection}
        value={selection[entityType]}/>
    const Toolbar = () => <SavingToolbar value={entityType} onChange={handleTypeSelection}/>
    const Content = () => (selection[entityType] ? entities[entityType][selection[entityType]].content : <div/>)
    return (
        <Root>
            <ConsultationPanels header={<SelectEntities/>} content={<Content/>} toolbar={<Toolbar/>}
                onToggle={onClose} onOpenInNew={handleOnTicketNewTab} onNewTab={handleOnNewTab}/>
        </Root>
    )
}

SavingPanels.propTypes = {
    ticketId: PropTypes.string,
    onRemove: PropTypes.func,
    onClose: PropTypes.func,
}

export default SavingPanels;