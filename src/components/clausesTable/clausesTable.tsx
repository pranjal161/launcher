import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { AppConfig } from '../../config/appConfig';
import { useEffect } from 'react';
import React from 'react';

const ActivitiesTable = (props: { contractResponse: any }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [clauseData, setClauseData] = React.useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (props.contractResponse) {
            const clauseUrl = getLink(props.contractResponse, 'contract:clause_list') + '?_inquiry=clauses_all_levels';
            axios.get(clauseUrl, { headers: config.headers }).then(res => {
                if (res && res.data && res.data._links && res.data._links.item) {
                    res.data._links.item = Array.isArray(res.data._links.item) ? res.data._links.item : [res.data._links.item]
                    res.data._links.item.forEach((element: { summary: { [x: string]: string; }; href: string }) => {
                        setClauseData(res.data._links.item);
                    })
                }
            });
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
            {clauseData.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_CODE')}</th>
                        <th>{t('_LABEL')}</th>
                        <th>{t('_PARENT')}</th>
                        <th>{t('_TYPE')}</th>
                        <th>{t('_START_DATE')}</th>
                        <th>{t('_END_DATE')}</th>
                    </tr>
                    {clauseData.map((row) => (
                        <tr key={row['href']}>
                            <td>{row['summary']['clause:code']}</td>
                            <td>{row['summary']['clause:label']}</td>
                            <td>{row['summary']['parent_label']}</td>
                            <td>{row['summary']['clause:type_label']}</td>
                            <td>{row['summary']['clause:start_date']}</td>
                            <td>{row['summary']['clause:end_date']}</td>
                        </tr>
                    ))}
                </DxcTable>
            )}
        </>
    );
}
export default ActivitiesTable
