import { DxcHeading, DxcTable } from "@dxc-technology/halstack-react";
import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import Chart from 'components/Chart/Chart';
import axios from 'axios';
import { getDescriptionValue } from 'util/functions';
import { useTranslation } from 'react-i18next';

const InvestmentTab = (props: { mainRiskUrl: string }) => {
    const { t } = useTranslation();
    const [interestBasedFund, setInterestBasedFund] = useState<Array<any>>([]);
    const [unitBasedFund, setUnitBasedFund] = useState<Array<any>>([]);
    const [chartData, setChartData] = useState<Array<any>>([]);
    let interestFunds: any[] = [];
    let unitFunds: any[] = [];
    const applicationContext = useContext(ApplicationContext);
    const unitLinkedFundColumns = [
        { label: '_FUND_LABEL', property: 'coverage_fund:label' },
        { label: '_TWRR', property: 'ul_fund_twrr', type: 'percent' },
        { label: '_TOTAL_AMOUNT', property: 'unit_linked_fund:invested_amount', type: 'currency' },
        { label: '_TYPE', property: 'unit_linked_fund:category' },
        { label: '_UNIT_PRICE', property: 'unit_linked_fund:unit_value', type: 'currency' },
        { label: '_NUMBER_UNIT', property: 'unit_linked_fund:units', type: 'decimal' },
        { label: '_RISK_LEVEL', property: 'unit_linked_fund:s_r_r_i' },
        { label: '_DATE', property: 'unit_linked_fund:unit_value_date', type: 'date' },
        { label: '_VALUE', property: 'coverage_fund:net_cash_value', type: 'currency' },
        { label: '_DISTRIBUTION', property: 'contract_allocation_rate', type: 'percent' },
    ];
    const interestFundsColumns = [
        { label: '_FUND_LABEL', property: 'coverage_fund:label' },
        { label: '_TOTAL_AMOUNT', property: 'interest_fund:invested_amount', type: 'currency' },
        { label: '_MIN_GRNTD_RATE', property: 'interest_fund:guaranteed_rate', type: 'percent' },
        { label: '_VALUE', property: 'interest_fund:net_cash_value', type: 'currency' },
        { label: '_DISTRIBUTION', property: 'contract_allocation_rate', type: 'percent' },
    ];
    useEffect(() => {
        getData();
    }, [applicationContext, props.mainRiskUrl]);

    const getData = () => {
        axios.get(props.mainRiskUrl, { headers: applicationContext.headers }).then((riskRes) => {
            if (riskRes.data._links['cscaia:product_component_list']) {
                axios
                    .get(riskRes.data._links['cscaia:product_component_list'].href, {
                        headers: applicationContext.headers,
                    })
                    .then((res) => {
                        if (res && res.data && res.data._links && res.data._links.item) {
                            const req: any[] = [];
                            res.data._links.item = Array.isArray(res.data._links.item)
                                ? res.data._links.item
                                : [res.data._links.item];
                            res.data._links.item.forEach(
                                (element: { summary: { [x: string]: string }; href: string }) => {
                                    if (
                                        element.summary &&
                                        element.summary['coverage_fund:type_variant'] === 'savings_pool'
                                    ) {
                                        req.push(axios.get(element.href, { headers: applicationContext.headers }));
                                    }
                                },
                            );
                            Promise.all(req).then((responseArray) => {
                                const investmentFunds: any[] = [];
                                responseArray.forEach((item) => {
                                    if (item.data && item.data._links['savings_pool:coverage_fund_list']) {
                                        const investmentFundsUrl =
                                            item.data._links['savings_pool:coverage_fund_list'].href;
                                        investmentFunds.push(
                                            axios.get(investmentFundsUrl, { headers: applicationContext.headers }),
                                        );
                                    }
                                });
                                Promise.all(investmentFunds).then((investmentFundsArray) => {
                                    investmentFundsArray.forEach((item) => {
                                        if (item.data && item.data._links.item) {
                                            const items = Array.isArray(item.data._links.item)
                                                ? item.data._links.item
                                                : [item.data._links.item];
                                            items.forEach(
                                                (element: { summary: { [x: string]: string }; href: any }) => {
                                                    if (
                                                        element.summary['coverage_fund:type_variant'] ===
                                                        'interest_fund'
                                                    ) {
                                                        interestFunds.push({ element: element, data: item.data });
                                                    }
                                                    if (
                                                        element.summary['coverage_fund:type_variant'] ===
                                                        'unit_linked_fund'
                                                    ) {
                                                        unitFunds.push({ element: element, data: item.data });
                                                    }
                                                },
                                            );
                                        }
                                    });
                                    setUnitBasedFund(unitFunds);
                                    buildChartData(unitFunds);
                                    setInterestBasedFund(interestFunds);
                                });
                            });
                        }
                    });
            }
        });
    };

    const buildChartData = (unitFunds: any[]) => {
        let chartFundList = processChartData(unitFunds);
        setChartData(chartFundList);
    };

    const processChartData = (investmentFundsResItems: any[]) => {
        let _list: any[] = [];
        investmentFundsResItems.forEach((item) => {
            let _result = {
                _FUND_LABEL: item.element.summary['coverage_fund:label'],
                _ALLOCATION: item.element.summary['contract_allocation_rate'],
                _FUND_TYPE: item.element.summary['unit_linked_fund:category'],
                _FUND_SRRI: item.element.summary['unit_linked_fund:s_r_r_i'],
            };
            _list.push(_result);
        });
        return _list;
    };

    return (
        <>
            <DxcHeading level={4} weight="light" text={t('_INVESTMENT_SUMMARY')} />
            <DxcHeading level={5} weight="light" text={t('_INTEREST_BASED')} />
            {/*to do refactoring*/}
            {interestBasedFund.length > 0 && (
                <>
                    <DxcTable>
                        <tr>
                            {interestFundsColumns.map((item) => (
                                <th key={item.label}>{t(item.label)}</th>
                            ))}
                        </tr>
                        {interestBasedFund.map((row) => (
                            <tr key={row['href']}>
                                {interestFundsColumns.map((item) => (
                                    <td key={item.label}>
                                        {getDescriptionValue(
                                            row.element['summary'][item.property],
                                            item.property,
                                            row.data,
                                            item.type,
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            <DxcHeading level={5} weight="light" text={t('_UNIT_LINKED')} />
            {unitBasedFund.length > 0 && (
                <>
                    <DxcTable>
                        <tr>
                            {unitLinkedFundColumns.map((item) => (
                                <th key={item.label}>{t(item.label)}</th>
                            ))}
                        </tr>
                        {unitBasedFund.map((row) => (
                            <tr key={row['href']}>
                                {unitLinkedFundColumns.map((item) => (
                                    <td key={item.label}>
                                        {getDescriptionValue(
                                            row.element['summary'][item.property],
                                            item.property,
                                            row.data,
                                            item.type,
                                        )}
                                    </td>
                                ))}
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

export default InvestmentTab;
