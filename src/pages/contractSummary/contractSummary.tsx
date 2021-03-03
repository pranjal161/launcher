import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AppConfig } from './../../config/appConfig';
import { DxcTabs } from '@dxc-technology/halstack-react';
import PartyRoleTable from '../../components/partyRoleTable/partyRoleTable';
import InvestmentTab from '../../components/InvestmentTab/investmentTab';
import RiskTable from '../../components/riskTable/riskTable';
import Person from '@material-ui/icons/Person';
import Label from '../../components/label/label';
import { makeStyles } from '@material-ui/core';
import { DxcSelect } from '@dxc-technology/halstack-react';


const ContractSummary = () => {
    const location: any = useLocation();
    const { t } = useTranslation();
    const contractUrl = location.state.contractUrl;
    const [contractData, setContractData] = useState<undefined | any>();
    const [partyRole, setPartyRoleData] = useState<undefined | any>();
    const [risk, setRiskData] = useState<undefined | any>();
    const config = AppConfig;
    const [mainRisk, setMainRisk] = useState<undefined | string>();
    const [action, changeAction] = useState('');
    const onActionChange = (newValue: string) => {
        changeAction(newValue);
    };

    const actionOptions = [
        {
            value: "claim",
            label: t('_DECLARE_CLAIM')
        },
        {
            value: "contract",
            label: t('_AMENDMENT')
        },
        {
            value: "unsollicitedPayment",
            label: t('_UNSOLICITED_PAYMENT')
        }
    ];

    const useStyles = makeStyles(() => ({
        banner: {
            backgroundColor: "#F7F7F7",
            padding: 20
        },
        xlIcon: {
            fontSize: 60
        },
        selectBox: {
            "& > div": {
                maxWidth: 240,
                width: '100% !important'
            }
        }
    }));
    const classes = useStyles();

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

    const OwnerName = () => {
        const ownerName = partyRole && partyRole.find((item: any) => item.summary['party_role:role_type'] === 'owner');
        return (
            <>
                {ownerName && ownerName['title'] && (
                    <label className="d-block">{ownerName['title']}</label>
                )}
            </>
        );
    };

    function ContractBanner() {
        return (
            <div className={classes.banner}>
                <div className="row">
                    <div className="col-2">
                        <Person className={classes.xlIcon} />
                        <OwnerName />
                    </div>
                    <div className="col-4">
                        <Label propertyName={'contract:number'} label={'_CONTRACT_NUMBER'} data={contractData} />

                        <Label propertyName="contract:product_label" label="_PRODUCT" data={contractData}/>

                        <Label propertyName="contract:status_motive" label="_STATUS_REASON" data={contractData} />

                        <Label propertyName="contract:start_date" label="_EFFECTIVE_DATE" data={contractData} />

                        <Label propertyName="contract:renewal_date" label="_RENEWAL_DATE" data={contractData} />
                    </div>
                    <div className="col-4">
                        <Label propertyName="contract:status" label="_CONTRACT_STATUS" data={contractData} />

                        <Label propertyName="contract:product_type" label="_PRODUCT_TYPE" data={contractData} />
                            
                        <Label propertyName="contract:currency_mode" label="_CURRENCY" data={contractData} />
                
                        <Label propertyName="duration:value" label="_CONTRACT_DURATION" data={contractData} />

                        <Label propertyName="contract:end_validity_date" label="_END_DATE" data={contractData} />
                    </div>
                    <div className="col-2">
                        <div className={classes.selectBox}>
                            <DxcSelect
                                options={actionOptions}
                                onChange={onActionChange}
                                label={t("_ACTIONS")}
                                value={action}
                            ></DxcSelect>
                        </div>
                    </div>
                </div>
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