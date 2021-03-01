import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AppConfig } from './../../config/appConfig';
import { DxcTabs } from '@dxc-technology/halstack-react'

const ContractSummary = () => {
    const location: any = useLocation();
    const { t } = useTranslation();
    const contractUrl = location.state.contractUrl;
    const [contractData, setContractData] = useState<undefined | any>();
    const config = AppConfig;

    const getData = async (contractUrl: string) => {
        const result = await axios.get(contractUrl, { headers: config.headers });
        await setContractData(result.data);
    }

    useEffect(() => {
        getData(contractUrl);
    }, []);

    const [activeTab, setActiveTab] = useState(0);
    const onTabClick = (i: number) => {
        setActiveTab(i);
    };

    function ContractBanner() {
        return (
            <div>
                {contractData['contract:number']}
            </div>
        )
    }

    return (
        <>
            {contractData && (
                <ContractBanner />
            )}
            <div>
                <DxcTabs
                    activeTabIndex={activeTab}
                    onTabClick={onTabClick}
                    tabs={[
                        { label: t('_INVESTMENT') },
                        { label: t("_INTERESTED_PARTIES") },
                        { label: t("_RISKS") },
                        { label: t("_COVERAGES") },
                        { label: t("_CLAUSES") },
                        { label: t("_DOCUMENTS") },
                        { label: t("_FINANCIAL_OPERATIONS") },
                        { label: t("_FINANCIAL_INFORMATION") },
                        { label: t("_ACTIVITIES") },
                    ]}
                ></DxcTabs>
                {activeTab === 0 && (
                    <div> {t('_INVESTMENT')}</div>
                )}
                {activeTab === 1 && (
                    <div>{t("_INTERESTED_PARTIES")}</div>
                )}
                {activeTab === 2 && (
                    <div>{t("_RISKS")}</div>
                )}
                {activeTab === 3 && (
                    <div>{t("_COVERAGES")}</div>
                )}
                {activeTab === 4 && (
                    <div>{t("_CLAUSES")}</div>
                )}
                {activeTab === 5 && (
                    <div>{t("_DOCUMENTS")}</div>
                )}
                {activeTab === 6 && (
                    <div>{t("_FINANCIAL_OPERATIONS")}</div>
                )}
                {activeTab === 7 && (
                    <div>{t("_FINANCIAL_INFORMATION")}</div>
                )}
                {activeTab === 8 && (
                    <div>{t("_ACTIVITIES")}</div>
                )}
            </div>
        </>

    )
}

export default ContractSummary;