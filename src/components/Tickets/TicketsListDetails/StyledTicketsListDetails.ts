import styled from 'styled-components';

const ListDetailsContainer = styled.div`
` as any;

ListDetailsContainer.StyledContentArea = styled.div`
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

ListDetailsContainer.StyledRightSidebar = styled.div`
    max-width: 400px;
    width: 100%;
    padding-left: 10px;

    & > div > div,
    & > div > div > div {
        padding: 0 !important;
    }

    div[data-test="header"] h4 {
        margin-top: 40px;
        margin-bottom: 4px;
    }
`;

ListDetailsContainer.ContentTitle = styled.h4`
    font-size: 15px;
    font-weight: 600;
    color: #2b4358;

    span {
        color: #abbbcb;
    }
`;

export { ListDetailsContainer };