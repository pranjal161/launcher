import React, { useContext, useEffect } from 'react';

import { ApplicationContext } from '../../context/applicationContext';
import { DxcTable } from '@dxc-technology/halstack-react';
import { useTranslation } from 'react-i18next';

const RiskTable = (props: { risks: Array<any> }) => {
    const applicationContext = useContext(ApplicationContext);
    const { t } = useTranslation();

    useEffect(() => {
        // Nothing to do
    }, 
    [props.risks, applicationContext]
    );

    return (
        <>
            {props.risks.length > 0 && (
                <DxcTable>
                    <tr>
                        <th>{t('_RISK_DATA')}</th>
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
};
export default RiskTable;
