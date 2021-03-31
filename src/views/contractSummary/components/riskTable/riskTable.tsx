import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import React, { useEffect, useContext } from 'react';
import { ApplicationContext } from 'context/applicationContext';

const RiskTable = (props: { risks: Array<any> }) => {
    const applicationContext = useContext(ApplicationContext)
    const { t } = useTranslation();

    useEffect(() => { }, [props.risks, applicationContext]);

    return (
        <>
            {props.risks.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>
                            {t('_RISK_DATA')}
                        </th>
                    </tr>
                    {props.risks.map((row) => (
                        <tr key={row['href']}>
                            <td>{row.title}</td>
                        </tr>
                    ))}
                </DxcTable>
            )}
        </>
    );
}
export default RiskTable
