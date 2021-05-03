import Card from "components/Card/Card";
import React from 'react';
import Reminders from "components/Reminders/Reminders";
import StatusMenu from "../StatusMenu/StatusMenu";
import styled from "styled-components";
import useDeskAuth from "data/hooks/useDeskAuth";
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

const ManagementPanel = (props: any) => {
    const { items, countArray, ticketsAssignedToList } = props;
    const { t } = useTranslation();
    const { profile } = useDeskAuth()
    const reminders = profile ? profile.reminders : undefined;

    return (
        <Root>
            <Card>
                <StatusMenu title={t('_VIEWS')} items={items} onItemClick={ticketsAssignedToList} countArray={countArray} {...props} />
                <Reminders reminders={reminders}></Reminders>
            </Card>
        </Root>
    );
};

export default ManagementPanel;
