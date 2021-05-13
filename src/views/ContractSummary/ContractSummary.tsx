import './ContractSummary.css';

import { DxcDialog, DxcSidenav } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';

import ActivitiesTable from 'views/ContractSummary/components/ActivitiesTable/ActivitiesTable';
import { ApplicationContext } from 'context/applicationContext';
import Banner from './components/ContractBanner/Banner';
import ClausesTable from 'views/ContractSummary/components/ClausesTable/ClausesTable';
import CoverageTable from 'views/ContractSummary/components/CoveragesTable/CoveragesTable';
import Documents from 'components/Documents/Documents';
import FinancialInformation from 'views/ContractSummary/components/FinancialInformation/FinancialInformation';
import FinancialOperationTable from 'views/ContractSummary/components/FinancialOperationTable/FinancialOperationTable';
import InvestmentTab from 'views/ContractSummary/components/InvestmentTab/InvestmentTab';
import PartyRoleTable from 'views/ContractSummary/components/PartyRoleTable/PartyRoleTable';
import RiskTable from 'views/ContractSummary/components/RiskTable/RiskTable';
import UnsolicitedPayment from 'views/ContractSummary/components/UnsolicitedPayment/UnsolicitedPayment';
import { getLink } from 'util/functions';
import useActivity from "hooks/useActivity";
import useAia from 'data/hooks/useAia';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line valid-jsdoc
/**
 * Retrieve information and return the summary of a contract
 * @returns {*} Display the summary of a contract
 */
