import React from 'react';
import { DxcTable } from "@dxc-technology/halstack-react";
import { useTranslation } from 'react-i18next';

const TicketList = (props : any) => {
    const { tickets,  handleTicketClick=()=>{} } = props
    const { t } = useTranslation();


    return (
        <div className="p-2">
            <DxcTable>
                <tr>
                    <th>{t('_TITLE')}</th>
                    <th>{t('_OWNER')}</th>
                    <th>{t('_STATUS')}</th>
                </tr>
                {tickets.map((ticket: any, i: number) => (
                    <tr key={i} onClick={() => handleTicketClick(ticket)}>
                        <td>{ticket.title}</td>
                        <td>{ticket.creatorDisplay}</td>
                        <td>{ticket.status}</td>
                    </tr>
                ))}
            </DxcTable>
        </div>
    );
}

export default TicketList;
