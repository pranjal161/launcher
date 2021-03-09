import React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { get } from "../../util/api-caller";
import { DxcTable } from '@dxc-technology/halstack-react';
export const PremiumSummary = (props: { premiumSummaryHref: string }) => {

    const { t } = useTranslation();
    let distributionList: any;
    let premiumUrl: any;

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (props.premiumSummaryHref) {
            get(props.premiumSummaryHref).then(res => {
                premiumUrl = props.premiumSummaryHref;
                if (res && res['investment_split']) {
                    let investmentFundsResItems = res['investment_split'];
                    if (!Array.isArray(investmentFundsResItems)) {
                        investmentFundsResItems = [investmentFundsResItems];
                    }
                }
                distributionList = res['distribution_list'] && Array.isArray(res['distribution_list']) ? res['distribution_list'] :
                    [res['distribution_list']];
            });
        }
    }

    return (
        <>
            {premiumUrl && (
                <>
                    <h5>{t('_PREMIUM_SUMMARY')}</h5>
                    <>
                        <h6>{t('_INITIAL_PREMIUM')}</h6>
                        <DxcTable>
                            <tr>
                                <th>{t('_IDENTIFIER')}</th>
                                <th>{t('_STATUS')}</th>
                                <th>{t('_TYPE')}</th>
                                <th>{t('operation_allocation_type')}</th>
                                <th>{t('_EFFECTIVE_DATE')}</th>
                                <th>{t('_CONTRACT_OWNER')}</th>
                                <th>{t('_GROSS_AMOUNT')}</th>
                                <th>{t("_NET_AMOUNT")}</th>
                            </tr>
                            {premiumUrl.map((row: any) => (
                                <tr key={row['href']}>
                                    <td>{row['operation:identifier']}</td>
                                    <td>{row['premium:status']}</td>
                                    <td>{row['premium:type']}</td>
                                    <td>{row['operation_allocation_type']}</td>
                                    <td>{row['premium:due_date']}</td>
                                    <td>{row['person:display_id1']}</td>
                                    <td>{row['operation:amount']}</td>
                                    <td>{row['operation:net_amount']}</td>
                                </tr>
                            ))}
                        </DxcTable>
                    </>
                </>
            )}
        </>
    );

}

