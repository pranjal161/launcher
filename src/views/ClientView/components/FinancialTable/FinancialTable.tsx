import React, { useContext, useEffect, useState } from 'react';

import { AppConfig } from 'config/appConfig';
import { ApplicationContext } from 'context/applicationContext';
import Table from "components/Table/Table";
import useAia from 'data/hooks/useAia';

const FinancialTable = (props: { clientUrl: any }) => {
    const applicationContext = useContext(ApplicationContext);
    const [premiumUrl, setPremiumUrl] = useState('');
    const { fetch } = useAia();
    let client_number;
    let premium;
    const financialDataColumns = [
        { label: '_OPERATION', property: 'premium:type' },
        { label: '_CONTRACT_IDENTIFIER', property: 'contract:number' },
        { label: '_EFFECTIVE_DATE', property: 'operation:start_date', type: 'date' },
        { label: '_STATUS_DATE', property: 'operation:status_date', type: 'date' },
        { label: '_STATUS', property: 'operation:status_label' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount' },
    ];

    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        if (props.clientUrl) {
            fetch(props.clientUrl).then((res: any) => {
                if (props.clientUrl.includes('persons')) {
                    client_number = res.data['person:client_number'];
                    premium =
                        AppConfig.hostUrl.defaultHostUrl + 'financials/premiums?person:client_number=' + client_number;
                    setPremiumUrl(premium);
                } else if (props.clientUrl.includes('organizations')) {
                    client_number = res.data['organization:client_number'];
                    premium =
                        AppConfig.hostUrl.defaultHostUrl +
                        'financials/premiums?organization:client_number=' +
                        client_number;
                    setPremiumUrl(premium);
                }
            });
        }
    };

    return <>{premiumUrl && <Table url={premiumUrl} columnId={financialDataColumns} showPaginator={true} />}</>;
};
export default FinancialTable;
