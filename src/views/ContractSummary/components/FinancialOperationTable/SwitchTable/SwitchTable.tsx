import { DxcDialog, DxcHeading, DxcTable } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import { EyeIcon } from 'assets/svg';
import Paginator from "components/Paginator/Paginator";
import { StyledButton } from 'styles/global-style';
import { SwitchSummary } from '../SwitchSummary/SwitchSummary';
import axios from 'axios';
import { getDescriptionValue } from 'util/functions';
import { useTranslation } from 'react-i18next';

/**
 * Display financial operation in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the financial operation in a Table
 */
const SwitchTable = (props: { url: undefined | string }) => {
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [switchList, setSwitchList] = React.useState([]);
    const [switchHref, setSwitchHref] = useState<undefined | any>();
    const [isSwitchDialogVisible, setSwitchDialogVisible] = useState(false);
    const [switchData, setSwitchData] = useState<undefined | any>();
    const [switchCount, setSwitchCount] = useState(0);


    const switchListColumns = [
        { label: '_OPERATION', property: 'switch:type_label' },
        { label: '_EFFECTIVE_DATE', property: 'operation:value_date', type: 'date' },
        { label: '_STATUS', property: 'switch:status_label' },
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
                    setSwitchData(getResponse.data);
                    setSwitchList(response);
                    setSwitchCount(count === '500+' ? 500 : count);
                }
            });
        }
    }

    /**
     * Do not display premium, surrender, switch dialog box on the click
     * @returns {void} Do not display premium, surrender, switch dialog box
     */
    function onClick() {
        setSwitchDialogVisible(false);
    }

    /**
     * Display premium dialog box
     * @param {url} url URL of the premium
     * @returns {void} Display premium dialog box
     */
    function openSwitchDialog(url: any) {
        setSwitchHref(url);
        setSwitchDialogVisible(true);
    }

    return (
        <>
            {switchList.length > 0 && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_SWITCH_LIST')} />
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
                    <Paginator totalItems={switchCount} itemsPerPage={5} data={switchData} handler={getOperationItems} />
                    {switchHref && isSwitchDialogVisible && (
                        <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={onClick}>
                            <SwitchSummary switchSummaryHref={switchHref} />
                        </DxcDialog>
                    )}
                </>
            )}
        </>
    )
}

export default SwitchTable;
