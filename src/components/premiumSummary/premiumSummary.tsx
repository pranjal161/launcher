import React from 'react';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import Label from '../../components/label/label';
import axios from 'axios';
import { ApplicationContext } from '../../context/applicationContext';
import { getDescriptionValue } from '../../util/functions';
import { AppConfig } from '../../config/appConfig';
export const PremiumSummary = (props: { premiumSummaryHref: string }) => {

    const { t } = useTranslation();
    const [distributionList, setDistributionList] = React.useState([]);
    const [premiumResponse, setPremiumResponse] = React.useState();
    const [investmentFundsResItems, setInvestmentFundsResItems] = React.useState([]);
    const applicationContext = useContext(ApplicationContext);
    const config = AppConfig;

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
                const distributionListItems: any = res.data['distribution_list'] && Array.isArray(res.data['distribution_list']) ? res.data['distribution_list'] :
                    [res.data['distribution_list']];
                setDistributionList(distributionListItems);
            });
        }
    }

    function investmentSplitData(data: any) {
        const investmentFunds: any[] = []
        data.forEach((element: any) => {
            if (element['allocation:coverage_fund']) {
                const fundsUrl = element['allocation:coverage_fund'];
                investmentFunds.push(axios.get(fundsUrl, { headers: applicationContext.headers }));
            }
        });

        Promise.all(investmentFunds).then((investmentFundsArray: any) => {
            setInvestmentFundsResItems(investmentFundsArray);
        });
    }

    return (
        <>
            <h5>{t('_PREMIUM_SUMMARY')}</h5>
            {premiumResponse && (
                <>
                    <h6>{t('_INITIAL_PREMIUM')}</h6>
                    <div className="col-4">
                        <Label propertyName="operation:identifier" label="_IDENTIFIER" data={premiumResponse} />

                        <Label propertyName="premium:status" label="_STATUS" data={premiumResponse} />

                        <Label propertyName="premium:type" label="_TYPE" data={premiumResponse} />

                        <Label propertyName="premium:due_date" label="_EFFECTIVE_DATE" data={premiumResponse} />

                        <Label propertyName="operation:amount" label="_GROSS_AMOUNT" data={premiumResponse} />

                        <Label propertyName="operation:net_amount" label="_NET_AMOUNT" data={premiumResponse} />
                    </div>
                </>
            )}
            {distributionList && distributionList.length > 0 && (
                <>
                    <h5>{t('_PREMIUM_DISTRIBUTION_LIST')}</h5>
                    <DxcTable>
                        <tr >
                            <th>{t('_PREMIUM_FUND_LABEL')}</th>
                            <th>{t('_PREMIUM_DISTRIBUTION_TYPE')}</th>
                            <th>{t('_PREMIUM_DISTRIBUTION_AMOUNT')}</th>
                        </tr>
                        {distributionList.map((row: any, i: number) => (
                            <tr key={i}>
                                <td>{row['product_component_label']}</td>
                                <td>{getDescriptionValue(row['premium_distribution_item:type'], 'premium_distribution_item:type', premiumResponse)}</td>
                                <td>{row['premium_distribution_item:amount']}</td>
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
                                <td>{getDescriptionValue(row['data']['coverage_fund:type'], 'coverage_fund:type', premiumResponse)}</td>
                                <td>{row['data']['interest_fund:s_r_r_']}</td>
                                <td>{row['data']['interest_fund:net_cash_value']}</td>
                                <td>{row['data']['contract_allocation_rate']}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
        </>
    );

}


