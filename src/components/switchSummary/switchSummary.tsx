import React from 'react';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
import Label from '../../components/label/label';
import { ApplicationContext } from '../../context/applicationContext';
import { AppConfig } from '../../config/appConfig';
import axios from 'axios';
export const SwitchSummary = (props: { switchSummaryHref: string }) => {

    const { t } = useTranslation();
    const [disinvestmentSplitList, setDisinvestmentSplitList] = React.useState([]);
    const [switchResponse, setSwitchResponse] = React.useState([]);
    const [savingsFlowList, setSavingsFlowListItems] = React.useState([]);
    const applicationContext = useContext(ApplicationContext);
    const config = AppConfig;

    useEffect(() => {
        getData();
    }, [applicationContext]);

    const getData = () => {
        axios.get(props.switchSummaryHref, { headers: config.headers }).then((res: any) => {
            setSwitchResponse(res.data);
            const disinvestmentSplitListItems: any = res.data && res.data['disinvestment_split'] && Array.isArray(res.data['disinvestment_split']) ? res.data['disinvestment_split'] :
                [res['disinvestment_split']];
            setDisinvestmentSplitList(disinvestmentSplitListItems);

            const savingsFlowListHref = res.data['_links'] && res.data['_links']['operation:savings_flow_list'] ? res.data['_links']['operation:savings_flow_list'].href : '';
            axios.get(savingsFlowListHref, {headers: applicationContext.headers}).then(response => {
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
            <h5>{t('_SWITCH_SUMMARY')}</h5>
            {switchResponse && (
                <>
                    <h6>{t('_INITIAL_PREMIUM')}</h6>
                    <div className="col-4">
                        <Label propertyName="operation:identifier" label="_IDENTIFIER" data={switchResponse} />

                        <Label propertyName="switch:status" label="_STATUS" data={switchResponse} />

                        <Label propertyName="switch:type_label" label="_TYPE" data={switchResponse} />

                        <Label propertyName="operation:value_date" label="_EFFECTIVE_DATE" data={switchResponse} />

                        <Label propertyName="operation:amount" label="_GROSS_AMOUNT" data={switchResponse} />
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
                                <td>{row['allocation:amount']}</td>
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
                                <td>{row['summary']['savings_flow:investment_date']}</td>
                                <td>{row['summary']['savings_flow:amount']}</td>
                            </tr>
                        ))}
                    </DxcTable>
                </>
            )}
        </>
    );

}



