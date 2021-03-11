import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { AppConfig } from '../../config/appConfig';
import { useEffect, useState } from 'react';
import Table from "../../components/table/table";
import React from 'react';

const FinancialTable = (props: { clientUrl: any }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [premiumUrl, setPremiumUrl] = useState('');
    const financialDataColumns = [
        { label: '_OPERATION', property: 'premium:type' },
        { label: '_CONTRACT_IDENTIFIER', property: 'contract:number' },
        { label: '_EFFECTIVE_DATE', property: 'operation:start_date', type: "date" },
        { label: '_STATUS_DATE', property: 'operation:status_date', type: "date" },
        { label: '_STATUS', property: 'operation:status_label' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount' },
    ]

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (props.clientUrl) {
            axios.get(props.clientUrl, { headers: config.headers }).then(res => {
                const clientNumber = res.data['person:client_number'];
                const premiumUrl = AppConfig.hostUrl.defaultHostUrl + 'financials/premiums?person:client_number=' + clientNumber + '&organization:client_number=';
                setPremiumUrl(premiumUrl);
            });
        }

    }
    return (
        <>
            {premiumUrl && (
                < Table url={premiumUrl} columnId={financialDataColumns} />
            )}
        </>
    )
}
export default FinancialTable
