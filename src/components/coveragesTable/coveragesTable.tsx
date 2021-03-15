import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AppConfig } from '../../config/appConfig';
import { useEffect, useState } from 'react';
import React from 'react';
import Table from "../table/table";

const CoverageTable = (props: { mainRiskUrl: string }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [coverageUrl, setCoverageUrl] = useState('');
    const coverageListColumns = [
        { label: '_LABEL', property: 'coverage:label' },
        { label: '_TYPE', property: 'coverage:type' },
        { label: '_START_DATE', property: 'coverage:start_date', type: "date" },
        { label: '_END_DATE', property: 'coverage:end_date', type: "date" }
    ];
    useEffect(() => {
        getData();
    }, [props.mainRiskUrl]);

    const getData = () => {
        axios.get(props.mainRiskUrl, { headers: config.headers }).then(riskRes => {
            if (riskRes.data._links['cscaia:product_component_list']) {
                const coverageUrl = riskRes.data._links['cscaia:product_component_list'].href;
                setCoverageUrl(coverageUrl);
            }
        })
    }

    return (
        <>
            {coverageUrl && (
                < Table url={coverageUrl} columnId={coverageListColumns} showPaginator={true} />
            )}
        </>
    );
}
export default CoverageTable