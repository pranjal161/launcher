import { DxcTable } from "@dxc-technology/halstack-react";
import React from 'react';
import { useTranslation } from 'react-i18next';

const BasketList = (props : any) => {
    const { baskets,  handleTicketClick=() => {
        // Nothing to do
    } } = props
    const { t } = useTranslation();

    return (
        <div className="p-2">
            <DxcTable>
                <tr>
                    <th>{t('_TITLE')}</th>
                    <th>{t('_OWNER')}</th>
                    <th>{t('_STATUS')}</th>
                </tr>
                {baskets.map((basket: any, i: number) => (
                    <tr key={i} onClick={() => handleTicketClick(basket)}>
                        <td>{basket.title}</td>
                        <td>{basket.creatorDisplay}</td>
                        <td>{basket.status}</td>
                    </tr>
                ))}
            </DxcTable>
        </div>
    );
}

export default BasketList;