const ContractSummary = (props: { hRef: any }) => {
    const { startActivity } = useActivity()

    const { t } = useTranslation();
    const sections = [
        { label: t('_INVESTMENT'), id: 'investment' },
        { label: t('_INTERESTED_PARTIES'), id: 'parties' },
        { label: t('_RISKS'), id: 'risks' },
        { label: t('_COVERAGES'), id: 'coverages' },
        { label: t('_CLAUSES'), id: 'clauses' },
        { label: t('_DOCUMENTS'), id: 'documents' },
        { label: t('_FINANCIAL_OPERATIONS'), id: 'financial_op' },
        { label: t('_FINANCIAL_INFORMATION'), id: 'financial_info' },
        { label: t('_ACTIVITIES'), id: 'activities' },
    ];
    const [visibleSections, setSections] = useState([]);
    const [currentSection, setCurrentSection] = useState<string>();
    const [contractUrl, setContractUrl] = useState(props.hRef);
    const [contractData, setContractData] = useState<undefined | any>();
    const [partyRole, setPartyRoleData] = useState<undefined | any>();
    const [risk, setRiskData] = useState<undefined | any>();
    const [mainRisk, setMainRisk] = useState<undefined | string>();
    const applicationContext = useContext(ApplicationContext);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const [unsolicitedPaymentUrl, setunsolicitedPaymentUrl] = useState<undefined | string>();
    const [outputDoc, setOutputDoc] = useState('');
    const [receivedDoc, setReceivedDoc] = useState('');
    const [stateUrl, setStateUrl] = useState<undefined | string>();
    const { fetch } = useAia();
    const onActionChange = (newValue: string) => {
        if (newValue === 'unsolicitedPayment') {
            createunsollicitedPayment();
        }
    };

    const onHistoryChange = (newValue: string) => {
        setContractUrl(newValue);
    }

    useEffect(() => {
        startActivity();
        getData(props.hRef);
    }, [applicationContext, contractUrl]);

    const getData = (contractUrl: string) => {
        fetch(contractUrl).then((result: any) => {
            setContractData(result.data);
            getRiskData(result.data._links);
            manageSectionVisibility(result.data);
            if (result.data._links && result.data._links['contract:role_list']) {
                const partyUrl: string =
                    result.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view';
                fetch(partyUrl).then((partyRoleRes: any) => {
                    if (partyRoleRes && partyRoleRes.data._links && partyRoleRes.data._links.item) {
                        setPartyRoleData(partyRoleRes.data._links.item);
                        if (getLink(result.data, 'cscaia:states')) {
                            setStateUrl(getLink(result.data, 'cscaia:states'))
                        } else if (contractUrl.indexOf('/states') >= 0) {
                            const stateUrl: string = contractUrl.substring(0, contractUrl.lastIndexOf('/'));
                            setStateUrl(stateUrl);
                        }
                    }
                });
            }

            if (getLink(result.data, 'cscaia:output_documents')) {
                setOutputDoc(getLink(result.data, 'cscaia:output_documents'));
            }
            if (getLink(result.data, 'cscaia:information_receipts')) {
                setReceivedDoc(getLink(result.data, 'cscaia:information_receipts'));
            }
        });
    };


    const getRiskData = (data: { [x: string]: any }) => {
        if (data && data['contract:membership_list']) {
            const risks: string = data['contract:membership_list'].href;
            fetch(risks).then((riskResponse: any) => {
                if (riskResponse && riskResponse.data && riskResponse.data._links && riskResponse.data._links.item) {
                    if (!Array.isArray(riskResponse.data._links.item)) {
                        riskResponse.data._links.item = [riskResponse.data._links.item];
                    }

                    setRiskData(riskResponse.data._links.item);
                    const mainRiskItem = riskResponse.data._links.item.find(
                        (item: { summary: { [x: string]: any } }) => {
                            if (item.summary['membership:main']) {
                                return item;
                            }
                            else
                                return null;
                        },
                    );
                    if (mainRiskItem && mainRiskItem.href) {
                        setMainRisk(mainRiskItem.href);
                    }
                }
            });
        }
    };
    const OwnerName = () => {
        const ownerPartyRole =
            partyRole && Array.isArray(partyRole) ? partyRole : typeof partyRole !== 'undefined' ? [partyRole] : '';
        const ownerName =
            ownerPartyRole &&
            ownerPartyRole.length > 0 &&
            ownerPartyRole.find((item: any) => item.summary['party_role:role_type'] === 'owner');
        return <>{ownerName && ownerName['title'] && <label className="d-block">{ownerName['title']}</label>}</>;
    };

    const onClickDialog = () => {
        setDialogVisible(false);
    };

    const createunsollicitedPayment = () => {
        const operationUrl = contractUrl + '/operations';
        fetch(operationUrl).then((operationRes: any) => {
            if (operationRes && operationRes.data._links && operationRes.data._links['item']) {
                const operationItem = operationRes.data._links['item'];
                const payment = operationItem.find((item: { name: string }) => item.name === 'unsolicited_payment');
                if (payment && payment.href) {
                    setunsolicitedPaymentUrl(payment.href);
                    setDialogVisible(true);
                }
            }
        });
    };

    const manageSectionVisibility = (contract: { [x: string]: any }) => {
        let newSections: any;
        const productType = contract['contract:product_type'];
        if (productType === 'multi_risk') {
            newSections = sections.filter((item) => item.id !== 'investment' && item.id !== 'coverages');
        }
        else if (productType !== 'savings') {
            newSections = sections.filter((item) => item.id !== 'investment' && item.id !== 'risks');
        }
        else if (productType === 'savings') {
            newSections = sections.filter((item) => item.id !== 'risks');
        }
        setSections(newSections);
        setCurrentSection(newSections[0].id);
    };

    return (
        <>
            {contractData && visibleSections.length > 0 && (
                <>
                    {
                        <Banner owner={<OwnerName />} contractData={contractData} stateUrl={stateUrl}
                            onActionChange={onActionChange} onHistoryChange={onHistoryChange} />
                    }
                    <div className="contract-sidenav">
                        <DxcSidenav>
                            {visibleSections.map((item, index) => (
                                <p
                                    key={index}
                                    className={item['id'] === currentSection ? 'selectedSection' : 'section'}
                                    onClick={() => setCurrentSection(item['id'])}
                                >
                                    {item['label']}
                                </p>
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
                {currentSection === 'coverages' && mainRisk && (
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
                        <Documents outputDoc={outputDoc} receivedDoc={receivedDoc} />
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
            {isDialogVisible && unsolicitedPaymentUrl && (
                <DxcDialog onCloseClick={onClickDialog} padding="medium">
                    <UnsolicitedPayment onClickDialog={onClickDialog} url={unsolicitedPaymentUrl} />
                </DxcDialog>
            )}
        </>
    );
};
export default ContractSummary;
