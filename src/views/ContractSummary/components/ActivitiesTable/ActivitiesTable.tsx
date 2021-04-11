import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import Table from "components/Table/Table";
import { getLink } from 'util/functions';

const ActivitiesTable = (props: { contractResponse: any }) => {
    const [activityUrl, setActivityUrl] = useState('');
    const applicationContext = useContext(ApplicationContext);
    const activityListColumns = [
        { label: '_USER', property: 'w_m_activity:user' },
        { label: '_TYPE', property: 'w_m_activity:label' },
        { label: '_DATE', property: 'w_m_activity:effective_date', type: 'date' },
        { label: '_STATUS', property: 'w_m_activity:status' },
    ];

    useEffect(() => {
        getData();
    }, [props.contractResponse, applicationContext]);

    const getData = () => {
        if (props.contractResponse) {
            const activityUrl = getLink(props.contractResponse, 'cscaia:activities');
            setActivityUrl(activityUrl);
        }
    };

    return (
        <>
            {activityUrl && (
                <>
                    <Table url={activityUrl} columnId={activityListColumns} showPaginator={true} />
                </>
            )}
        </>
    );
};

export default ActivitiesTable;
