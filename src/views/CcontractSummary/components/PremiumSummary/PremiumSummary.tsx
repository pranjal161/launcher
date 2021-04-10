import React, { useContext, useEffect, useState } from 'react';
import { formatValue, getDescriptionValue } from 'util/functions';

import { AppConfig } from 'config/appConfig';
import { ApplicationContext } from 'context/applicationContext';
import Chart from 'components/Cchart/Chart';
import { DxcTable } from '@dxc-technology/halstack-react';
import Label from 'components/Llabel/Label';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

/**
 * Display premium summary in a table
 * @param {props} props Contains information related to the premium
 * @returns {*} Return information of the  in a table
 */
export const PremiumSummary = (props: { premiumSummaryHref: string }) => {
    const { t } = useTranslation();
    const [distributionList, setDistributionList] = React.useState([]);
    const [premiumResponse, setPremiumResponse] = React.useState();
    const [investmentFundsResItems, setInvestmentFundsResItems] = React.useState([]);
    const applicationContext = useContext(ApplicationContext);
    const config = AppConfig;
    let investmentFundsPayload: any[] = [];
    const [chartData, setChartData] = useState<Array<any>>([]);

    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        if (props.premiumSummaryHref) {
            axios.get(props.premiumSummaryHref, { headers: config.headers }).then((res: any) => {
                setPremiumResponse(res.data);
                if (res && res.data && res.data['investment_split']) {
                    let investmentFundsRes = res.data['investment_split'];
                    if (!Array.isArray(investmentFundsRes)) {
                        investmentFundsRes = [investmentFundsRes];
                    }
                    investmentSplitData(investmentFundsRes);
                }
                const distributionListItems: any =
                    res.data['distribution_list'] && Array.isArray(res.data['distribution_list'])
                        ? res.data['distribution_list']
                        : [res.data['distribution_list']];
                setDistributionList(distributionListItems);
            });
        }
    };

    /**
     * Split data of the investment
     * @param {data} data Contains information related to the investment
     * @returns {void} Load and set information of the investment in a chart
     */
    function investmentSplitData(data: any) {
        const investmentFunds: any[] = [];
        data.forEach((element: any) => {
            if (element['allocation:coverage_fund']) {
                const fundsUrl = element['allocation:coverage_fund'];
                investmentFunds.push(axios.get(fundsUrl, { headers: applicationContext.headers }));
            }
        });

        Promise.all(investmentFunds).then((investmentFundsArray: any) => {
            setInvestmentFundsResItems(investmentFundsArray);
            investmentFundsArray.forEach((res: any) => {
                const resHref = res.data['_links']['self'].href;
                const currentItem = data.find(
                    (item: { [x: string]: any }) => item['allocation:coverage_fund'] === resHref,
                );
                
                if (currentItem) {
                    let result = {
                        _FUND_LABEL: res.data['coverage_fund:label'],
                        _ALLOCATION: currentItem['allocation:rate'],
                        _FUND_TYPE: res.data['unit_linked_fund:category'],
                        _FUND_SRRI: res.data['interest_fund:s_r_r_i'],
                        allocation_fund: currentItem['allocation:coverage_fund'],
                        value: res.data['interest_fund:net_cash_value'] ? res.data['interest_fund:net_cash_value'] : res.data['unit_linked_fund:net_cash_value']
                    };
                    
                    investmentFundsPayload.push(result);
                }
            });
            
            setChartData(investmentFundsPayload);
        });
    }

    return (
        <>
            <h5>{t('_PREMIUM_SUMMARY')}</h5>
            {premiumResponse && (
                <>
                    <h6>{t('_INITIAL_PREMIUM')}</h6>
                    <div className="row col-12">
                        <div className="col-6">
                            <Label propertyName="operation:identifier" label="_IDENTIFIER" data={premiumResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="premium:status" label="_STATUS" data={premiumResponse} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="premium:type" label="_TYPE" data={premiumResponse} />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="premium:due_date"
                                label="_EFFECTIVE_DATE"
                                data={premiumResponse}
                                type="date"
                            />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="operation:amount"
                                label="_GROSS_AMOUNT"
                                data={premiumResponse}
                                type="currency"
                            />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="operation:net_amount"
                                label="_NET_AMOUNT"
                                data={premiumResponse}
                                type="currency"
                            />
                        </div>
                    </div>
                </>
            )}
            {distributionList && distributionList.length > 0 && (
                <>
                    <h5>{t('_PREMIUM_DISTRIBUTION_LIST')}</h5>
                    <DxcTable>
                        <tr>
                            <th>{t('_PREMIUM_FUND_LABEL')}</th>
                            <th>{t('_PREMIUM_DISTRIBUTION_TYPE')}</th>
                            <th>{t('_PREMIUM_DISTRIBUTION_AMOUNT')}</th>
                        </tr>
                        {distributionList.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['product_component_label']}</td>
                                <td>{row['premium_distribution_item:type_label']}</td>
                                <td>{formatValue(row['premium_distribution_item:amount'], 'currency')}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            {investmentFundsResItems && investmentFundsResItems.length > 0 && (
                <>
                    <h5>{t('_PREMIUM_FUND_LIST')}</h5>
                    <DxcTable>
                        <tr>
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_TYPE')}</th>
                            <th>{t('_RISK_LEVEL')}</th>
                            <th>{t('_VALUE')}</th>
                            <th>{t('_DISTRIBUTION')}</th>
                        </tr>
                        {investmentFundsResItems.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['data']['coverage_fund:label']}</td>
                                <td>
                                    {getDescriptionValue(
                                        row['data']['coverage_fund:type'],
                                        'coverage_fund:type',
                                        premiumResponse,
                                    )}
                                </td>
                                <td>{row['data']['interest_fund:s_r_r_']}</td>
                                <td>{row['data']['interest_fund:net_cash_value']}</td>
                                <td>{row['data']['contract_allocation_rate']}</td>
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
