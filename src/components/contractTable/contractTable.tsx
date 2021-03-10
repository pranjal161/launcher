import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DxcTable, DxcPaginator } from '@dxc-technology/halstack-react';
import { ApplicationContext } from '../../context/applicationContext';
import axios from 'axios';
import { StyledHoverRow, StyledPaginator } from '../../styles/global-style';
import { getDescriptionValue, paginationLink } from '../../util/functions';

const ContractTable = (props: { contractUrl: string; }) => {

    const { t } = useTranslation();
    const history = useHistory();
    const [contractData, setContractData] = useState<any>({});
    const applicationContext = useContext(ApplicationContext);
    const [page, changePage] = useState(1);
    const itemsPerPage = 5;
    const [totalItems, changeTotalItems] = useState(0);

    const prevClick = () => {
        changePage(page - 1);
        navigatePage(page - 1);
    };
    const firstClick = () => {
        changePage(1);
        navigatePage(1);
    };
    const nextClick = () => {
        changePage(page + 1);
        navigatePage(page + 1);
    };
    const lastClick = (currPage: number) => {
        changePage(currPage);
        navigatePage(currPage);
    };

    const navigatePage = (pagenumber: number) => {
        const paginateUrl = props.contractUrl;
        const navigateTo = paginationLink(paginateUrl, pagenumber, itemsPerPage);
        getData(navigateTo ? navigateTo : '');
    };

    function goToContract(item: any) {
        const contractNumber = item.summary['contract:number'];
        history.push('/contracts/' + contractNumber, { contractUrl: item.href });
    }

    function getData(url: string) {
        axios.get(url, { headers: applicationContext.headers}).then(response => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
                const count = response && response.data && response.data._count;
                setContractData(response.data);
                changeTotalItems(count === '500+' ? 500 : count);
            }
        });
    }

    useEffect(() => {
        getData(props.contractUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.contractUrl, applicationContext]);

    return (
        <>
            {contractData && contractData._links && contractData._links.item ? (
                <>
                    <DxcTable>
                        <tr>
                            <th>{t('_CONTRACT_NUMBER')}</th>
                            <th>{t('_CONTRACT_STATUS')}</th>
                            <th>{t('_OWNER_NAME')}</th>
                            <th>{t('_RISK_DATA')}</th>
                        </tr>
                        {contractData._links.item.map((row: { [x: string]: { [x: string]: any; }; }, i: number) => (
                            <StyledHoverRow key={i} onClick={() => goToContract(row)}>
                                <td>{row['summary']['contract:number']}</td>
                                <td>{getDescriptionValue(row['summary']['contract:status'], 'contract:status', contractData)}</td>
                                <td>{row['summary']['person:display_id'] ? row['summary']['person:display_id'] : row['summary']['organization:display_id']}</td>
                                <td>{row['summary']['membership:display_id']}</td>
                            </StyledHoverRow>
                        ))}
                    </DxcTable>
                    <StyledPaginator>
                        <DxcPaginator currentPage={page}
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                            prevFunction={prevClick}
                            firstFunction={firstClick}
                            nextFunction={nextClick}
                            lastFunction={lastClick}
                        />
                    </StyledPaginator>
                </>
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