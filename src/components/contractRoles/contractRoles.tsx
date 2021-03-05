import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppConfig } from "../../config/appConfig";
import { ApplicationContext } from "../../context/applicationContext";
import ContractTable from "../contractTable/contractTable";
import Table from "../../components/table/table";

const ContractRoles = (props: { clientUrl: string }) => {
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [contractUrl, setContractUrl] = useState('');
    const [offerUrl, setOfferUrl] = useState('');
    const [quoteUrl, setQuoteUrl] = useState('');
    const [propositionUrl, setPropositionUrl] = useState('');
    const offerListColumns = [
        { label: '_OFFER_IDENTIFIER', property: 'contract:offer_number' },
        { label: '_PRODUCT_IDENTIFIER', property: 'contract:product_identifier' },
        { label: '_OWNER_NAME', property: ['organization:display_id', 'person:first_name', 'person:last_name'] },
        { label: '_RISK_DATA', property: 'membership:display_id' },
        { label: '_START_DATE', property: 'contract:start_date' },
        { label: '_OFFER_STATUS', property: 'contract:proposition_status' }
    ];
    const quoteListColumns = [
        { label: '_QUOTE_IDENTIFIER', property: 'quote:identifier' },
        { label: '_PRODUCT_IDENTIFIER', property: 'quote:product_id' },
        { label: '_OWNER_NAME', property: 'quote_owner:name' },
        { label: '_RISK_DATA', property: 'quote_risk:display_id' },
        { label: '_START_DATE', property: 'quote:contract_start_date' },
        { label: '_STATUS', property: 'quote:status' }
    ];

    const propositionListColumns = [
        { label: '_PROPOSITION_IDENTIFIER', property: 'contract:proposition_number' },
        { label: '_PRODUCT_IDENTIFIER', property: 'contract:product_identifier' },
        { label: '_OWNER_NAME', property: ['organization:display_id', 'person:first_name', 'person:last_name'] },
        { label: '_RISK_DATA', property: 'membership:display_id' },
        { label: '_START_DATE', property: 'contract:start_date' },
        { label: '_OFFER_STATUS', property: 'contract:proposition_status' }

    ];


    useEffect(() => {
        if (props.clientUrl && props.clientUrl.includes('persons')) {
            let contract = AppConfig.hostUrl.defaultHostUrl + 'contracts?_mode=individual_contract&_inquiry=cs_contract_owner_contract_list&party_role:person=' + props.clientUrl;
            setContractUrl(contract);
            let offer = AppConfig.hostUrl.defaultHostUrl + 'offers?_inquiry=cs_contract_owner_offer_list&contract:offer_type=new_business&party_role:person=' + props.clientUrl;
            setOfferUrl(offer);
            let proposition = AppConfig.hostUrl.defaultHostUrl + 'offers?_inquiry=cs_contract_owner_proposition_list&party_role:person=' + props.clientUrl;
            setPropositionUrl(proposition);
            let quote = AppConfig.hostUrl.defaultHostUrl + 'quotes?_inquiry=cs_quote_owner_quote_list&quote_owner:person_link=' + props.clientUrl;
            setQuoteUrl(quote);
        } else if (props.clientUrl && props.clientUrl.includes('organizations')) {
            let contract = AppConfig.hostUrl.defaultHostUrl + 'contracts?_mode=individual_contract&_inquiry=cs_contract_owner_contract_list&party_role:organization=' + props.clientUrl;
            setContractUrl(contract);
            let offer = AppConfig.hostUrl.defaultHostUrl + 'offers?_inquiry=cs_contract_owner_offer_list&contract:offer_type=new_business&party_role:organization=' + props.clientUrl;
            setOfferUrl(offer);
            let proposition = AppConfig.hostUrl.defaultHostUrl + 'offers?_inquiry=cs_contract_owner_proposition_list&party_role:organization=' + props.clientUrl;
            setPropositionUrl(proposition);
            let quote = AppConfig.hostUrl.defaultHostUrl + 'quotes?_inquiry=cs_quote_owner_quote_list&quote_owner:organization_link=' + props.clientUrl;
            setQuoteUrl(quote);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationContext, props.clientUrl]);

    return (
        <> {contractUrl && (
            <>
                <h4> {t("_CONTRACT_LIST")}</h4>
                < ContractTable contractUrl={contractUrl} />
            </>)
        }
            { offerUrl && (
                <>
                    <h4> {t('_OFFERS')}</h4>
                    < Table url={offerUrl} columnId={offerListColumns} />
                </>
            )
            }
            { propositionUrl && (
                <>
                    <h4>{t('_PROPOSITION')}</h4>
                    < Table url={propositionUrl} columnId={propositionListColumns} />
                </>
            )
            }
            { quoteUrl && (
                <>
                    <h4>{t('_QUOTES')}</h4>
                    < Table url={quoteUrl} columnId={quoteListColumns} />
                </>
            )
            }
            {/* {t('_PROPOSITION')}
            {t('_QUOTES')} */}
        </>
    )

}
export default ContractRoles;