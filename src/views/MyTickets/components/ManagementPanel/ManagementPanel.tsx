import Card from "components/Card/Card";
import React from 'react';
import StatusMenu from "../StatusMenu/StatusMenu";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Root = styled.div`
  width: 300px;
  background: #FFFFFF;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: auto;
`;

const ManagementPanel = (props:any) => {
    const { items, countArray, ticketsAssignedToList } = props;
    const { t } = useTranslation();

    return (
        <Root>
            <Card>
                <StatusMenu title={t('_VIEWS')} items={items} onItemClick={ticketsAssignedToList} countArray={countArray} {...props} />
            </Card>
        </Root>
    );
};

export default ManagementPanel;
