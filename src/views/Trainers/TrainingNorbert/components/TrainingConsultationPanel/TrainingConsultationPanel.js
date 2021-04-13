import React from 'react';
import SavingPanels
    from "../../../../../components/Tickets/Panels/SavingPanels/SavingPanels";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  margin: 10px;
`;


const Test = styled.div`
  border-style: none;
  border-width: medium;
  width: 434px;
  height: 600px;
  margin: 10px;
`;

const TrainingConsultationPanel = () => (
    <Root>
        <Test>
            <SavingPanels/>
        </Test>
    </Root>
)

export default TrainingConsultationPanel;
