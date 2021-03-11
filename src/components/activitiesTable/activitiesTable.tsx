import { useTranslation } from 'react-i18next';
import { AppConfig } from '../../config/appConfig';
import { useEffect, useState } from 'react';
import React from 'react';
import { getLink } from '../../util/functions';
import Table from "../../components/table/table";

const ActivitiesTable = (props: { contractResponse: any }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [activityUrl, setActivityUrl] = useState('');
    const activityListColumns = [
        { label: '_USER', property: 'w_m_activity:user' },
        { label: '_TYPE', property: 'w_m_activity:label' },
        { label: '_DATE', property: 'w_m_activity:effective_date', type: "date" },
        { label: '_STATUS', property: 'w_m_activity:status' }
    ];

    useEffect(() => {
        getData();
    }, [props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            const activityUrl = getLink(props.contractResponse, 'cscaia:activities');
            setActivityUrl(activityUrl);
        }
    }

    return (
        <>
            { activityUrl && (
                <>
                    < Table url={activityUrl} columnId={activityListColumns} />
                </>
            )
            }
        </>
    )
}

export default ActivitiesTable
