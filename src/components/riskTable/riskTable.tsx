import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import React, { useEffect } from 'react';

const RiskTable = (props: { risks: Array<any> }) => {

    const { t } = useTranslation();

    useEffect(() => {}, [props.risks]);

    return (
        <div>
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
        </div>
    );
}
export default RiskTable
