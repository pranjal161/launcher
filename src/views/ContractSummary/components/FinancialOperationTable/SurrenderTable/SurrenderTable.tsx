import { DxcDialog, DxcHeading, DxcTable } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import { EyeIcon } from 'assets/svg';
import Paginator from "components/Paginator/Paginator";
import { StyledButton } from 'styles/global-style';
import { SurrenderSummary } from '../SurrenderSummary/SurrenderSummary';
import { getDescriptionValue } from 'util/functions';
import useAia from 'data/hooks/useAia';
import { useTranslation } from 'react-i18next';

/**
 * Display financial operation in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the financial operation in a Table
 */
const SurrenderTable = (props: { url: undefined | string }) => {
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [surrenderList, setSurrenderList] = React.useState([]);
    const [surrenderHref, setSurrenderHref] = useState<undefined | any>();
    const [isSurrenderDialogVisible, setSurrenderDialogVisible] = useState(false);
    const [surrenderData, setSurrenderData] = useState<undefined | any>();
    const [surrenderCount, setSurrenderCount] = useState(0);
    const { fetch } = useAia();
    const surrenderListColumns = [
        { label: '_OPERATION', property: 'surrender:type' },
        { label: '_EFFECTIVE_DATE', property: 'operation:value_date', type: 'date' },
        { label: '_STATUS', property: 'surrender:status' },
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
            fetch(tableUrl).then((getResponse: any) => {
                if (getResponse && getResponse.data['_links']['item']) {
                    if (!Array.isArray(getResponse.data['_links']['item'])) {
                        getResponse.data['_links']['item'] = [getResponse.data['_links']['item']];
                    }
                    const response = getResponse.data['_links']['item'];
                    const count = getResponse && getResponse.data && getResponse.data._count;
                    setSurrenderData(getResponse.data);
                    setSurrenderList(response);
                    setSurrenderCount(count === '500+' ? 500 : count);
                }
            });
        }
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
     * Do not display premium, surrender, switch dialog box on the click
     * @returns {void} Do not display premium, surrender, switch dialog box
     */
    function onClick() {
        setSurrenderDialogVisible(false);
    }

    return (
        <>
            {surrenderList.length > 0 && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_SURRENDER_LIST')} />
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
        </>
    )
}

export default SurrenderTable;
