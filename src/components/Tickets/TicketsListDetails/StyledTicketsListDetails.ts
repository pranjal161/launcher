import styled from 'styled-components';

const ListDetailsContainer = styled.div`
` as any;

ListDetailsContainer.StyledContentArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  table {
    font-size: 12px;
  }
`;

ListDetailsContainer.StyledRightSidebar = styled.div`
  flex : 1 0 394px;
  & > div > div,
  & > div > div > div {
    padding: 0 !important;
  }
  
`;


export {ListDetailsContainer};
