import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AppConfig } from './../../config/appConfig';
import { DxcTabs } from '@dxc-technology/halstack-react';
import PartyRoleTable from '../../components/partyRoleTable/partyRoleTable';
import InvestmentTab from '../../components/InvestmentTab/investmentTab';
import RiskTable from '../../components/riskTable/riskTable';

const ContractSummary = () => {
    const location: any = useLocation();
    const { t } = useTranslation();
    const contractUrl = location.state.contractUrl;
    const [contractData, setContractData] = useState<undefined | any>();
    const [partyRole, setPartyRoleData] = useState<undefined | any>();
    const [risk, setRiskData] = useState<undefined | any>();
    const config = AppConfig;
    const [mainRisk, setMainRisk] = useState<undefined | string>();

    const getData = async (contractUrl: string) => {
        axios.get(contractUrl, { headers: config.headers }).then(result => {
            setContractData(result.data);
            getRiskData(result.data._links);
            if (result.data._links && result.data._links['contract:role_list']) {
                const partyUrl: string = result.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view';
                axios.get(partyUrl, { headers: config.headers }).then(partyRoleRes => {
                    if (partyRoleRes && partyRoleRes.data._links && partyRoleRes.data._links.item) {
                        setPartyRoleData(partyRoleRes.data._links.item);
                    }
                });
            }
        });
    }

    const getRiskData = (data: { [x: string]: any; }) => {
        if (data && data['contract:membership_list']) {
            const risks: string = data['contract:membership_list'].href;
            axios.get(risks, { headers: config.headers }).then(riskResponse => {
                if (riskResponse && riskResponse.data && riskResponse.data._links && riskResponse.data._links.item) {
                    if (!Array.isArray(riskResponse.data._links.item)) {
                        riskResponse.data._links.item = [riskResponse.data._links.item];
                    }
                    setRiskData(riskResponse.data._links.item);
                    const mainRiskItem = riskResponse.data._links.item.find((item: { summary: { [x: string]: any; }; }) => {
                        if (item.summary['membership:main']) {
                            return item;
                        }
                    })
                    if (mainRiskItem && mainRiskItem.href) {
                        setMainRisk(mainRiskItem.href)
                    }
                }
            });
        }
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
                {(activeTab === 0 && mainRisk) && (
                    <div>
                        <InvestmentTab mainRiskUrl={mainRisk} />
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        <PartyRoleTable roles={partyRole} />
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        <h1>Risks</h1>
                        <RiskTable risks={risk} />
                        </div>
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