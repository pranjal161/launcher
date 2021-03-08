import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { AppConfig } from '../../config/appConfig';
import { useEffect } from 'react';
import React from 'react';

const CoverageTable = (props: { mainRiskUrl: string }) => {
    const { t } = useTranslation();
    const config = AppConfig;
    const [coverageData, setCoverageData] = React.useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = () => {
        axios.get(props.mainRiskUrl, { headers: config.headers }).then(riskRes => {
            if (riskRes.data._links['cscaia:product_component_list']) {
                axios.get(riskRes.data._links['cscaia:product_component_list'].href, { headers: config.headers }).then(res => {
                    if (res && res.data && res.data._links && res.data._links.item) {
                        res.data._links.item = Array.isArray(res.data._links.item) ? res.data._links.item : [res.data._links.item]
                        res.data._links.item.forEach((element: { summary: { [x: string]: string; }; href: string }) => {
                            setCoverageData(res.data._links.item);
                        });
                    }
                })
            }
        })
    }

    return (
        <div>

            {coverageData.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_LABEL')}</th>
                        <th>{t('_TYPE')}</th>
                        <th>{t('_START_DATE')}</th>
                        <th>{t('_END_DATE')}</th>
                    </tr>
                    {coverageData.map((row) => (
                        <tr key={row['href']}>
                            <td>{row['summary']['coverage:label']}</td>
                            <td>{row['summary']['coverage:type']}</td>
                            <td>{row['summary']['coverage:start_date']}</td>
                            <td>{row['summary']['coverage:end_date']}</td>
                        </tr>
                    ))}
                </DxcTable>
            )}
        </div>
    );
}
export default CoverageTable
