import { useContext, useEffect, useState } from 'react';
import Table from "components/table/table";
import React from 'react';
import { ApplicationContext } from 'context/applicationContext';
import { getLink } from 'util/functions';

const ClausesTable = (props: { contractResponse: any }) => {

    const [clauseUrl, setClauseUrl] = useState('');
    const applicationContext = useContext(ApplicationContext);
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
    }, [props.contractResponse, applicationContext]);

    const getData = () => {
        if (props.contractResponse) {
            const clauseUrl = getLink(props.contractResponse, 'contract:clause_list') + '?_inquiry=clauses_all_levels';
            setClauseUrl(clauseUrl);
        }
    }

    return (
        <>
            { clauseUrl && (
                <>
                    < Table url={clauseUrl} columnId={clauseListColumns} showPaginator={true} />
                </>
            )
            }
        </>
    )
}
export default ClausesTable
