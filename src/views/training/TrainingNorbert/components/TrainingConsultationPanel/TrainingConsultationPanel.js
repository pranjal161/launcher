import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import React from 'react';
import SelectEntity from "../../../../../components/ConsultationPanels/components/SelectEntity/SelectEntity";
import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  margin: 10px;
`;

export const DAGDIG205 = styled.div`
  border-style: dotted;
  border-width: medium;
  width: 500px;
  height: 600px;
  margin: 10px;
`;

const entities = [{display: "contract A", id: 'contractA'}, {
    display: "contract B",
    id: 'contractB'
}, {display: "contract C", id: 'contractC'}]

const DAGDIG206 =() => <SelectEntity entities={entities}></SelectEntity>

const TrainingConsultationPanel = () => (
    <Root>
        <DAGDIG205>
            <ConsultationPanels header={<DAGDIG206/>}/>
        </DAGDIG205>
        <DAGDIG206/>
    </Root>
)

export default TrainingConsultationPanel;
