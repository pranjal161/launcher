import ConsultationPanels from "components/ConsultationPanels/ConsultationPanels";
import React from 'react';
import styled from "styled-components";

export const Root = styled.div`
  border-style: dotted;
  border-width: medium;
  width: 500px;
  height: 600px;
  margin: 10px;
`;

const TrainingConsultationPanel = () => (
    <Root>
        <ConsultationPanels/>
    </Root>
)

export default TrainingConsultationPanel;
