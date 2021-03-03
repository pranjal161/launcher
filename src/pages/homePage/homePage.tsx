import React, { useState } from 'react';
import ContractTable from '../../components/contractTable/contractTable';
import { AppConfig } from '../../config/appConfig';
import { DxcInput, DxcButton } from "@dxc-technology/halstack-react";
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    const initialURL = AppConfig.hostUrl.defaultHostUrl + 'contracts?_num=5';
    const [url, setURL] = useState(initialURL);
    const [contractNumber, setContractNumber] = useState('');
    const onContractNumberChange = (updatedValue: string) => {
        setContractNumber(updatedValue.toUpperCase());
    }

    const searchContract = () => {
        const searchURL = AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber;
        setURL(searchURL);
    }

    const resetTable = () => {
        setURL(initialURL);
        setContractNumber('');
    }

    return (
        <>
            {/* <DxcAccordion
                label={t('_CONTRACT_SEARCH')}
                margin="medium"
                padding="medium"> */}
            <div>
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
            {/* </DxcAccordion> */}
            <ContractTable contractUrl={url} />
        </>
    );

}

export default HomePage;