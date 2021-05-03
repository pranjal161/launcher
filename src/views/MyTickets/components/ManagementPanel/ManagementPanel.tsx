import Card from "components/Card/Card";
import React from 'react';
import StatusMenu from "../StatusMenu/StatusMenu";
import { useTranslation } from 'react-i18next';

const ManagementPanel = (props: any) => {
    const { items, countArray, ticketsAssignedToList } = props;
    const { t } = useTranslation();

    return (
        <>
            <Card>
                <StatusMenu title={t('_VIEWS')} items={items} onItemClick={ticketsAssignedToList} countArray={countArray} {...props} />
            </Card>
        </>
    );
};

export default ManagementPanel;
