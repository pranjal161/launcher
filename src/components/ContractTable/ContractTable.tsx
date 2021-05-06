import { EyeIcon, OpenInNewIcon } from 'assets/svg';
import { StyledButton, StyledHoverRow } from 'styles/global-style';

import { DxcTable } from '@dxc-technology/halstack-react';
import Paginator from "components/Paginator/Paginator";
import React from 'react';
import { getDescriptionValue } from 'util/functions';
import useDeskTickets from 'data/hooks/useDeskTickets';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ContractTable = (props: any) => {
    const { t } = useTranslation();
    const {openInNewTab} = useDeskTickets();
    const history = useHistory();

    /**
     * Redirection to a contract
     * @param {item} item Resource that representing a contract
     * @returns {void} Return the link to the contract
     */
    function goToContract(item: any) {
        openInNewTab(item.href, item.title, 'contract')
        history.push('/viewTab')
    }

    return (
        <>
            {props.contractData && props.contractData._links && props.contractData._links.item ? (
                <>
                    <DxcTable>
                        <tr>
                            <th>{t('_CONTRACT_NUMBER')}</th>
                            <th>{t('_CONTRACT_STATUS')}</th>
                            <th>{t('_OWNER_NAME')}</th>
                            <th>{t('_RISK_DATA')}</th>
                            <th>{t('_ACTIONS')}</th>
                        </tr>
                        {props.contractData._links.item.map((row: { [x: string]: { [x: string]: any } }, i: number) => (
                            <StyledHoverRow key={i}>
                                <td>{row['summary']['contract:number']}</td>
                                <td>
                                    {getDescriptionValue(
                                        row['summary']['contract:status'],
                                        'contract:status',
                                        props.contractData,
                                    )}
                                </td>
                                <td>
                                    {row['summary']['person:display_id']
                                        ? row['summary']['person:display_id']
                                        : row['summary']['organization:display_id']}
                                </td>
                                <td>{row['summary']['membership:display_id']}</td>
                                <td>
                                    <StyledButton aria-label="add an alarm" onClick={() => goToContract(row)}>
                                        <OpenInNewIcon />
                                    </StyledButton>
                                </td>
                                {props.showPreview &&
                                    <td>
                                        <StyledButton aria-label="add an alarm" onClick={() => props.selectContract(row.href)}>
                                            <EyeIcon />
                                        </StyledButton>
                                    </td>
                                }
                            </StyledHoverRow>
                        ))}
                    </DxcTable>
                    <Paginator
                        totalItems={props.contractData._count === '500+' ? 500 : props.contractData._count}
                        itemsPerPage={5}
                        data={props.contractData}
                        handler={props.getData}
                    />
                </>
            ) : (
                <DxcTable>
                    <tr>
                        <th>{t('_CONTRACT_NUMBER')}</th>
                        <th>{t('_OWNER_NAME')}</th>
                        <th>{t('_RISK_DATA')}</th>
                    </tr>
                    <tr>
                        <td colSpan={12}>{t('_NO_RECORDS_FOUND')}</td>
                    </tr>
                </DxcTable>
            )}
        </>
    );
};

export default ContractTable;
