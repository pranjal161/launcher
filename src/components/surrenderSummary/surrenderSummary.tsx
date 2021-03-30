import React, { useContext, useEffect, useState } from 'react';

import Chart from '../chart/chart';
import { DxcTable } from '@dxc-technology/halstack-react';
import Label from '../../components/label/label';
import axios from 'axios';
import { formatValue } from '../../util/functions';
import { useTranslation } from 'react-i18next';

export const SurrenderSummary = (props: { surrenderSummaryHref: string }) => {
    const { t } = useTranslation();
    const [disinvestmentSplitList, setDisinvestmentSplitList] = useState<Array<any>>([]);
    const [surrenderResponse, setSurrenderResponse] = useState<Array<any>>([]);
    let surrenderRes: any;
    const applicationContext = useContext(ApplicationContext);
    const config = AppConfig;
    const [chartData, setChartData] = useState<Array<any>>([]);
    let disinvestmentSplitItem:any[] = [];

    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        axios.get(props.surrenderSummaryHref, { headers: config.headers }).then((res: any) => {
            surrenderRes = res.data;
            setSurrenderResponse(res.data);
            const disinvestmentSplitListItems: any = res.data && res.data['disinvestment_split'] && Array.isArray(res.data['disinvestment_split']) ? res.data['disinvestment_split'] :
                [res.data['disinvestment_split']];
            if (disinvestmentSplitListItems) {
                let disinvestmentSplitElement: any[] = [];
                disinvestmentSplitListItems.forEach((element: any) => {
                    if (element && element['allocation:coverage_fund']) {
                        disinvestmentSplitItem.push(element);
                        disinvestmentSplitElement.push(axios.get(element['allocation:coverage_fund'], { headers: applicationContext.headers }));
                    }
                });
                Promise.all(disinvestmentSplitElement).then((disinvestmentRes) => {
                    if (disinvestmentSplitListItems && disinvestmentRes) {
                        let _list: any[] = [];
                        disinvestmentRes.forEach((res) => {
                            const resHref = res.data['_links']['self'].href;
                            const currentItem = disinvestmentSplitListItems.find((item: { [x: string]: any; }) => item['allocation:coverage_fund'] === resHref);
                            if (currentItem) {
                                let _result = {
                                    'coverage_fund:label': res.data['coverage_fund:label'],
                                    'coverage_fund:type': res.data['coverage_fund:type'],
                                    'savings_flow:start_date': surrenderRes['operation:investment_date'],
                                    'allocation:amount': currentItem['allocation:amount'],
                                    'allocation:rate': currentItem['allocation:rate']
                                };
                                _list.push(_result);
                            }
                            setDisinvestmentSplitList(_list);
                        });
                        buildChartData(disinvestmentRes);
                    }
                });
            }
        });
    }

    const buildChartData = (unitFunds: any[]) => {
        if (disinvestmentSplitItem && unitFunds && unitFunds.length > 0) {
            let _list: any[] = [];
            unitFunds.forEach((res) => {
                const resHref = res.data['_links']['self'].href;
                const currentItem = disinvestmentSplitItem.find((item: { [x: string]: any; }) => item['allocation:coverage_fund'] === resHref);
                if (currentItem) {
                    let _result = {
                        _FUND_LABEL: res.data['coverage_fund:label'],
                        _ALLOCATION: currentItem['allocation:rate'],
                        _FUND_TYPE: res.data['unit_linked_fund:category'],
                        _FUND_SRRI: res.data['unit_linked_fund:s_r_r_i'],
                        value: res.data['interest_fund:net_cash_value'] ? res.data['interest_fund:net_cash_value'] : res.data['unit_linked_fund:net_cash_value'],
                        allocation_fund: currentItem['allocation:coverage_fund']
                    };
                    _list.push(_result);
                }
            });
            setChartData(_list);
        }
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
                            <Label
                                propertyName="operation:value_date"
                                label="_EFFECTIVE_DATE"
                                data={surrenderResponse}
                                type="date"
                            />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="operation:amount"
                                label="_GROSS_AMOUNT"
                                data={surrenderResponse}
                                type="currency"
                            />
                        </div>
                    </div>
                </>
            )}
            {disinvestmentSplitList && (
                <>
                    <h5>{t('_DISINVESTED_FUNDS')}</h5>
                    <DxcTable>
                        <tr >
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_TYPE')}</th>
                            <th>{t('_DATE')}</th>
                            <th>{t('_AMOUNT')}</th>
                        </tr>
                        {disinvestmentSplitList.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['coverage_fund:label']}</td>
                                <td>{row['coverage_fund:type']}</td>
                                <td>{formatValue(row['savings_flow:start_date'], "date")}</td>
                                <td>{formatValue(row['allocation:amount'], "currency")}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            {disinvestmentSplitList && (
                <>
                    <h5>{t('_BREAKDOWN_AFTER_SURRENDER')}</h5>
                    <DxcTable>
                        <tr>
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_ALLOCATION')}</th>
                            <th>{t('_FUND_VALUE')}</th>
                        </tr>
                        {disinvestmentSplitList.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['coverage_fund:label']}</td>
                                <td>{row['allocation:rate']}</td>
                                <td>{formatValue(row['allocation:amount'], "currency")}</td>
                            </tr>
                        ))}
                    </DxcTable>
                    {chartData.length > 0 && (
                        <div className="pt-2">
                            <Chart data={chartData} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};