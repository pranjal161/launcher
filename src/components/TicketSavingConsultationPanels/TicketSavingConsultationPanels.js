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
    const [currentEntity, setCurrentEntity] = useState('contract')
    const entities = {
        contract:
            [{display: "contract A", id: 'contractA'}, {
                display: "contract B",
                id: 'contractB'
            }, {display: "contract C", id: 'contractC'}],
        person:  [{display: "Person 1", id: 'person1'},
            {display: "Person 2", id: 'person2'}],
    }

    const SelectEntities = () => <SelectEntity entities={entities[currentEntity]}></SelectEntity>
    const Toolbar = () => <SavingToolbar value={currentEntity} onChange={(value) => setCurrentEntity(value)}/>

    return (
        <Root>
            <ConsultationPanels header={<SelectEntities/>} content={"Content"} toolbar={<Toolbar/>}/>
        </Root>
    )
}

export default TicketSavingConsultationPanels;
