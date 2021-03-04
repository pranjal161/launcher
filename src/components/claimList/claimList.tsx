import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppConfig } from "../../config/appConfig";
import { ApplicationContext } from "../../context/applicationContext";
import Table from "../table/table";

const ClaimList = (props: { clientUrl: string; }) => {
    const [claimUrl, setClaimUrl] = useState('');
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const claimListColumns = [
        { label: '_CLAIM_IDENTIFIER', property: 'claim_event:identifier' },
        { label: '_CONTRACT_IDENTIFIER', property: 'contract:number' },
        { label: '_PRODUCT', property: 'contract:product_identifier' },
        { label: '_OWNER_NAME', property: 'claim_party:full_name' },
        { label: '_RISK_DATA', property: 'membership:display_id' },
        { label: '_EVENT_TYPE', property: 'claim_event:type' },
        { label: '_STATUS', property: 'claim_event:status' },
        { label: '_EFFECTIVE_DATE', property: 'claim_event:date' }
    ];

    useEffect(() => {
        if (props.clientUrl && props.clientUrl.includes('persons')) {
            const claimListURL = AppConfig.hostUrl.defaultHostUrl + 'claims?_inquiry=s_claim_event_search_rest&claim_event:owner=' + props.clientUrl;
            setClaimUrl(claimListURL);

        } else if (props.clientUrl && props.clientUrl.includes('organizations')) {
            const claimListURL = AppConfig.hostUrl.defaultHostUrl +
                'claims?_inquiry=s_claim_event_search_rest&claim_event:owner_organization=' + props.clientUrl;
            setClaimUrl(claimListURL);
        }
    }, [applicationContext, props.clientUrl]);

    return (
        <>
            { claimUrl && (
                <>
                    <h4> {t('_CLAIMS')}</h4>
                    < Table url={claimUrl} columnId={claimListColumns} />
                </>
            )
            }
        </>
    )
}
export default ClaimList;