import React from 'react';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import { useEffect, useState, useContext } from 'react';
import { getDescriptionValue, getLink } from '../../util/functions';
import { EyeIcon } from '../../assets/svg';
import { StyledButton } from '../../styles/global-style';
import { DxcDialog } from '@dxc-technology/halstack-react';
import { PremiumSummary } from '../../components/premiumSummary/premiumSummary';
import { SurrenderSummary } from '../../components/surrenderSummary/surrenderSummary';
import { SwitchSummary } from '../../components/switchSummary/switchSummary';
import { ApplicationContext } from '../../context/applicationContext';
import axios from 'axios';
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

    const premiumListColumns = [
        { label: '_OPERATION', property: 'premium:type' },
        { label: '_EFFECTIVE_DATE', property: 'operation:period_start_date', type: "date" },
        { label: '_STATUS_DATE', property: 'operation:status_date', type: "date" },
        { label: '_END_DATE', property: 'operation:period_end_date', type: "date" },
        { label: '_STATUS', property: 'premium:status' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: "currency" },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: "currency" }
    ];
    const surrenderListColumns = [
        { label: '_OPERATION', property: 'surrender:type' },
        { label: '_EFFECTIVE_DATE', property: 'operation:value_date', type: "date" },
        { label: '_STATUS', property: 'surrender:status' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: "currency" },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: "currency" }
    ];
    const switchListColumns = [
        { label: '_OPERATION', property: 'switch:type_label' },
        { label: '_EFFECTIVE_DATE', property: 'operation:value_date', type: 'date' },
        { label: '_STATUS', property: 'switch:status_label' },
        { label: '_GROSS_AMOUNT', property: 'operation:amount', type: 'currency' },
        { label: '_NET_AMOUNT', property: 'operation:net_amount', type: 'currency' }
    ];

    useEffect(() => {
        getData();
    }, [applicationContext, props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            const premiumUrl = getLink(props.contractResponse, 'contract:operation_list-premium');
            const surrenderUrl = getLink(props.contractResponse, 'contract:operation_list-surrender');
            const switchUrl = getLink(props.contractResponse, 'contract:operation_list-switch');
            getOperationItems(premiumUrl, 'premiumList')
            getOperationItems(surrenderUrl, 'surrenderList');
            getOperationItems(switchUrl, 'switchList');
        }
    }

    function getOperationItems(url: string, id: string) {
        if (url) {
            axios.get(url, { headers: applicationContext.headers }).then(getResponse => {
                if (getResponse && getResponse.data['_links']['item']) {
                    if (!Array.isArray(getResponse.data['_links']['item'])) {
                        getResponse.data['_links']['item'] = [getResponse.data['_links']['item']];
                    }
                    const response = getResponse.data['_links']['item'];
                    if (id === 'premiumList') {
                        setPremiumData(getResponse.data)
                        setPremiumList(response);
                    } else if (id === 'surrenderList') {
                        setSurrenderData(getResponse.data)
                        setSurrenderList(response);
                    } else if (id === 'switchList') {
                        setSwitchData(getResponse.data)
                        setSwitchList(response);
                    }
                }
            });
        }
    }

    function onClick() {
        setPremiumDialogVisible(false);
        setSurrenderDialogVisible(false);
        setSwitchDialogVisible(false);
    };

    function openPremiumDialog(url: any) {
        setPremiumHref(url);
        setPremiumDialogVisible(true);
    }

    function openSurrenderDialog(url: any) {
        setSurrenderHref(url);
        setSurrenderDialogVisible(true);
    }

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
                                <th>{t(item.label)}</th>
                            ))}
                            <th>{t("_ACTIONS")}</th>
                        </tr>
                        {premiumList.map((row) => (
                            <tr key={row['href']}>
                                {premiumListColumns.map((item) => (
                                    <td>{getDescriptionValue(row['summary'][item.property], item.property, premiumData, item.type)}</td>
                                ))}
                                <td>
                                    <StyledButton
                                        aria-label="add an alarm"
                                        onClick={() => openPremiumDialog(row['href'])} >
                                        <EyeIcon />
                                    </StyledButton>
                                </td>
                            </tr>
                        ))}
                    </DxcTable>
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
                                <th>{t(item.label)}</th>
                            ))}
                            <th>{t("_ACTIONS")}</th>
                        </tr>
                        {surrenderList.map((row) => (
                            <tr key={row['href']}>
                                {surrenderListColumns.map((item) => (
                                    <td>{getDescriptionValue(row['summary'][item.property], item.property, surrenderData, item.type)}</td>
                                ))}
                                <td>
                                    <StyledButton
                                        aria-label="add an alarm"
                                        onClick={() => openSurrenderDialog(row['href'])} >
                                        <EyeIcon />
                                    </StyledButton>
                                </td>
                            </tr>
                        ))}
                    </DxcTable>
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
                                <th>{t(item.label)}</th>
                            ))}
                            <th>{t("_ACTIONS")}</th>
                        </tr>
                        {switchList.map((row) => (
                            <tr key={row['href']}>
                                {switchListColumns.map((item) => (
                                    <td>{getDescriptionValue(row['summary'][item.property], item.property, switchData, item.type)}</td>
                                ))}
                                <td>
                                    <StyledButton
                                        aria-label="add an alarm"
                                        onClick={() => openSwitchDialog(row['href'])} >
                                        <EyeIcon />
                                    </StyledButton>
                                </td>
                            </tr>
                        ))}
                    </DxcTable>
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