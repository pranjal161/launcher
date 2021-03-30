import { DxcProgressBar, DxcTable } from "@dxc-technology/halstack-react";
import { RoundIcon, TimeIcon, TimeLapse } from '../../assets/svg';

import Deadline from '../deadlineComponent/deadline';
import React from 'react';
import useDeskBaskets from '../../data/hooks/useDeskBaskets';
import { useTranslation } from 'react-i18next';

//import { formatValue } from '../../util/functions';

const TicketList = (props: any) => {
    const { tickets, handleTicketClick = () => { 
        // Nothing to do
    } } = props
    const { t } = useTranslation();
    const basketDesk = useDeskBaskets()
    const allBaskets = basketDesk.getAll()

    const getBasketTitle = (basketId: any) => {
        const basket = allBaskets.filter((basket: { id: any; }) => basket.id === basketId);
        return basket.length > 0 ? basket[0].title : '';
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'created':
                return (
                    <div title="To be treated" style={{fill: "#0067B3"}}>
                        <RoundIcon />
                    </div>)
            case 'pending':
                return (
                    <div title="Pending" style={{fill: "goldenrod"}}>
                        <TimeIcon />
                    </div>)
            case 'closed':
                return (
                    <div title="Resolved" style={{fill: "green"}}>
                        <TimeLapse />
                    </div>)
        }
    }

    return (
        <div className="p-2">
            <DxcTable>
                <tr>
                    <th></th>
                    <th>{t('_TITLE')}</th>
                    <th>{t('_BASKET')}</th>
                    <th>{t('_STAGE')}</th>
                    <th>{t('_CLIENT')}</th>
                    <th>{t('_DEADLINE')}</th>
                </tr>
                {allBaskets && tickets.map((ticket: any, i: number) => (
                    <tr key={i} onClick={() => handleTicketClick(ticket)}>
                        <td>{getStatusIcon(ticket.status)}</td>
                        <td>{ticket.title}</td>
                        <td>{getBasketTitle(ticket.basketId)}</td>
                        <td>
                            <div className="progressbar">
                                <DxcProgressBar margin="xxsmall" overlay={false} showValue value={ticket.stage} />
                            </div>
                        </td>
                        <td>{ticket.creatorDisplay.toUpperCase()}</td>
                        <td><Deadline deadline={ticket.deadline} /></td>
                    </tr>
                ))}
            </DxcTable>
        </div>
    );
}

export default TicketList;
