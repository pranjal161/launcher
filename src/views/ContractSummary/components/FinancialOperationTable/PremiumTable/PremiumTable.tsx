import { DxcDialog, DxcHeading, DxcTable } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import { EyeIcon } from 'assets/svg';
import Paginator from "components/Paginator/Paginator";
import { PremiumSummary } from "views/ContractSummary/components/FinancialOperationTable/PremiumSummary/PremiumSummary";
import { StyledButton } from 'styles/global-style';
import axios from 'axios';
import { getDescriptionValue } from 'util/functions';
import { useTranslation } from 'react-i18next';

/**
 * Display financial operation in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the financial operation in a Table
 */
const PremiumTable = (props: { url: undefined | string }) => {
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [premiumList, setPremiumList] = React.useState([]);

    const [premiumHref, setPremiumHref] = useState<undefined | string>();

    const [isPremiumDialogVisible, setPremiumDialogVisible] = useState(false);

    const [premiumData, setPremiumData] = useState<undefined | any>();

    const [premiumCount, setPremiumCount] = useState(0);

    const premiumListColumns = [
        { label: '_OPERATION', property: 'premium:type' },
        { label: '_EFFECTIVE_DATE', property: 'operation:period_start_date', type: 'date' },
        { label: '_STATUS_DATE', property: 'operation:status_date', type: 'date' },
        { label: '_END_DATE', property: 'operation:period_end_date', type: 'date' },
        { label: '_STATUS', property: 'premium:status' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: 'currency' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: 'currency' },
    ];


    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        if (props.url) {
            getOperationItems(props.url);
        }
    };

    /**
     * 
     * @param {url} url URL of the operation
     * @param {id} id ID of the operation
     * @returns {void} Return the resource depending on the id of the operation
     */
    function getOperationItems(url: string) {
        if (url) {
            const tableUrl = url + '?_num=5';
            axios.get(tableUrl, { headers: applicationContext.headers }).then((getResponse) => {
                if (getResponse && getResponse.data['_links']['item']) {
                    if (!Array.isArray(getResponse.data['_links']['item'])) {
                        getResponse.data['_links']['item'] = [getResponse.data['_links']['item']];
                    }
                    const response = getResponse.data['_links']['item'];
                    const count = getResponse && getResponse.data && getResponse.data._count;


                    setPremiumData(getResponse.data);
                    setPremiumCount(count === '500+' ? 500 : count);
                    setPremiumList(response);
                }
            });
        }
    }

    /**
     * Do not display premium, surrender, switch dialog box on the click
     * @returns {void} Do not display premium, surrender, switch dialog box
     */
    function onClick() {
        setPremiumDialogVisible(false);
    }

    /**
     * Display premium dialog box
     * @param {url} url URL of the premium
     * @returns {void} Display premium dialog box
     */
    function openPremiumDialog(url: any) {
        setPremiumHref(url);
        setPremiumDialogVisible(true);
    }

    return (
        <>
            {premiumList.length > 0 && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_PREMIUM_LIST')} />
                    <DxcTable>
                        <tr>
                            {premiumListColumns.map((item) => (
                                <th key={item.label}>{t(item.label)}</th>
                            ))}
                            <th>{t('_ACTIONS')}</th>
                        </tr>
                        {premiumList.map((row) => (
                            <tr key={row['href']}>
                                {premiumListColumns.map((item) => (
                                    <td key={item.label}>
                                        {getDescriptionValue(
                                            row['summary'][item.property],
                                            item.property,
                                            premiumData,
                                            item.type,
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <StyledButton
                                        aria-label="add an alarm"
                                        onClick={() => openPremiumDialog(row['href'])}
                                    >
                                        <EyeIcon />
                                    </StyledButton>
                                </td>
                            </tr>
                        ))}
                    </DxcTable>
                    <Paginator totalItems={premiumCount} itemsPerPage={5} data={premiumData} handler={getOperationItems} />
                    {premiumHref && isPremiumDialogVisible && (
                        <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={onClick}>
                            <PremiumSummary premiumSummaryHref={premiumHref} />
                        </DxcDialog>
                    )}
                </>
            )}
        </>
    )
}

export default PremiumTable;
