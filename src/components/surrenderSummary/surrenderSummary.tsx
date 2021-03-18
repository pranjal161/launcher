import React from 'react';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import Label from '../../components/label/label';
import { ApplicationContext } from '../../context/applicationContext';
import { AppConfig } from '../../config/appConfig';
import axios from 'axios';
import { formatValue } from '../../util/functions';
export const SurrenderSummary = (props: { surrenderSummaryHref: string }) => {

    const { t } = useTranslation();
    const [disinvestmentSplitList, setDisinvestmentSplitList] = React.useState([]);
    const [surrenderResponse, setSurrenderResponse] = React.useState([]);
    const [savingsFlowList, setSavingsFlowListItems] = React.useState([]);
    const applicationContext = useContext(ApplicationContext);
    const config = AppConfig;

    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        axios.get(props.surrenderSummaryHref, { headers: config.headers }).then((res: any) => {
            setSurrenderResponse(res.data);
            const disinvestmentSplitListItems: any = res.data && res.data['disinvestment_split'] && Array.isArray(res.data['disinvestment_split']) ? res.data['disinvestment_split'] :
                [res.data['disinvestment_split']];
            setDisinvestmentSplitList(disinvestmentSplitListItems);

            const savingsFlowListHref = res.data['_links'] && res.data['_links']['operation:savings_flow_list'] ? res.data['_links']['operation:savings_flow_list'].href : '';
            axios.get(savingsFlowListHref, { headers: applicationContext.headers }).then(response => {
                if (response && response.data['_links'] && response.data['_links']['item']) {
                    const savingsFlowListItems: any = Array.isArray(response.data['_links']['item']) ? response.data['_links']['item'] :
                        [response.data['_links']['item']];
                    setSavingsFlowListItems(savingsFlowListItems);
                }
            });
        });
    }

    return (
        <>
            <h5>{t('_SURRENDER_SUMMARY')}</h5>
            {surrenderResponse && (
                <>
                    <div className="row col-12">
                        <div className="col-6">
                            <Label propertyName="operation:identifier" label="_IDENTIFIER" data={surrenderResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="surrender:status" label="_STATUS" data={surrenderResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="surrender:type" label="_TYPE" data={surrenderResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="operation:value_date" label="_EFFECTIVE_DATE" data={surrenderResponse} type="date" />
                        </div>
                        <div className="col-6">
                            <Label propertyName="operation:amount" label="_GROSS_AMOUNT" data={surrenderResponse} type="currency" />
                        </div>
                    </div>
                </>
            )}
            {disinvestmentSplitList && (
                <>
                    <h5>{t('_DISINVESTED_FUNDS')}</h5>
                    <DxcTable>
                        <tr >
                            <th>{t('_ALLOCATION')}</th>
                            <th>{t('_ALLOCATION_RATE')}</th>
                            <th>{t('_GLOBAL_RATE')}</th>
                            <th>{t('_AMOUNT')}</th>
                        </tr>
                        {disinvestmentSplitList.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['allocation_type']}</td>
                                <td>{row['allocation:rate']}</td>
                                <td>{row['global_rate']}</td>
                                <td>{formatValue(row['allocation:amount'], "currency")}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            {savingsFlowList && (
                <>
                    <h5>{t('_BREAKDOWN_AFTER_SURRENDER')}</h5>
                    <DxcTable>
                        <tr>
                            <th>{t('_TYPE')}</th>
                            <th>{t('_STATUS_LABEL')}</th>
                            <th>{t('_DATE')}</th>
                            <th>{t('_AMOUNT')}</th>
                        </tr>
                        {savingsFlowList.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['summary']['savings_flow:type_label']}</td>
                                <td>{row['summary']['savings_flow:status_label']}</td>
                                <td>{formatValue(row['summary']['savings_flow:investment_date'], "date")}</td>
                                <td>{formatValue(row['summary']['savings_flow:amount'], "currency")}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
        </>
    );

}



