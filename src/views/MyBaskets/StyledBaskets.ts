import styled from 'styled-components';

const StyledSidenav = styled.div`
    max-width: 220px !important;
    width: 100% !important;
    background: #FFFFFF;
    margin-right: 10px;
    min-height: 683px;
    //box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
  flex-direction: column;
  

    & > div {
        width: 100% !important;
        max-width: 100% !important;
    }
`as any;

export { StyledSidenav };

const BasketsContainer = styled.div`
    align-items: start;
    display: flex;
    background: #f2f5f7;
    padding: 10px 0;
    margin-top: 10px;
` as any;

BasketsContainer.ContentTitle = styled.h4`
    font-size: 15px;
    font-weight: 600;
    color: #2b4358;

    span {
        color: #abbbcb;
    }
`;

export { BasketsContainer };

const PanelBaskets = styled.div`
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

PanelBaskets.title = styled.h5`
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #71787f;
    font-size: 15px;
    font-weight: 700;
    padding-left: 9px;
`;

PanelBaskets.ParentList = styled.ul``;

PanelBaskets.List = styled.li`
    color: #71787f !important;
    padding: 5px 10px;

    &.active {
        background-color: #f2f5f7 !important;
        color: #71787f !important;
    }
`;

PanelBaskets.ListTitle = styled.h6`
    font-weight: 400;
`;

export { PanelBaskets };
