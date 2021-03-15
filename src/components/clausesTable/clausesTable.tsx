import { useTranslation } from 'react-i18next';
import { AppConfig } from '../../config/appConfig';
import { useEffect, useState } from 'react';
import Table from "../../components/table/table";
import React from 'react';

const ActivitiesTable = (props: { contractResponse: any }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [clauseUrl, setClauseUrl] = useState('');
    const clauseListColumns = [
        { label: '_CODE', property: 'clause:code' },
        { label: '_LABEL', property: 'clause:code' },
        { label: '_PARENT', property: 'parent_label' },
        { label: '_TYPE', property: 'clause:type_label' },
        { label: '_START_DATE', property: 'clause:start_date', type: "date" },
        { label: '_END_DATE', property: 'clause:end_date', type: "date" }
    ];

    useEffect(() => {
        getData();
    }, [props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            const clauseUrl = getLink(props.contractResponse, 'contract:clause_list') + '?_inquiry=clauses_all_levels';
            setClauseUrl(clauseUrl);
        }
    }

    function getLink(response: any, linkName: string) {
        if (response &&
            response._links &&
            response._links[linkName] &&
            response._links[linkName].href) {
            return response._links[linkName].href;
        } else {
            return null;
        }
    }
    return (
        <>
            { clauseUrl && (
                <>
                    < Table url={clauseUrl} columnId={clauseListColumns} showPaginator={true}/>
                </>
            )
            }
        </>
    )
}
export default ActivitiesTable
