import React, { useContext, useEffect, useState } from "react";

import { AppConfig } from "config/appConfig";
import { ApplicationContext } from "context/applicationContext";
import {DxcHeading} from '@dxc-technology/halstack-react';
import Table from "components/Table/Table";
import { useTranslation } from "react-i18next";

const ClaimList = (props: { clientUrl: string }) => {
    const [claimUrl, setClaimUrl] = useState<string>();
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
        { label: '_EFFECTIVE_DATE', property: 'claim_event:date', type: 'date' },
    ];

    useEffect(() => {
        if (props.clientUrl && props.clientUrl.includes('persons')) {
            const claimListURL =
                AppConfig.hostUrl.defaultHostUrl +
                'claims?_inquiry=s_claim_event_search_rest&claim_event:owner=' +
                props.clientUrl;
            setClaimUrl(claimListURL);
        } else if (props.clientUrl && props.clientUrl.includes('organizations')) {
            const claimListURL =
                AppConfig.hostUrl.defaultHostUrl +
                'claims?_inquiry=s_claim_event_search_rest&claim_event:owner_organization=' +
                props.clientUrl;
            setClaimUrl(claimListURL);
        }
    }, [applicationContext, props.clientUrl]);

    return (
        <>
            {claimUrl && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_CLAIMS')} />
                    <Table url={claimUrl} columnId={claimListColumns} showPaginator={true} />
                </>
            )}
        </>
    );
};
export default ClaimList;
