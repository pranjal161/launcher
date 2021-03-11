import React from 'react';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import { useEffect, useState, useContext } from 'react';
import { get } from "../../util/api-caller";
import { getLink } from '../../util/functions';
import { EyeIcon } from '../../assets/svg';
import { StyledButton } from '../../styles/global-style';
import { DxcDialog } from '@dxc-technology/halstack-react';
import { PremiumSummary } from '../../components/premiumSummary/premiumSummary';
import { SurrenderSummary } from '../../components/surrenderSummary/surrenderSummary';
import { SwitchSummary } from '../../components/switchSummary/switchSummary';
import { ApplicationContext } from '../../context/applicationContext';
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

    useEffect(() => {
        getData();
    }, [applicationContext]);

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
            get(url).then(getResponse => {
                if (getResponse && getResponse['_links']['item']) {
                    if (!Array.isArray(getResponse['_links']['item'])) {
                        getResponse['_links']['item'] = [getResponse['_links']['item']];
                    }
                    const response = getResponse['_links']['item'];
                    if (id === 'premiumList') {
                        setPremiumList(response);
                    } else if (id === 'surrenderList') {
                        setSurrenderList(response);
                    } else if (id === 'switchList') {
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
                            <th>{t('_OPERATION')}</th>
                            <th>{t('_EFFECTIVE_DATE')}</th>
                            <th>{t('_STATUS_DATE')}</th>
                            <th>{t('_END_DATE')}</th>
                            <th>{t('_STATUS')}</th>
                            <th>{t('_GROSS_AMOUNT')}</th>
                            <th>{t('_NET_AMOUNT')}</th>
                            <th>{t("_ACTIONS")}</th>
                        </tr>
                        {premiumList.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['premium:type']}</td>
                                <td>{row['summary']['operation:period_start_date']}</td>
                                <td>{row['summary']['operation:status_date']}</td>
                                <td>{row['summary']['operation:period_end_date']}</td>
                                <td>{row['summary']['premium:status']}</td>
                                <td>{row['summary']['operation:amount']}</td>
                                <td>{row['summary']['operation:net_amount']}</td>
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
                            <th>{t('_OPERATION')}</th>
                            <th>{t('_EFFECTIVE_DATE')}</th>
                            <th>{t('_STATUS')}</th>
                            <th>{t('_GROSS_AMOUNT')}</th>
                            <th>{t('_NET_AMOUNT')}</th>
                            <th>{t("_ACTIONS")}</th>
                        </tr>
                        {surrenderList.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['surrender:type']}</td>
                                <td>{row['summary']['operation:value_date']}</td>
                                <td>{row['summary']['surrender:status']}</td>
                                <td>{row['summary']['operation:amount']}</td>
                                <td>{row['summary']['operation:net_amount']}</td>
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
                            <th>{t('_OPERATION')}</th>
                            <th>{t('_EFFECTIVE_DATE')}</th>
                            <th>{t('_STATUS')}</th>
                            <th>{t('_GROSS_AMOUNT')}</th>
                            <th>{t('_NET_AMOUNT')}</th>
                            <th>{t("_ACTIONS")}</th>
                        </tr>
                        {switchList.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['switch:type_label']}</td>
                                <td>{row['summary']['operation:value_date']}</td>
                                <td>{row['summary']['switch:status_label']}</td>
                                <td>{row['summary']['operation:amount']}</td>
                                <td>{row['summary']['operation:net_amount']}</td>
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