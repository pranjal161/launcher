import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { AppConfig } from '../../config/appConfig';
import { useEffect } from 'react';
import React from 'react';

const FinancialTable = (props: { clientUrl: any }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [financialData, setFinancialData] = React.useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (props.clientUrl) {
            axios.get(props.clientUrl, { headers: config.headers }).then(res => {
                const clientNumber = res.data['person:client_number'];
                const premiumUrl = AppConfig.hostUrl.defaultHostUrl + 'financials/premiums?person:client_number=' + clientNumber + '&organization:client_number=';
                axios.get(premiumUrl, { headers: config.headers }).then(res => {
                    if (res && res.data && res.data._links && res.data._links.item) {
                        res.data._links.item = Array.isArray(res.data._links.item) ? res.data._links.item : [res.data._links.item]
                        res.data._links.item.forEach((element: { summary: { [x: string]: string; }; href: string }) => {
                            setFinancialData(res.data._links.item);
                        });
                    }
                });
            })
        }
    }
    return (
        <>
            {financialData.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_OPERATION')}</th>
                        <th>{t('_CONTRACT_IDENTIFIER')}</th>
                        <th>{t('_EFFECTIVE_DATE')}</th>
                        <th>{t('_STATUS_DATE')}</th>
                        <th>{t('_STATUS')}</th>
                        <th>{t('_GROSS_AMOUNT')}</th>
                        <th>{t('_NET_AMOUNT')}</th>
                    </tr>
                    {financialData.map((row) => (
                        <tr key={row['href']}>
                            <td>{row['summary']['premium:type']}</td>
                            <td>{row['summary']['contract:number']}</td>
                            <td>{row['summary']['operation:start_date']}</td>
                            <td>{row['summary']['operation:status_date']}</td>
                            <td>{row['summary']['operation:status_label']}</td>
                            <td>{row['summary']['operation:amount']}</td>
                            <td>{row['summary']['operation:net_amount']}</td>
                        </tr>
                    ))}
                </DxcTable>
            )}
        </>
    );
}
export default FinancialTable
