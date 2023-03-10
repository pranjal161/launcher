import { CallIcon, CreditCardIcon, EmailIcon, HomeIcon, LanguageIcon, PersonIcon } from 'assets/svg';
import React, { useContext, useEffect, useState } from "react";

import AddressTab from "views/ClientView/components/AddressTab/AddressTab";
import { ApplicationContext } from "context/applicationContext";
import ClaimList from "views/ClientView/components/ClaimList/ClaimList";
import ContractRoles from "views/ClientView/components/ContractRoles/ContractRoles";
import Documents from "components/Documents/Documents";
import { DxcSidenav } from "@dxc-technology/halstack-react";
import FinancialTable from "views/ClientView/components/FinancialTable/FinancialTable";
import Label from "components/Label/Label";
import { StyledBanner } from 'styles/global-style';
import { getLink } from 'util/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'data/hooks/useAia';
import { useTranslation } from "react-i18next";

const ClientSummary = (props: any) => {
    const { t } = useTranslation();
    const { startActivity, stopActivity } = useActivity()

    const visibleSections = [
        { label: t('_CONTRACT_ROLES'), id: 'roles' },
        { label: t('_FINANCIAL'), id: 'financial' },
        { label: t('_ADDRESS'), id: 'address' },
        { label: t('_CLAIM'), id: 'claims' },
        { label: t('_DOCUMENTS'), id: 'documents' },
    ];
    const [currentSection, setCurrentSection] = useState<string>('roles');
    const [clientData, setClientData] = useState<undefined | any>();
    const applicationContext = useContext(ApplicationContext);
    const { fetch } = useAia();
    const clientUrl = props.hRef;
    const [clientDetailData, setClientDetails] = useState([]);
    const [outputDoc, setOutputDoc] = useState('');
    const [receivedDoc, setReceivedDoc] = useState('');
    useEffect(() => {
        startActivity();
        callLoadData();
        return () => {
            stopActivity()
        };
    }, [applicationContext, clientUrl, props.hRef])

    const callLoadData = () => {
        // const clientData = location.state.clientData;
        // setClientData(clientData);
        fetch(clientUrl).then((response: any) => {
            setClientData(response.data);
            if (getLink(clientData, 'cscaia:output_documents')) {
                setOutputDoc(getLink(clientData, 'cscaia:output_documents'));
            }
            if (getLink(clientData, 'cscaia:information_receipts')) {
                setReceivedDoc(getLink(clientData, 'cscaia:information_receipts'));
            }
            populateClientOtherDetails(response.data);
        });
    };

    const populateClientOtherDetails = (response: any) => {
        const clientDetails: any = [];
        const requestArray: Array<Object> = [];
        clientDetails.push({
            url: getLink(response, 'person:preferred_postal_address')
                ? getLink(response, 'person:preferred_postal_address')
                : getLink(response, 'organization:preferred_postal_address'),
            id: 'postal-address',
        });
        clientDetails.push({
            url: getLink(response, 'person:preferred_bank_account')
                ? getLink(response, 'person:preferred_bank_account')
                : getLink(response, 'organization:preferred_bank_account'),
            id: 'bank-account',
        });
        clientDetails.push({
            url: getLink(response, 'person:preferred_telecom_address')
                ? getLink(response, 'person:preferred_telecom_address')
                : getLink(response, 'organization:preferred_telecom_address'),
            id: 'telecom-address',
        });
        clientDetails.push({
            url: getLink(response, 'person:preferred_electronic_address')
                ? getLink(response, 'person:preferred_electronic_address')
                : getLink(response, 'organization:preferred_electronic_address'),
            id: 'electronic-address',
        });
        clientDetails.map((data: any) => {
            if (data.url) {
                requestArray.push(fetch(data.url));
            }
            return null;
        });
        Promise.all(requestArray).then((responseArray) => {
            responseArray.map((response: any) => {
                let index = clientDetails.findIndex((x: any) => x['url'] === response.data._links.self.href);
                clientDetails[index]['data'] = response.data;
                return null;
            });
            setClientDetails(clientDetails);
        });
    };

    const ClientBanner = () => {
        const getClientData = (id: string) => {
            const index = clientDetailData.findIndex((x: any) => x['id'] === id);
            return clientDetailData && clientDetailData[index] && clientDetailData[index]['data'];
        };

        const postalAddress = getClientData('postal-address');
        return (
            <StyledBanner>
                <div className="row">
                    <div className="col-2 align-center">
                        <PersonIcon />
                        <div className="col-12 pt-2">
                            {clientData && clientData['person:client_number'] && (
                                <Label propertyName="person:display_id1" data={clientData}></Label>
                            )}
                            {clientData && clientData['organization:client_number'] && (
                                <Label propertyName="organization:display_id1" data={clientData}></Label>
                            )}
                        </div>
                    </div>
                    <div className="col-4">
                        {clientData && clientData['person:client_number'] && (
                            <>
                                <div className="col-12 pt-1">
                                    <Label
                                        propertyName="person:client_number"
                                        label="_CLIENT_NUMBER"
                                        data={clientData}
                                    ></Label>
                                </div>
                                <div className="col-12 pt-1">
                                    <Label
                                        propertyName="person:professional_status"
                                        label="_PROF_STATUS"
                                        data={clientData}
                                    ></Label>
                                </div>
                                <div className="col-12 pt-1">
                                    <Label
                                        propertyName="person:birth_date"
                                        label="_DATE_OF_BIRTH"
                                        data={clientData}
                                    ></Label>
                                </div>
                                <div className="col-12 pt-1">
                                    <Label propertyName="person:age" label="_AGE" data={clientData}></Label>
                                </div>
                                <div className="col-12 pt-1">
                                    <Label
                                        propertyName="person:marital_status"
                                        label="_MARITAL_STATUS"
                                        data={clientData}
                                    ></Label>
                                </div>
                            </>
                        )}
                        {clientData && clientData['organization:client_number'] && (
                            <Label
                                propertyName="organization:client_number"
                                label="_CLIENT_NUMBER"
                                data={clientData}
                            ></Label>
                        )}
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <div className="col-2 icon">
                                <CallIcon />
                            </div>
                            <div className="col-10">
                                <Label
                                    propertyName="phone_address:phone_number"
                                    data={getClientData('telecom-address')}
                                ></Label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2 icon">
                                <HomeIcon />
                            </div>
                            <div className="col-10">
                                <label>{postalAddress ? postalAddress['_links']['self']['title'] : ''}</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2 icon">
                                <EmailIcon />
                            </div>
                            <div className="col-10">
                                <Label
                                    propertyName="e_mail_address:text"
                                    data={getClientData('electronic-address')}
                                ></Label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 icon">
                                <CreditCardIcon />
                            </div>
                            <div className="col-10">
                                <Label propertyName="bank_account:i_b_a_n" data={getClientData('bank-account')}></Label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 icon">
                                <LanguageIcon />
                            </div>
                            <div className="col-10">
                                <Label propertyName="person:language" data={clientData}></Label>
                                <Label propertyName="organization:language" data={clientData}></Label>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </StyledBanner>
        );
    };

    return (
        <>
            {clientDetailData && <ClientBanner />}
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
            <div className="contract-details">
                {currentSection === 'roles' && clientUrl && (
                    <div>
                        <ContractRoles clientUrl={clientUrl} />
                    </div>
                )}
                {currentSection === 'financial' && (
                    <div>
                        <FinancialTable clientUrl={clientUrl} />
                    </div>
                )}
                {currentSection === 'address' && (
                    <div>
                        <AddressTab clientData={clientData} />
                    </div>
                )}
                {currentSection === 'claims' && clientUrl && (
                    <div>
                        <ClaimList clientUrl={clientUrl} />
                    </div>
                )}
                {currentSection === 'documents' && (
                    <div>
                        <Documents outputDoc={outputDoc} receivedDoc={receivedDoc} />
                    </div>
                )}
            </div>
        </>
    );
};
export default ClientSummary;
