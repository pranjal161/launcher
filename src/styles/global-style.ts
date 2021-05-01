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

export const StyledButtonWhiteSVG = styled.button`
    border: unset;
    border-radius: 4px;
    background: transparent;
    svg {
        fill: #FFFFFF;
        max-width: 25px;
        max-height: 25px;
    }
`;

export const StyledLabel = styled.label`
  margin-right: 7px;
  color: gray;
  width: ${(props : { width: number}) => (props.width ? props.width : 'unset')}px;
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
    z-index: 99999;
    justify-content: center;
    align-items: flex-start;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const StyledToolbarList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
`;

interface ListItemProps {
    readonly active: boolean;
}
export const StyledToolbarItem = styled.li<ListItemProps>`
  display: block;
  color: #000;
  text-decoration: none;
  background-color: ${(props: any) => (props.active ? '#EAE2F8' : '#ffffff')};
`;


export const StyledDivider = styled.div`
  flex: 1 1 auto;
  border: 1px solid #D9E2EC;
  margin-block: 20px;
`;


export const StyledMainDivider = styled.div`
  flex: 1 1 auto;
  border: 1px solid #D9E2EC;
  margin-block: 1px;
`;

export const StyledSidenavSearchInput = styled.div`
    & > div {
        margin: 0 !important;
        padding: 10px;
        width: 100%;
    }
    
    label {
        color: #71787f !important;
        font-size: 13px !important;
        letter-spacing: 0 !important;
        margin-left: 7px;
        margin-top: 1px;

        & + div {
            &:before, &:after {
                border-radius: 4px;
                border-color: #71787f !important;
            }
        }
    }

    input {
        border: 1px solid #71787f;
        color: #71787f !important;
        padding: 5px;
        border-radius: 4px;
    }
`;
