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

.icon {
    svg {
        max-width: 24px;
        max-height: 24px;
        margin-bottom: 3px;
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
    border: 1px solid #FFFFFF;
    border-radius: 4px;

    svg {
        fill: #000000;
        max-width: 25px;
        max-height: 25px;
    }
`;

export const StyledLabel = styled.label`
  margin-right: 7px;
  font-weight: 600;
`;