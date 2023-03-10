import React, { useContext, useEffect, useState } from "react";

import { AppConfig } from "config/appConfig";
import { ApplicationContext } from "context/applicationContext";
import ContractTable from "components/ContractTable/ContractTable";
import {DxcHeading} from '@dxc-technology/halstack-react';
import Table from "components/Table/Table";
import useAia from "data/hooks/useAia";
import { useTranslation } from "react-i18next";

const ContractRoles = (props: { clientUrl: string }) => {
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [contractUrl, setContractUrl] = useState('');
    const [offerUrl, setOfferUrl] = useState('');
    const [quoteUrl, setQuoteUrl] = useState('');
    const [propositionUrl, setPropositionUrl] = useState('');
    const [contractData, setContractData] = useState({});
    const { fetch } = useAia();
    const offerListColumns = [
        { label: '_OFFER_IDENTIFIER', property: 'contract:offer_number' },
        { label: '_PRODUCT_IDENTIFIER', property: 'contract:product_identifier' },
        { label: '_OWNER_NAME', property: ['organization:display_id', 'person:first_name', 'person:last_name'] },
        { label: '_RISK_DATA', property: 'membership:display_id' },
        { label: '_START_DATE', property: 'contract:start_date', type: 'date' },
        { label: '_OFFER_STATUS', property: 'contract:proposition_status' },
    ];
    const quoteListColumns = [
        { label: '_QUOTE_IDENTIFIER', property: 'quote:identifier' },
        { label: '_PRODUCT_IDENTIFIER', property: 'quote:product_id' },
        { label: '_OWNER_NAME', property: 'quote_owner:name' },
        { label: '_RISK_DATA', property: 'quote_risk:display_id' },
        { label: '_START_DATE', property: 'quote:contract_start_date', type: 'date' },
        { label: '_STATUS', property: 'quote:status' },
    ];

    const propositionListColumns = [
        { label: '_PROPOSITION_IDENTIFIER', property: 'contract:proposition_number' },
        { label: '_PRODUCT_IDENTIFIER', property: 'contract:product_identifier' },
        { label: '_OWNER_NAME', property: ['organization:display_id', 'person:first_name', 'person:last_name'] },
        { label: '_RISK_DATA', property: 'membership:display_id' },
        { label: '_START_DATE', property: 'contract:start_date', type: 'date' },
        { label: '_OFFER_STATUS', property: 'contract:proposition_status' },
    ];

    useEffect(() => {
        if (props.clientUrl && props.clientUrl.includes('persons')) {
            let contract =
                AppConfig.hostUrl.defaultHostUrl +
                'contracts?_num=5&_mode=individual_contract&_inquiry=cs_contract_owner_contract_list&party_role:person=' +
                props.clientUrl;
            setContractUrl(contract);
            fetchContractData(contract);
            let offer =
                AppConfig.hostUrl.defaultHostUrl +
                'offers?_num=5&_inquiry=cs_contract_owner_offer_list&contract:offer_type=new_business&party_role:person=' +
                props.clientUrl;
            setOfferUrl(offer);
            let proposition =
                AppConfig.hostUrl.defaultHostUrl +
                'offers?_num=5&_inquiry=cs_contract_owner_proposition_list&party_role:person=' +
                props.clientUrl;
            setPropositionUrl(proposition);
            let quote =
                AppConfig.hostUrl.defaultHostUrl +
                'quotes?_num=5&_inquiry=cs_quote_owner_quote_list&quote_owner:person_link=' +
                props.clientUrl;
            setQuoteUrl(quote);
        } else if (props.clientUrl && props.clientUrl.includes('organizations')) {
            let contract =
                AppConfig.hostUrl.defaultHostUrl +
                'contracts?_mode=individual_contract&_inquiry=cs_contract_owner_contract_list&party_role:organization=' +
                props.clientUrl;
            setContractUrl(contract);
            fetchContractData(contract);
            let offer =
                AppConfig.hostUrl.defaultHostUrl +
                'offers?_inquiry=cs_contract_owner_offer_list&contract:offer_type=new_business&party_role:organization=' +
                props.clientUrl;
            setOfferUrl(offer);
            let proposition =
                AppConfig.hostUrl.defaultHostUrl +
                'offers?_inquiry=cs_contract_owner_proposition_list&party_role:organization=' +
                props.clientUrl;
            setPropositionUrl(proposition);
            let quote =
                AppConfig.hostUrl.defaultHostUrl +
                'quotes?_inquiry=cs_quote_owner_quote_list&quote_owner:organization_link=' +
                props.clientUrl;
            setQuoteUrl(quote);
        }
    }, [applicationContext, props.clientUrl]);

    const fetchContractData = (contractHref: string) => {
        fetch(contractHref).then((response:any) => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
            }
            //const count = response && response.data && response.data._count;
            setContractData(response.data);
        });
    };

    return (
        <>
            {contractUrl && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_CONTRACT_LIST')} />
                    <ContractTable contractData={contractData} getData={(href: string) => fetchContractData(href)} />
                </>
            )}
            {offerUrl && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_OFFERS')} />
                    <Table url={offerUrl} columnId={offerListColumns} showPaginator={true} />
                </>
            )}
            {propositionUrl && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_PROPOSITION')} />
                    <Table url={propositionUrl} columnId={propositionListColumns} showPaginator={true} />
                </>
            )}
            {quoteUrl && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_QUOTES')} />
                    <Table url={quoteUrl} columnId={quoteListColumns} showPaginator={true} />
                </>
            )}
        </>
    );
};
export default ContractRoles;
