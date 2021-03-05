import React from 'react';
import styled from 'styled-components';

//Stylesheet
export const StyledBanner = styled.div`
background-color: #F7F7F7;
padding: 20px;

.xl-icon {
    width: 60px;
    height: 60px;
}

.select-box {
    & > div {
        max-width: 240px;
        width: 100% !important;
    }
}
`;

export const StyledHoverRow = styled.tr`
    &:hover {
        background-color: #F7F7F7;
        cursor: pointer;
    }
`;

export const StyledButton = styled.button`
    border: 1px solid #6f2c91;
    border-radius: 4px;

    svg {
        fill: #6f2c91;
        max-width: 25px;
        max-height: 25px;
    }
`;

export const StyledLabel = styled.label`
  margin-right: 7px;
  font-weight: 600;
`;