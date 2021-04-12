import { DxcAlert, DxcButton, DxcInput } from "@dxc-technology/halstack-react";
import React, { useContext, useEffect, useState } from 'react';

import { AppConfig } from 'config/appConfig';
import { ApplicationContext } from 'context/applicationContext';
import ContractTable from 'components/ContractTable/ContractTable';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ContractSearch = () => {
    const { t } = useTranslation();
    const initialURL = AppConfig.hostUrl.defaultHostUrl + 'contracts?_num=5';
    const [url, setURL] = useState(initialURL);
    const [contractNumber, setContractNumber] = useState('');
    const [contractData, setContractData] = useState({});
    const applicationContext = useContext(ApplicationContext);
    // const [totalItems, changeTotalItems] = useState(0);

    const onContractNumberChange = (updatedValue: string) => {
        setContractNumber(updatedValue.toUpperCase());
    };

    useEffect(() => {
        getData(url);
    }, [url, applicationContext]);

    const getData = (url: string) => {
        axios.get(url, { headers: applicationContext.headers }).then((response) => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
            }
            //const count = response && response.data && response.data._count;
            setContractData(response.data);
            // changeTotalItems(count === '500+' ? 500 : count);
        });
    };

    const searchContract = () => {
        const searchURL = AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=5';
        setURL(searchURL);
    };

    const resetTable = () => {
        setURL(initialURL);
        setContractNumber('');
    };

    return (
        <>
            <div className="align-center">
                <DxcInput
                    label={t('_CONTRACT')}
                    value={contractNumber}
                    onChange={onContractNumberChange}
                    margin="medium"
                />
                <div className="d-flex justify-content-center"></div>
                <DxcButton
                    mode="primary"
                    label={t('_CONTRACT_SEARCH')}
                    onClick={searchContract}
                    margin="medium"
                    size="large"
                />
                <DxcButton mode="primary" label={t('_RESET')} onClick={resetTable} margin="medium" size="large" />
            </div>
            <div className="align-center">
                <DxcAlert
                    type="info"
                    mode="inline"
                    inlineText={t('_PAGINATOR_WARNING')}
                    margin="xxsmall"
                />
            </div>
            <div className="p-2">
                <ContractTable contractData={contractData} getData={(href: string) => getData(href)} />
            </div>
        </>
    );
}

export default ContractSearch;
