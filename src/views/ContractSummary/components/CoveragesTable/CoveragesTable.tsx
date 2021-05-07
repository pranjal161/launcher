import React, { useContext, useEffect, useState } from 'react';

import { AppConfig } from 'config/appConfig';
import { ApplicationContext } from 'context/applicationContext';
import Table from "components/Table/Table";
import useAia from 'data/hooks/useAia';

const CoveragesTable = (props: { mainRiskUrl: string }) => {
    const config = AppConfig;
    const applicationContext = useContext(ApplicationContext);
    const [coverageUrl, setCoverageUrl] = useState('');
    const { fetch } = useAia();
    const coverageListColumns = [
        { label: '_LABEL', property: 'coverage:label' },
        { label: '_TYPE', property: 'coverage:type' },
        { label: '_START_DATE', property: 'coverage:start_date', type: 'date' },
        { label: '_END_DATE', property: 'coverage:end_date', type: 'date' },
    ];
    useEffect(() => {
        getData();
    }, [props.mainRiskUrl, applicationContext]);

    const getData = () => {
        fetch(props.mainRiskUrl, { headers: config.headers }).then((riskRes: any) => {
            if (riskRes.data._links['cscaia:product_component_list']) {
                const coverageUrl = riskRes.data._links['cscaia:product_component_list'].href;
                setCoverageUrl(coverageUrl);
            }
        });
    };

    return <>{coverageUrl && <Table url={coverageUrl} columnId={coverageListColumns} showPaginator={true} />}</>;
};

export default CoveragesTable;
