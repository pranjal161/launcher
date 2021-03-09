import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { AppConfig } from '../../config/appConfig';
import { useEffect } from 'react';
import React from 'react';
import { getLink } from '../../util/functions';

const ActivitiesTable = (props: { contractResponse: any }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [activityData, setActivityData] = React.useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (props.contractResponse) {
            const activityUrl = getLink(props.contractResponse, 'cscaia:activities');
            axios.get(activityUrl, { headers: config.headers }).then(res => {
                if (res && res.data && res.data._links && res.data._links.item) {
                    res.data._links.item = Array.isArray(res.data._links.item) ? res.data._links.item : [res.data._links.item]
                    res.data._links.item.forEach((element: { summary: { [x: string]: string; }; href: string }) => {
                        setActivityData(res.data._links.item);
                    })
                }
            });
        }
    }

    return (
        <>
            {activityData.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_USER')}</th>
                        <th>{t('_TYPE')}</th>
                        <th>{t('_DATE')}</th>
                        <th>{t('_STATUS')}</th>
                        <th>{t('_REJECTION_REASON')}</th>
                    </tr>
                    {activityData.map((row) => (
                        <tr key={row['href']}>
                            <td>{row['summary']['w_m_activity:user']}</td>
                            <td>{row['summary']['w_m_activity:label']}</td>
                            <td>{row['summary']['w_m_activity:effective_date']}</td>
                            <td>{row['summary']['w_m_activity:status']}</td>
                            <td>{row['summary']['w_m_activity:rejection_reason']}</td>
                        </tr>
                    ))}
                </DxcTable>
            )}
        </>
    );
}
export default ActivitiesTable
