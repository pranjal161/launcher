import React from 'react';
import TicketSavingConsultationPanels
    from "../../../../../components/TicketSavingConsultationPanels/TicketSavingConsultationPanels";
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
  width: 500px;
  height: 600px;
  margin: 10px;
`;

const TrainingConsultationPanel = () => (
    <Root>
        <Test>
            <TicketSavingConsultationPanels></TicketSavingConsultationPanels>
        </Test>
    </Root>
)

export default TrainingConsultationPanel;
