import { DxcSidenav } from '@dxc-technology/halstack-react';
import React from 'react';
import Reminders from 'components/Reminders/Reminders';
import StatusMenu from "../TicketTitle/StatusMenu";
import { StyledSidenav } from '../../StyledTickets';
import useDeskAuth from 'data/hooks/useDeskAuth';
import { useTranslation } from 'react-i18next';

const ManagementPanel = (props:any) => {
    const { items, countArray, ticketsAssignedToList } = props;
    const {profile} = useDeskAuth()
    const reminders = profile ? profile.reminders : undefined;
    const { t } = useTranslation();

    return (
        <StyledSidenav>
            <DxcSidenav>
                <StatusMenu title={t('_VIEWS')} items={items} onItemClick={ticketsAssignedToList} countArray={countArray} {...props} />
                <Reminders reminders={reminders}></Reminders>
            </DxcSidenav>
        </StyledSidenav>
    );
};

export default ManagementPanel;