import React, { useContext, useEffect, useState } from 'react';
import ContractTable from '../../components/contractTable/contractTable';
import { AppConfig } from '../../config/appConfig';
import { DxcInput, DxcButton } from "@dxc-technology/halstack-react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { ApplicationContext } from '../../context/applicationContext';

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
    }

    useEffect(() => {
        getData(url);
    }, [url, applicationContext])

    const getData = (url: string) => {
        axios.get(url, { headers: applicationContext.headers }).then(response => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
            }
            const count = response && response.data && response.data._count;
            setContractData(response.data);
            // changeTotalItems(count === '500+' ? 500 : count);

        });
    }

    const searchContract = () => {
        const searchURL = AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=5';
        setURL(searchURL);
    }

    const resetTable = () => {
        setURL(initialURL);
        setContractNumber('');
    }

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
                <DxcButton
                    mode="primary"
                    label={t('_RESET')}
                    onClick={resetTable}
                    margin="medium"
                    size="large"
                />
            </div>
            <div className="p-2">
                <ContractTable contractData={contractData} getData={(href: string) => getData(href)} />
            </div>
        </>
    );


}

export default ContractSearch;
