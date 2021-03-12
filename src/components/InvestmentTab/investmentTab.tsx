import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { formatValue } from '../../util/functions';
import { ApplicationContext } from '../../context/applicationContext';
const InvestmentTab = (props: { mainRiskUrl: string }) => {

    const { t } = useTranslation();
    const [interestBasedFund, setInterestBasedFund] = useState<Array<any>>([]);
    const [unitBasedFund, setUnitBasedFund] = useState<Array<any>>([]);
    let interestFunds: any[] = [];
    let unitFunds: any[] = [];
    const applicationContext = useContext(ApplicationContext);

    useEffect(() => {
        getData();
    }, [applicationContext, props.mainRiskUrl]);

    const getData = () => {
        axios.get(props.mainRiskUrl, { headers: applicationContext.headers }).then(riskRes => {
            if (riskRes.data._links['cscaia:product_component_list']) {
                axios.get(riskRes.data._links['cscaia:product_component_list'].href, { headers: applicationContext.headers }).then(res => {
                    if (res && res.data && res.data._links && res.data._links.item) {
                        const req: any[] = [];
                        res.data._links.item = Array.isArray(res.data._links.item) ? res.data._links.item : [res.data._links.item]
                        res.data._links.item.forEach((element: { summary: { [x: string]: string; }; href: string }) => {
                            if (element.summary && element.summary['coverage_fund:type_variant'] === 'savings_pool') {
                                req.push(axios.get(element.href, { headers: applicationContext.headers }));
                            }
                        });
                        Promise.all(req).then(responseArray => {
                            const investmentFunds: any[] = []
                            responseArray.forEach(item => {
                                if (item.data && item.data._links['savings_pool:coverage_fund_list']) {
                                    const investmentFundsUrl = item.data._links['savings_pool:coverage_fund_list'].href;
                                    investmentFunds.push(axios.get(investmentFundsUrl, { headers: applicationContext.headers }));
                                }
                            });
                            Promise.all(investmentFunds).then(investmentFundsArray => {
                                investmentFundsArray.forEach(item => {
                                    if (item.data && item.data._links.item) {
                                        const items = Array.isArray(item.data._links.item) ? item.data._links.item : [item.data._links.item];
                                        items.forEach((element: { summary: { [x: string]: string; }; href: any; }) => {
                                            if (element.summary['coverage_fund:type_variant'] === 'interest_fund') {
                                                interestFunds.push(element);
                                            }
                                            if (element.summary['coverage_fund:type_variant'] === 'unit_linked_fund') {
                                                unitFunds.push(element)
                                            }
                                        });
                                    }
                                })
                                setUnitBasedFund(unitFunds)
                                setInterestBasedFund(interestFunds);
                            })
                        })
                    }
                })
            }
        })
    }

    return (
        <>
            <h5>{t('_INVESTMENT_SUMMARY')}</h5>
            <h6>{t('_INTEREST_BASED')}</h6>
            {/*to do refactoring*/}
            {interestBasedFund.length > 0 && (
                <>
                    <DxcTable>
                        <tr>
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_TOTAL_AMOUNT')}</th>
                            <th>{t('_MIN_GRNTD_RATE')}</th>
                            <th>{t('_VALUE')}</th>
                            <th>{t('_DISTRIBUTION')}</th>
                        </tr>
                        {interestBasedFund.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['coverage_fund:label']}</td>
                                <td>{formatValue(row['summary']['interest_fund:invested_amount'], "currency")}</td>
                                <td>{formatValue(row['summary']['interest_fund:guaranteed_rate'], "percent")}</td>
                                <td>{formatValue(row['summary']['interest_fund:net_cash_value'], "currency")}</td>
                                <td>{formatValue(row['summary']['contract_allocation_rate'], "percent")}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
            <h6>{t('_UNIT_LINKED')}</h6>
            {unitBasedFund.length > 0 && (
                <>
                    <DxcTable>
                        <tr>
                            <th>{t('_FUND_LABEL')}</th>
                            <th>{t('_TWRR')}</th>
                            <th>{t('_TOTAL_AMOUNT')}</th>
                            <th>{t('_TYPE')}</th>
                            <th>{t('_UNIT_PRICE')}</th>
                            <th>{t('_NUMBER_UNIT')}</th>
                            <th>{t('_RISK_LEVEL')}</th>
                            <th>{t('_DATE')}</th>
                            <th>{t('_VALUE')}</th>
                            <th>{t('_DISTRIBUTION')}</th>
                        </tr>
                        {unitBasedFund.map((row) => (
                            <tr key={row['href']}>
                                <td>{row['summary']['coverage_fund:label']}</td>
                                <td>{formatValue(row['summary']['ul_fund_twrr'], "percent")}</td>
                                <td>{formatValue(row['summary']['unit_linked_fund:invested_amount'], "currency")}</td>
                                <td>{row['summary']['unit_linked_fund:category']}</td>
                                <td>{formatValue(row['summary']['unit_linked_fund:unit_value'], "currency")}</td>
                                <td>{formatValue(row['summary']['unit_linked_fund:units'], "decimal")}</td>
                                <td>{row['summary']['unit_linked_fund:s_r_r_i']}</td>
                                <td>{formatValue(row['summary']['unit_linked_fund:unit_value_date'], "date")}</td>
                                <td>{formatValue(row['summary']['unit_linked_fund:net_cash_value'], "currency")}</td>
                                <td>{formatValue(row['summary']['contract_allocation_rate'], "percent")}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
        </>
    );

}

export default InvestmentTab;