//import { DxcSidenav } from "@dxc-technology/halstack-react";

import { PanelTickets } from 'views/MyTickets/Old/StyledTickets';
import PropTypes from 'prop-types'
import React from 'react';

//import Reminders from 'components/Reminders/Reminders';
//import useDeskAuth from 'data/hooks/useDeskAuth';

const StatusMenu = (props: any) => {
    const {title, items, onItemClick, value, countArray = {} } = props;

    const selected = (status: string) => value === status;
    //const {profile} = useDeskAuth()
    // const reminders = profile ? profile.reminders : undefined;

    return (
        <PanelTickets className="tickets-menu">
            <PanelTickets.title>{title}</PanelTickets.title>
            <PanelTickets.ParentList className="mt-2 pr-1 pl-2">
                {/* <h5>Views</h5> */}
                {items && items.map((item: any) => <PanelTickets.List key={item.status} className={`cursor-pointer list-group-item d-flex justify-content-between align-items-center border-0 rounded-0 ${selected(item.status) ? 'active' : ''}`} onClick={() => onItemClick(item)}>
                    <PanelTickets.ListTitle className="m-0">{item.title}</PanelTickets.ListTitle>
                    {countArray && countArray[item.status] !== undefined && <small>{countArray[item.status]}</small>}
                </PanelTickets.List>
                )}
            </PanelTickets.ParentList>
            {/* <h5>Reminders</h5>
            <Reminders reminders={reminders}/> */}
        </PanelTickets>
    );
}

StatusMenu.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    ticketTitle: PropTypes.string,
    countArray: PropTypes.any,
    sideNavItems: PropTypes.array
}

export default StatusMenu;
