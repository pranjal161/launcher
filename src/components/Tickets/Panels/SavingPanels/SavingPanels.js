import React, {useState} from 'react';
import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import ContractPreview from "views/Trainers/TrainingPranjal/ContractPreview/ContractPreview";
import PropTypes from "prop-types";
import SavingToolbar from "./components/SavingToolbar/SavingToolbar";
import SelectEntity from "components/ConsultationPanels/components/SelectEntity/SelectEntity";
import styled from "styled-components";
import useDeskTickets from "data/hooks/useDeskTickets";

const Root = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
`;


const SavingPanels = ({ticketId, onClose}) => {
    const {getOne} = useDeskTickets()
    const [entityType, setEntityType] = useState('contract')
    const [selection, setSelection] = useState({}) // We store selection per entityType
    const ticket = getOne(ticketId)
    if (!ticket)
        return (<></>)


    const ticketContracts = {}

    ticket.relatedContract && ticket.relatedContract.forEach((contract) => (
        ticketContracts[contract.id] = {
            display: contract.title.split(':')[0],
            displayLong: contract.title,
            content: <ContractPreview contractUrl={contract.hRef}/>
        })
    )

    const entities = {
        contract: ticketContracts,
        person: {
            person1: {display: "Person 1", content: <div>Person 1</div>},
            person2: {display: "Person 2", content: <div>Person 2</div>}
        }
    }

    const handleEntitySelection = (newSelection) => setSelection((prev) => ({...prev, [entityType]: newSelection}))
    const handleTypeSelection = (value) => setEntityType(value)

    const SelectEntities = () => <SelectEntity entities={entities[entityType]} onChange={handleEntitySelection}
        value={selection[entityType]}/>
    const Toolbar = () => <SavingToolbar value={entityType} onChange={handleTypeSelection}/>
    const Content = () => (selection[entityType] ? entities[entityType][selection[entityType]].content : <div/>)
    return (
        <Root>
            <ConsultationPanels header={<SelectEntities/>} content={<Content/>} toolbar={<Toolbar/>}
                onToggle={onClose}/>
        </Root>
    )
}

SavingPanels.propTypes = {
    ticketId: PropTypes.string,
    onRemove: PropTypes.func,
    onClose: PropTypes.func,
}

export default SavingPanels;
