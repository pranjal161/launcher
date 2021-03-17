import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import { StyledHoverRow } from '../../styles/global-style';
import { getDescriptionValue } from '../../util/functions';
import Paginator from '../paginator/paginator';

const ContractTable = (props: { contractData: any; getData: (href:string) => void}) => {

    const { t } = useTranslation();
    const history = useHistory();

        function goToContract(item: any) {
            const contractNumber = item.summary['contract:number'];
            history.push('/contracts/' + contractNumber, { contractUrl: item.href });
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
                        {props.contractData._links.item.map((row: { [x: string]: { [x: string]: any; }; }, i: number) => (
                            <StyledHoverRow key={i} onClick={() => goToContract(row)}>
                                <td>{row['summary']['contract:number']}</td>
                                <td>{getDescriptionValue(row['summary']['contract:status'], 'contract:status', props.contractData)}</td>
                                <td>{row['summary']['person:display_id'] ? row['summary']['person:display_id'] : row['summary']['organization:display_id']}</td>
                                <td>{row['summary']['membership:display_id']}</td>
                            </StyledHoverRow>
                        ))}
                    </DxcTable>
                    <Paginator totalItems={props.contractData._count === '500+' ? 500 : props.contractData._count} itemsPerPage={5} data={props.contractData} handler={props.getData} />
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
            )
            }
        </>
    );

}

export default ContractTable;