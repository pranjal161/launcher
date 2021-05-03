import Card from "components/Card/Card";
import React from 'react';
import Reminders from "components/Reminders/Reminders";
import StatusMenu from "../StatusMenu/StatusMenu";
import useDeskAuth from "data/hooks/useDeskAuth";
import { useTranslation } from 'react-i18next';

const ManagementPanel = (props: any) => {
    const { items, countArray, ticketsAssignedToList } = props;
    const { t } = useTranslation();
    const { profile } = useDeskAuth()
    const reminders = profile ? profile.reminders : undefined;

    return (
        <>
            <Card>
                <StatusMenu title={t('_VIEWS')} items={items} onItemClick={ticketsAssignedToList} countArray={countArray} {...props} />
                <Reminders reminders={reminders}></Reminders>
            </Card>
        </>
    );
};

export default ManagementPanel;
