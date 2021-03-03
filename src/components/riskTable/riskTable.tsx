import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';

const RiskTable = (props: { risks: Array<any> }) => {

    const { t } = useTranslation();
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
