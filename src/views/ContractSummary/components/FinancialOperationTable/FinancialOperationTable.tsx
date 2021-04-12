import { DxcDialog, DxcTable } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';
import { getDescriptionValue, getLink } from 'util/functions';

import { ApplicationContext } from 'context/applicationContext';
import { EyeIcon } from 'assets/svg';
import Paginator from "components/Paginator/Paginator";
import { PremiumSummary} from "views/ContractSummary/components/PremiumSummary/PremiumSummary";
import { StyledButton } from 'styles/global-style';
import { SurrenderSummary} from "views/ContractSummary/components/SurrenderSummary/SurrenderSummary";
import { SwitchSummary} from "views/ContractSummary/components/SwitchSummary/SwitchSummary";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

/**
 * Display financial operation in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the financial operation in a Table
 */
const FinancialOperationTable = (props: { contractResponse: any }) => {
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [premiumList, setPremiumList] = React.useState([]);
    const [surrenderList, setSurrenderList] = React.useState([]);
    const [switchList, setSwitchList] = React.useState([]);
    const [premiumHref, setPremiumHref] = useState<undefined | string>();
    const [surrenderHref, setSurrenderHref] = useState<undefined | any>();
    const [switchHref, setSwitchHref] = useState<undefined | any>();
    const [isPremiumDialogVisible, setPremiumDialogVisible] = useState(false);
    const [isSurrenderDialogVisible, setSurrenderDialogVisible] = useState(false);
    const [isSwitchDialogVisible, setSwitchDialogVisible] = useState(false);
    const [premiumData, setPremiumData] = useState<undefined | any>();
    const [surrenderData, setSurrenderData] = useState<undefined | any>();
    const [switchData, setSwitchData] = useState<undefined | any>();
    const [premiumCount, setPremiumCount] = useState(0);
    const [switchCount, setSwitchCount] = useState(0);
    const [surrenderCount, setSurrenderCount] = useState(0);

    const premiumListColumns = [
        { label: '_OPERATION', property: 'premium:type' },
        { label: '_EFFECTIVE_DATE', property: 'operation:period_start_date', type: 'date' },
        { label: '_STATUS_DATE', property: 'operation:status_date', type: 'date' },
        { label: '_END_DATE', property: 'operation:period_end_date', type: 'date' },
        { label: '_STATUS', property: 'premium:status' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: 'currency' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: 'currency' },
    ];

    const surrenderListColumns = [
        { label: '_OPERATION', property: 'surrender:type' },
        { label: '_EFFECTIVE_DATE', property: 'operation:value_date', type: 'date' },
        { label: '_STATUS', property: 'surrender:status' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: 'currency' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: 'currency' },
    ];

    const switchListColumns = [
        { label: '_OPERATION', property: 'switch:type_label' },
        { label: '_EFFECTIVE_DATE', property: 'operation:value_date', type: 'date' },
        { label: '_STATUS', property: 'switch:status_label' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: 'currency' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: 'currency' },
    ];

    useEffect(() => {
        getData();
    }, [applicationContext, props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            const premiumUrl = getLink(props.contractResponse, 'contract:operation_list-premium');
            const surrenderUrl = getLink(props.contractResponse, 'contract:operation_list-surrender');
            const switchUrl = getLink(props.contractResponse, 'contract:operation_list-switch');
           
            getOperationItems(premiumUrl, 'premiumList');
            getOperationItems(surrenderUrl, 'surrenderList');
            getOperationItems(switchUrl, 'switchList');
        }
    };

    /**
     * 
     * @param {url} url URL of the operation
     * @param {id} id ID of the operation
     * @returns {void} Return the resource depending on the id of the operation
     */
    function getOperationItems(url: string, id: string) {
        if (url) {
            const tableUrl = url + '?_num=5';
            axios.get(tableUrl, { headers: applicationContext.headers }).then((getResponse) => {
                if (getResponse && getResponse.data['_links']['item']) {
                    if (!Array.isArray(getResponse.data['_links']['item'])) {
                        getResponse.data['_links']['item'] = [getResponse.data['_links']['item']];
                    }
                    const response = getResponse.data['_links']['item'];
                    const count = getResponse && getResponse.data && getResponse.data._count;
                    
                    if (id === 'premiumList') {
                        setPremiumData(getResponse.data);
                        setPremiumCount(count === '500+' ? 500 : count);
                        setPremiumList(response);
                    } 
                    else if (id === 'surrenderList') {
                        setSurrenderData(getResponse.data);
                        setSurrenderList(response);
                        setSurrenderCount(count === '500+' ? 500 : count);
                    } 
                    else if (id === 'switchList') {
                        setSwitchData(getResponse.data);
                        setSwitchList(response);
                        setSwitchCount(count === '500+' ? 500 : count);
                    }
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
        setSurrenderDialogVisible(false);
        setSwitchDialogVisible(false);
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

    /**
     * Display surrender dialog box
     * @param {url} url URL of the surrender
     * @returns {void} Display surrender dialog box
     */
    function openSurrenderDialog(url: any) {
        setSurrenderHref(url);
        setSurrenderDialogVisible(true);
    }

    /**
     * Display switch dialog box
     * @param {url} url URL of the switch
     * @returns {void} Display switch dialog box
     */
    function openSwitchDialog(url: any) {
        setSwitchHref(url);
        setSwitchDialogVisible(true);
    }

    return (
        <>
            {premiumList.length > 0 && (
                <>
                    <h5>{t('_PREMIUM_LIST')}</h5>
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
            {surrenderList.length > 0 && (
                <>
                    <h5>{t('_SURRENDER_LIST')}</h5>
                    <DxcTable>
                        <tr>
                            {surrenderListColumns.map((item) => (
                                <th key={item.label}>{t(item.label)}</th>
                            ))}
                            <th>{t('_ACTIONS')}</th>
                        </tr>
                        {surrenderList.map((row) => (
                            <tr key={row['href']}>
                                {surrenderListColumns.map((item) => (
                                    <td key={item.label}>
                                        {getDescriptionValue(
                                            row['summary'][item.property],
                                            item.property,
                                            surrenderData,
                                            item.type,
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <StyledButton
                                        aria-label="add an alarm"
                                        onClick={() => openSurrenderDialog(row['href'])}
                                    >
                                        <EyeIcon />
                                    </StyledButton>
                                </td>
                            </tr>
                        ))}
                    </DxcTable>
                    <Paginator totalItems={surrenderCount} itemsPerPage={5} data={surrenderData} handler={getOperationItems} />
                    {surrenderHref && isSurrenderDialogVisible && (
                        <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={onClick}>
                            <SurrenderSummary surrenderSummaryHref={surrenderHref} />
                        </DxcDialog>
                    )}
                </>
            )}
            {switchList.length > 0 && (
                <>
                    <h5>{t('_SWITCH_LIST')}</h5>
                    <DxcTable>
                        <tr>
                            {switchListColumns.map((item) => (
                                <th key={item.label}>{t(item.label)}</th>
                            ))}
                            <th>{t('_ACTIONS')}</th>
                        </tr>
                        {switchList.map((row) => (
                            <tr key={row['href']}>
                                {switchListColumns.map((item) => (
                                    <td key={item.label}>
                                        {getDescriptionValue(
                                            row['summary'][item.property],
                                            item.property,
                                            switchData,
                                            item.type,
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <StyledButton
                                        aria-label="add an alarm"
                                        onClick={() => openSwitchDialog(row['href'])}
                                    >
                                        <EyeIcon />
                                    </StyledButton>
                                </td>
                            </tr>
                        ))}
                    </DxcTable>
                    <Paginator totalItems={switchCount} itemsPerPage={5} data={surrenderData} handler={getOperationItems} />
                    {switchHref && isSwitchDialogVisible && (
                        <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={onClick}>
                            <SwitchSummary switchSummaryHref={switchHref} />
                        </DxcDialog>
                    )}
                </>
            )}
        </>
    );
}

export default FinancialOperationTable;
