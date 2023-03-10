import { DxcHeading, DxcTable } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import Chart from 'components/Chart/Chart';
import Label from 'components/Label/Label';
import { formatValue } from 'util/functions';
import useAia from 'data/hooks/useAia';
import { useTranslation } from "react-i18next";

export const SwitchSummary = (props: { switchSummaryHref: string }) => {
    const { t } = useTranslation();
    const [switchResponse, setSwitchResponse] = React.useState([]);
    const applicationContext = useContext(ApplicationContext);
    const [investmentSplitList, setinvestmentSplitList] = useState<Array<any>>([]);
    const [chartData, setChartData] = useState<Array<any>>([]);
    let investmentSplit: any[] = [];
    const { fetch } = useAia();

    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        fetch(props.switchSummaryHref).then((res: any) => {
            setSwitchResponse(res.data);

            const investmentSplitListItems: any = res.data && res.data['investment_split'] && Array.isArray(res.data['investment_split']) ? res.data['investment_split'] :
                [res['investment_split']];

            if (investmentSplitListItems) {
                let investmentSplitElement: any[] = [];

                investmentSplitListItems.forEach((element: any) => {
                    if (element && element['allocation:coverage_fund']) {
                        investmentSplit.push(element);
                        investmentSplitElement.push(fetch(element['allocation:coverage_fund']));
                    }
                });
                Promise.all(investmentSplitElement).then((investmentRes: any) => {
                    if (investmentSplitListItems && investmentRes) {
                        let _list: any[] = [];

                        investmentRes.forEach((res: any) => {
                            const resHref = res.data['_links']['self'].href;
                            const currentItem = investmentSplit.find((item: { [x: string]: any; }) => item['allocation:coverage_fund'] === resHref);

                            if (currentItem) {
                                let _result = {
                                    'coverage_fund:label': res.data['coverage_fund:label'],
                                    'coverage_fund:type': res.data['coverage_fund:type'],
                                    'savings_flow:start_date': investmentRes['operation:investment_date'],
                                    'allocation:amount': currentItem['allocation:amount'],
                                    'allocation:rate': currentItem['allocation:rate']
                                };

                                _list.push(_result);
                            }
                        });

                        setinvestmentSplitList(_list);
                        buildChartData(investmentRes);
                    }
                });
            }
        });
    }

    const buildChartData = (unitFunds: any[]) => {
        if (investmentSplit && unitFunds && unitFunds.length > 0) {
            let _list: any[] = [];
            unitFunds.forEach((res) => {
                const resHref = res.data['_links']['self'].href;
                const currentItem = investmentSplit.find((item: { [x: string]: any; }) => item['allocation:coverage_fund'] === resHref);

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
            <DxcHeading level={4} weight="light" text={t('_SWITCH_SUMMARY')} />
            {switchResponse && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_INITIAL_PREMIUM')} />
                    <div className="row col-12">
                        <div className="col-6">
                            <Label propertyName="operation:identifier" label="_IDENTIFIER" data={switchResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="switch:status" label="_STATUS" data={switchResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="switch:type_label" label="_TYPE" data={switchResponse} />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="operation:value_date"
                                label="_EFFECTIVE_DATE"
                                data={switchResponse}
                                type="date"
                            />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="operation:amount"
                                label="_GROSS_AMOUNT"
                                data={switchResponse}
                                type="currency"
                            />
                        </div>
                    </div>
                </>
            )}
            {investmentSplitList && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_DISINVESTED_FUNDS')} />
                    <DxcTable>
                        <tr >
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_TYPE')}</th>
                            <th>{t('_DATE')}</th>
                            <th>{t('_AMOUNT')}</th>
                        </tr>
                        {investmentSplitList.map((row: any, i: number) => (
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
            {investmentSplitList && (
                <>
                    <DxcHeading level={5} weight="light" text={t('_BREAKDOWN_AFTER_SWITCH')} />
                    <DxcTable>
                        <tr>
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_ALLOCATION')}</th>
                            <th>{t('_FUND_VALUE')}</th>
                        </tr>
                        {investmentSplitList.map((row: any, i: number) => (
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
