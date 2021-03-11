import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { DxcDialog, DxcSidenav } from '@dxc-technology/halstack-react';
import PartyRoleTable from '../../components/partyRoleTable/partyRoleTable';
import InvestmentTab from '../../components/InvestmentTab/investmentTab';
import RiskTable from '../../components/riskTable/riskTable';
import { PersonIcon } from '../../assets/svg';
import Label from '../../components/label/label';
import { DxcSelect } from '@dxc-technology/halstack-react';
import FinancialOperationTable from '../../components/financialOperationTable/financialOperationTable';
import { ApplicationContext } from '../../context/applicationContext';
import { StyledBanner } from '../../styles/global-style';
import CoverageTable from '../../components/coveragesTable/coveragesTable';
import ActivitiesTable from '../../components/activitiesTable/activitiesTable';
import UnsolicitedPayment from '../../components/UnsolicitedPayment/unsolicitedPayment';
import ClausesTable from '../../components/clausesTable/clausesTable';
import Documents from '../../components/documents/documents';
import { getLink } from '../../util/functions';
import FinancialInformation from '../../components/financialInformation/financialInformation';
import './contractSummary.css';

const ContractSummary = () => {
    const location: any = useLocation();
    const { t } = useTranslation();
    const sections = [
        { label: t('_INVESTMENT'), id: 'investment' },
        { label: t("_INTERESTED_PARTIES"), id: 'parties' },
        { label: t("_RISKS"), id: 'risks' },
        { label: t("_COVERAGES"), id: 'coverages' },
        { label: t("_CLAUSES"), id: 'clauses' },
        { label: t("_DOCUMENTS"), id: 'documents' },
        { label: t("_FINANCIAL_OPERATIONS"), id: 'financial_op' },
        { label: t("_FINANCIAL_INFORMATION"), id: 'financial_info' },
        { label: t("_ACTIVITIES"), id: 'activities' },
    ];
    const [visibleSections, setSections] = useState([])
    const [currentSection, setCurrentSection] = useState<string>();
    const [contractUrl, setContractUrl] = useState(location.state.contractUrl);
    const [contractData, setContractData] = useState<undefined | any>();
    const [partyRole, setPartyRoleData] = useState<undefined | any>();
    const [risk, setRiskData] = useState<undefined | any>();
    const [mainRisk, setMainRisk] = useState<undefined | string>();
    const applicationContext = useContext(ApplicationContext);
    const [action, changeAction] = useState('');
    const [historySelect, changeHistory] = useState('');
    const [historySelectOptions, setHistoryOptions] = useState([]);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [unsolicitedPaymentRes, setunsolicitedPaymentRes] = useState<undefined | string>()
    const [outputDoc, setOutputDoc] = useState('');
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
            value: "unsolicitedPayment",
            label: t('_UNSOLICITED_PAYMENT')
        }
    ];
    const onActionChange = (newValue: string) => {
        changeAction(newValue);
        if (newValue === 'unsolicitedPayment') {
            createunsollicitedPayment();
        }
    };
    const onHistoryChange = (newValue: string) => {
        changeHistory(newValue);
        setContractUrl(newValue);
    };
    useEffect(() => {
        getData(contractUrl);
    }, [applicationContext, contractUrl]);

    const getData = async (contractUrl: string) => {
        axios.get(contractUrl, { headers: applicationContext.headers }).then(result => {
            setContractData(result.data);
            getRiskData(result.data._links);
            manageSectionVisibility(result.data);
            populateHistorySelect(result.data);
            if (result.data._links && result.data._links['contract:role_list']) {
                const partyUrl: string = result.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view';
                axios.get(partyUrl, { headers: applicationContext.headers }).then(partyRoleRes => {
                    if (partyRoleRes && partyRoleRes.data._links && partyRoleRes.data._links.item) {
                        setPartyRoleData(partyRoleRes.data._links.item);
                    }
                });
            }
            if (getLink(result.data, 'cscaia:output_documents')) {
                setOutputDoc(getLink(result.data, 'cscaia:output_documents'));
            }
        });
    }
    const populateHistorySelect = (contractResponse: any) => {
        let stateUrl;
        if (contractResponse && contractResponse['_links'] && contractResponse['_links']['cscaia:states']) {
            stateUrl = contractResponse._links['cscaia:states'].href;
        } else if (contractUrl.indexOf('/states') >= 0) {
            stateUrl = contractUrl.substring(0, contractUrl.lastIndexOf("/"));
        }
        if (stateUrl) {
            axios.get(stateUrl, { headers: applicationContext.headers }).then((res: any) => {
                const response: any = res && res['data'];
                if (response && response['_links'] && response['_links']['item']) {
                    const items = Array.isArray(response['_links']['item']) ? response['_links']['item'] : [response['_links']['item']];
                    const historyOptions: any = [];
                    const version = t('_STATE_VERSION');
                    const fromLabel = t('_FROM_VERSION');
                    const toLabel = t('_TO_VERSION');
                    items.forEach(element => {
                        const label = `${version} ${element.summary['state_number']}${fromLabel}${element.summary['start_date']}${toLabel}${element.summary['end_date']}`;
                        const value = element.href;
                        const data = {
                            value: value,
                            label: label
                        };
                        historyOptions.push(data);
                    });
                    setHistoryOptions(historyOptions);
                }
            });
        }
    }
    const getRiskData = (data: { [x: string]: any; }) => {
        if (data && data['contract:membership_list']) {
            const risks: string = data['contract:membership_list'].href;
            axios.get(risks, { headers: applicationContext.headers }).then(riskResponse => {
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

    const OwnerName = () => {
        const ownerPartyRole = partyRole && Array.isArray(partyRole) ? partyRole : typeof partyRole !== "undefined" ? [partyRole] : '';
        const ownerName = ownerPartyRole && ownerPartyRole.length > 0 && ownerPartyRole.find((item: any) => item.summary['party_role:role_type'] === 'owner');
        return (
            <>
                {ownerName && ownerName['title'] && (
                    <label className="d-block">{ownerName['title']}</label>
                )}
            </>
        );
    };
    const onClickDialog = () => {
        setDialogVisible(false);
    }
    const createunsollicitedPayment = () => {
        const operationUrl = contractUrl + '/operations';
        axios.get(operationUrl, { headers: applicationContext.headers }).then((operationRes) => {
            if (operationRes && operationRes.data._links && operationRes.data._links['item']) {
                const operationItem = operationRes.data._links['item'];
                const payment = operationItem.find((item: { name: string; }) => item.name === 'unsolicited_payment');
                if (payment && payment.href) {
                    axios.post(payment.href, {}, { headers: applicationContext.headers }).then((res) => {
                        if (res && res.data) {
                            setunsolicitedPaymentRes(res.data)
                            setDialogVisible(true);
                        }
                    })
                }
            }
        })
    }
    const manageSectionVisibility = (contract: { [x: string]: any; }) => {
        let newSections: any;
        const productType = contract['contract:product_type'];
        if (productType === 'multi_risk') {
            newSections = sections.filter(item => { return (item.id !== 'investment' && item.id !== 'coverages') })
        } else if (productType !== 'savings') {
            newSections = sections.filter(item => { return (item.id !== 'investment' && item.id !== 'risks') })
        } else if (productType === 'savings') {
            newSections = sections.filter(item => { return item.id !== 'risks' })
        }
        setSections(newSections);
        setCurrentSection(newSections[0].id)
    }

    function ContractBanner() {
        return (
            <StyledBanner>
                <div className="row">
                    <div className="col-2 align-center">
                        <PersonIcon />
                        <OwnerName />
                    </div>
                    <div className="col-4">
                        <Label propertyName="contract:number" label="_CONTRACT_NUMBER" data={contractData} />
                        <Label propertyName="contract:product_label" label="_PRODUCT" data={contractData} />
                        <Label propertyName="contract:status_motive" label="_STATUS_REASON" data={contractData} />
                        <Label propertyName="contract:start_date" label="_EFFECTIVE_DATE" data={contractData} type="date" />
                        <Label propertyName="contract:renewal_date" label="_RENEWAL_DATE" data={contractData} type="date" />
                    </div>
                    <div className="col-4">
                        <Label propertyName="contract:status" label="_CONTRACT_STATUS" data={contractData} />
                        <Label propertyName="contract:product_type" label="_PRODUCT_TYPE" data={contractData} />
                        <Label propertyName="contract:currency_code" label="_CURRENCY" data={contractData} />
                        <Label propertyName="duration:value" label="_CONTRACT_DURATION" data={contractData} />
                        <Label propertyName="contract:end_validity_date" label="_END_DATE" data={contractData} type="date" />
                    </div>
                    <div className="col-2">
                        <div className="select-box">
                            <DxcSelect
                                options={actionOptions}
                                onChange={onActionChange}
                                label={t("_ACTIONS")}
                                value={action}
                            ></DxcSelect>
                        </div>
                        <div className="select-box">
                            <DxcSelect
                                options={historySelectOptions}
                                onChange={onHistoryChange}
                                label={t("_HISTORY")}
                                value={historySelect}
                            ></DxcSelect>
                        </div>
                    </div>
                </div>
            </StyledBanner>
        )
    }
    return (
        <>
            {contractData && visibleSections.length > 0 && (
                <>
                    <ContractBanner />
                    <div className="contract-sidenav">
                        <DxcSidenav>
                            {visibleSections.map((item) => (
                                <p className={item['id'] === currentSection ? 'selectedSection' : 'section'} onClick={() => setCurrentSection(item['id'])}>{item['label']}</p>
                            ))}
                        </DxcSidenav>
                    </div>
                </>
            )}
            <div className="contract-details">
                {currentSection === 'investment' && mainRisk && (
                    <div>
                        <InvestmentTab mainRiskUrl={mainRisk} />
                    </div>
                )}
                {currentSection === 'parties' && (
                    <div>
                        <PartyRoleTable roles={partyRole} />
                    </div>
                )}
                {currentSection === 'risks' && (
                    <div>
                        <RiskTable risks={risk} />
                    </div>
                )}
                {(currentSection === 'coverages' && mainRisk) && (
                    <div>
                        <CoverageTable mainRiskUrl={mainRisk} />
                    </div>
                )}
                {currentSection === 'clauses' && (
                    <div>
                        <ClausesTable contractResponse={contractData} />
                    </div>
                )}
                {currentSection === 'documents' && (
                    <div>
                        <Documents outputDoc={outputDoc} />
                    </div>
                )}
                {currentSection === 'financial_op' && (
                    <div>
                        <FinancialOperationTable contractResponse={contractData} />
                    </div>
                )}
                {currentSection === 'financial_info' && (
                    <div>
                        <FinancialInformation contractResponse={contractData} />
                    </div>
                )}
                {currentSection === 'activities' && (
                    <div>
                        <ActivitiesTable contractResponse={contractData} />
                    </div>
                )}
            </div>
            {isDialogVisible && unsolicitedPaymentRes && (
                <DxcDialog onCloseClick={onClickDialog} padding="medium">
                    <UnsolicitedPayment onClickDialog={onClickDialog} response={unsolicitedPaymentRes} />
                </DxcDialog>
            )}
        </>
    )
}
export default ContractSummary;