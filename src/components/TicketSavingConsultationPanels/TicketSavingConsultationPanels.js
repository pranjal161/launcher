import React, {useState} from 'react';
import ConsultationPanels from "../ConsultationPanels/ConsultationPanels";
import SavingToolbar from "../ConsultationPanels/components/SavingToolbar/SavingToolbar";
import SelectEntity from "../ConsultationPanels/components/SelectEntity/SelectEntity";
import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const TicketSavingConsultationPanels = () => {
    const [entityType, setEntityType] = useState('contract')
    const [currentEntity, setCurrentEntity] = useState({})
    const entities = {
        contract:
            [{display: "contract A", id: 'contractA'}, {
                display: "contract B",
                id: 'contractB'
            }, {display: "contract C", id: 'contractC'}],
        person:  [{display: "Person 1", id: 'person1'},
            {display: "Person 2", id: 'person2'}],
    }

    const handleEntitySelection = (selection) => setCurrentEntity((prev) => ({...prev,[entityType] : selection}))
    const handleTypeSelection = (value) => setEntityType(value)

    const SelectEntities = () => <SelectEntity entities={entities[entityType]} onChange={handleEntitySelection} value={currentEntity[entityType]}></SelectEntity>
    const Toolbar = () => <SavingToolbar value={entityType} onChange={handleTypeSelection}/>
    const Content = () => <div> Content of id : {currentEntity[entityType]} </div>
    return (
        <Root>
            <ConsultationPanels header={<SelectEntities/>} content={<Content/>} toolbar={<Toolbar/>}/>
        </Root>
    )
}

export default TicketSavingConsultationPanels;
