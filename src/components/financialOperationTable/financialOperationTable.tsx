import React from 'react';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import { useEffect } from 'react';
import { get } from "../../util/api-caller";
const FinancialOperationTable = (props: { contractResponse: any }) => {

    const { t } = useTranslation();
    const [premiumList, setPremiumList] = React.useState([]);
    const [surrenderList, setSurrenderList] = React.useState([]);
    const [switchList, setSwitchList] = React.useState([]);

    useEffect(() => {
        getData();
    }, []);

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

    function getLink(response: any, linkName: string) {
        if (response &&
            response._links &&
            response._links[linkName] &&
            response._links[linkName].href) {
            return response._links[linkName].href;
        } else {
            return null;
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


    return (
        <>
            {premiumList.length > 0 && (
                <>
                    <h4>{t('_PREMIUM_LIST')}</h4>
                    <DxcTable>
                        <tr>
                            <th>{t('_OPERATION')}</th>
                            <th>{t('_EFFECTIVE_DATE')}</th>
                            <th>{t('_STATUS_DATE')}</th>
                            <th>{t('_END_DATE')}</th>
                            <th>{t('_STATUS')}</th>
                            <th>{t('_GROSS_AMOUNT')}</th>
                            <th>{t('_NET_AMOUNT')}</th>
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
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            {surrenderList.length > 0 && (
                <>
                    <h4>{t('_SURRENDER_LIST')}</h4>
                    <DxcTable>
                        <tr>
                            <th>{t('_OPERATION')}</th>
                            <th>{t('_EFFECTIVE_DATE')}</th>
                            <th>{t('_STATUS')}</th>
                            <th>{t('_GROSS_AMOUNT')}</th>
                            <th>{t('_NET_AMOUNT')}</th>
                        </tr>
                        {surrenderList.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['surrender:type']}</td>
                                <td>{row['summary']['operation:value_date']}</td>
                                <td>{row['summary']['surrender:status']}</td>
                                <td>{row['summary']['operation:amount']}</td>
                                <td>{row['summary']['operation:net_amount']}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            {switchList.length > 0 && (
                <>
                    <h4>{t('_SWITCH_LIST')}</h4>
                    <DxcTable>
                        <tr>
                            <th>{t('_OPERATION')}</th>
                            <th>{t('_EFFECTIVE_DATE')}</th>
                            <th>{t('_STATUS')}</th>
                            <th>{t('_GROSS_AMOUNT')}</th>
                            <th>{t('_NET_AMOUNT')}</th>
                        </tr>
                        {switchList.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['switch:type_label']}</td>
                                <td>{row['summary']['operation:value_date']}</td>
                                <td>{row['summary']['switch:status_label']}</td>
                                <td>{row['summary']['operation:amount']}</td>
                                <td>{row['summary']['operation:net_amount']}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
        </>
    );

}

export default FinancialOperationTable;