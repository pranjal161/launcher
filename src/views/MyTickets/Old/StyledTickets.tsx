import styled from 'styled-components';

const StyledSidenav = styled.div`
    max-width: 190px !important;
    width: 100% !important;
    background: #fff;
    margin-right: 10px;
    min-height: 683px;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    border-radius: 4px;
    overflow: hidden;
    display: flex;

    & > div {
        width: 100% !important;
        max-width: 100% !important;
    }
`as any;

StyledSidenav.SearchInput = styled.div`
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

export { StyledSidenav };

const TicketsContainer = styled.div`
    align-items: start;
    display: flex;
    background: #f2f5f7;
    padding: 10px 0;
    margin-top: 10px;
` as any;

TicketsContainer.StyledContentArea = styled.div`
    min-width: 690px;
    width: 100%;

    .basket-title {
        & > div > div {
          padding: 0 1rem;
        }
        span {
          width: 100%;
        }
    }

    table {
        font-size: 12px;
    }
`;

TicketsContainer.StyledRightSidebar = styled.div`
    max-width: 400px;
    width: 100%;

    .baskets-ticket {
        position: absolute;
        right: 0;
        overflow: visible !important;
    }
`;

TicketsContainer.ContentTitle = styled.h4`
    font-size: 15px;
    font-weight: 600;
    color: #2b4358;

    span {
        color: #abbbcb;
    }
`;

export { TicketsContainer };

const PanelTickets = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 50%;
    overflow: hidden;
    overflow-y: auto;
    padding-top: 20px;

    &.baskets-menu {
        max-height: 40%;
    }
` as any;

PanelTickets.title = styled.h5`
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #71787f;
    font-size: 15px;
    font-weight: 700;
    padding-left: 9px;
`;

PanelTickets.ParentList = styled.ul``;

PanelTickets.List = styled.li`
    color: #71787f !important;
    padding: 5px 10px;

    &.active {
        background-color: #f2f5f7 !important;
        color: #71787f !important;
    }
`;

PanelTickets.ListTitle = styled.h6`
    font-weight: 400;
`;

export { PanelTickets };
