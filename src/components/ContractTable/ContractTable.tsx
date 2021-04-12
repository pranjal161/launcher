import {DxcTable} from '@dxc-technology/halstack-react';
import Paginator from 'components/Paginator/Paginator';
import React from 'react';
import {StyledHoverRow} from 'styles/global-style';
import {getDescriptionValue} from 'util/functions';
import useAia from "data/hooks/useAia";
import {useHistory} from 'react-router-dom';
import {useTranslation} from "react-i18next";

/**
 * Display contract information in a table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a table
 */
const ContractTable = (props: { contractData: any; getData: (href: string) => void }) => {
    const {t} = useTranslation();
    const history = useHistory();
    const {fetch} = useAia()

    /**
     * Redirection to a contract
     * @param {item} item Resource that representing a contract
     * @returns {void} Return the link to the contract
     */
    function goToContract(item: any) {
        const contractNumber = item.summary['contract:number'];

        fetch(item.href, 'get')

        history.push('/contracts/' + contractNumber, {contractUrl: item.href});
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
                        </tr>
                        {props.contractData._links.item.map((row: { [x: string]: { [x: string]: any } }, i: number) => (
                            <StyledHoverRow key={i} onClick={() => goToContract(row)}>
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
