import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import { ApplicationContext } from '../../context/applicationContext';
import axios from 'axios';
import styled from 'styled-components';

const ContractTable = (props: { contractUrl: string; }) => {

    const { t } = useTranslation();
    const history = useHistory();
    const [contractData, setContractData] = useState([]);
    const applicationContext = useContext(ApplicationContext);

    //Stylesheet
    const StyledHoverRow = styled.tr`
        &:hover {
            background-color: #F7F7F7;
            cursor: pointer;
        }
    `;


    function goToContract(item: any) {
        const contractNumber = item.summary['contract:number'];
        history.push('/contracts/' + contractNumber, { contractUrl: item.href });
    }
    function getData() {
        axios.get(props.contractUrl, { headers: applicationContext.headers}).then(response => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
                setContractData(response.data['_links']['item'])
            } else {
                setContractData([]);
            }
        });
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.contractUrl, applicationContext]);

    return (
        <>
            { contractData.length > 0 ? (
                <DxcTable>
                    <tr>
                        <th>{t('_CONTRACT_NUMBER')}</th>
                        <th>{t('_OWNER_NAME')}</th>
                        <th>{t('_RISK_DATA')}</th>
                    </tr>
                    {contractData.map((row) => (
                        <StyledHoverRow key={row['href']} onClick={() => goToContract(row)}>
                            <td>{row['summary']['contract:number']}</td>
                            <td>{row['summary']['person:display_id']}</td>
                            <td>{row['summary']['membership:display_id']}</td>
                        </StyledHoverRow>
                    ))}
                </DxcTable>
            ) : (
                    <DxcTable>
                        <tr>
                            <th>{t('_CONTRACT_NUMBER')}</th>
                            <th>{t('_OWNER_NAME')}</th>
                            <th>{t('_RISK_DATA')}</th>
                        </tr>
                        <tr>
                            <td colSpan={3}>{t('_NO_RECORDS_FOUND')}</td>
                        </tr>
                    </DxcTable>
                )
            }
        </>
    );

}

export default ContractTable;