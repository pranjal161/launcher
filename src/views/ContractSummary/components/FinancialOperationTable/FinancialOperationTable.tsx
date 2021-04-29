import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import PremiumTable from './PremiumTable/PremiumTable';
import SurrenderTable from './SurrenderTable/SurrenderTable';
import SwitchTable from './SwitchTable/SwitchTable';
import { getLink } from 'util/functions';

/**
 * Display financial operation in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the financial operation in a Table
 */
const FinancialOperationTable = (props: { contractResponse: any }) => {
    const applicationContext = useContext(ApplicationContext);
    const [premiumsHref, setPremiumHref] = useState<undefined | string>();
    const [surrendersHref, setSurrenderHref] = useState<undefined | string>();
    const [switchHref, setSwitchHref] = useState<undefined | string>();

    useEffect(() => {
        getData();
    }, [applicationContext, props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            setPremiumHref(getLink(props.contractResponse, 'contract:operation_list-premium'));
            setSurrenderHref(getLink(props.contractResponse, 'contract:operation_list-surrender'));
            setSwitchHref(getLink(props.contractResponse, 'contract:operation_list-switch'));
        }
    };

    return (
        <>
            {premiumsHref &&
                <PremiumTable url={premiumsHref} />
            }
            {surrendersHref &&
                <SurrenderTable url={surrendersHref} />
            }
            {switchHref &&
                <SwitchTable url={switchHref} />
            }
        </>
    );
}

export default FinancialOperationTable;
