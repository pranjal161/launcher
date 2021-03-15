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
    border: unset;
    border-radius: 4px;
    background: transparent;
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

export const StyledPaginator = styled.div`
    span {
        font-size: 12px !important;
    }

    div[mode="secondary"] {
        width: 35px !important;

        button {
            min-height: 35px !important;
        }
    }
`;

export const StyledMessageContainer = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    z-index: 99;
    justify-content: center;
    align-items: flex-start;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;