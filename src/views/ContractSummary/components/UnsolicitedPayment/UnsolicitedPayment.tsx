import { DxcButton, DxcTable } from "@dxc-technology/halstack-react";
import React, { useContext, useEffect, useState } from "react";

import { AlertContext } from "context/alertContext";
import { ApplicationContext } from "context/applicationContext";
import TextField from "components/TextField/TextField";
import { getStatusReport } from "util/functions";
import useAia from "data/hooks/useAia";
import { useTranslation } from "react-i18next";

const UnsolicitedPayment = (props: { url: string; onClickDialog: () => void }) => {
    const url = props.url;
    const applicationContext = useContext(ApplicationContext);
    const [fundData, setFundData] = useState<any>([]);
    // const [amount, setOperationAmount] = useState<Number>();
    const [total, setTotal] = useState(0);
    const [investmentSplitPayload, setInvestmentSplitPayload] = useState<any>([]);
    const { t } = useTranslation();
    const [unsoliciteRes, setResposne] = useState();
    const alertContext = useContext(AlertContext);
    const { fetch, post, patch } = useAia();

    useEffect(() => {
        investmentSplitData();
    }, [applicationContext, props.url]);

    const investmentSplitData = () => {
        const requestArray: any[] = [];
        post(url, {}).then((res: any) => {
            if (res && res.data) {
                setResposne(res.data)
                let data = res.data['investment_split'];
                // setOperationAmount(res.data['operation:amount']);
                data.forEach((element: { [x: string]: any }) => {
                    if (element['allocation:coverage_fund']) {
                        requestArray.push(
                            fetch(element['allocation:coverage_fund']),
                        );
                    }
                });

                Promise.all(requestArray).then((response: any[]) => {
                    response.forEach((res) => { // Use forEach instead of map (no extra memory used)
                        const resHref = res.data['_links']['self'].href;
                        const currentItem = data.find(
                            (item: { [x: string]: any }) => item['allocation:coverage_fund'] === resHref,
                        );

                        if (currentItem) {
                            let result: any = {
                                allocation_fund: currentItem['allocation:coverage_fund'],
                                fund_label: res.data['coverage_fund:label'],
                                value: res.data['interest_fund:net_cash_value']
                                    ? res.data['interest_fund:net_cash_value']
                                    : res.data['unit_linked_fund:net_cash_value'],
                                distribution: currentItem['allocation:rate'],
                            };

                            let payload = {
                                'allocation:coverage_fund': currentItem['allocation:coverage_fund'],
                                'allocation:rate': currentItem['allocation:rate'],
                            };

                            investmentSplitPayload.push(payload);
                            fundData.push(result);
                        }
                    });

                    setFundData(fundData);
                    setInvestmentSplitPayload(investmentSplitPayload);
                    calculateTotal(investmentSplitPayload);
                });
            }
        });

    };

    const calculateTotal = (investmentSplitPayload: { [x: string]: number }[]) => {
        let total = 0;

        investmentSplitPayload.forEach((element: { [x: string]: number }) => {
            total = total + element['allocation:rate'];
        });

        setTotal(total);
    };

    const updateFunds = (change: any, data: any) => {
        if (change.target.value) {
            investmentSplitPayload.forEach((element: { [x: string]: any }) => { // Use forEach instead of map (no extra memory used)
                if (element['allocation:coverage_fund'] === data['allocation_fund']) {
                    element['allocation:rate'] = parseInt(change.target.value);
                }
            });

            fundData.forEach((element: { [x: string]: any }) => { // Use forEach instead of map (no extra memory used)
                if (element.allocation_fund === data['allocation_fund']) {
                    element.distribution = parseInt(change.target.value);
                }
            });
        }

        setFundData(fundData);
        setInvestmentSplitPayload(investmentSplitPayload);
        calculateTotal(investmentSplitPayload);
    };

    const submitData = () => {
        const payload = {
            investment_split: investmentSplitPayload,
        };

        patch(url, payload).then((res: any) => {
            const status_report = getStatusReport(res);
            alertContext.setToastList(status_report);
            
            if (
                res &&
                res.data._embedded['cscaia:status_report'] &&
                res.data._embedded['cscaia:status_report'].consistent
            ) {
                if (res.data._embedded['cscaia:execute']) {
                    const transferUrl = url + '/execute';

                    post(transferUrl, {}).then(() => {
                        props.onClickDialog();
                    });
                }
            } // show errors
        });
    };

    const updateAmount = (value: string) => {
        const payload = {
            'operation:amount': parseInt(value),
        };
        patch(url, payload).then(() => {
            // setOperationAmount(parseInt(value));
        });
    };

    return (
        <>
            {fundData.length > 0 && (
                <>
                    <div className="col-4 pb-4">
                        <TextField
                            data={unsoliciteRes}
                            onBlurMethod={updateAmount}
                            type="number"
                            propertyName={'operation:amount'} />
                    </div>
                    <div className="col-12 table">
                        <DxcTable>
                            <tr>
                                <th>{t('_FUND_LABEL')}</th>
                                <th>{t('_DISTRIBUTION')} %</th>
                            </tr>
                            {fundData.map((data: any, i: number) => (
                                <tr key={i}>
                                    <td>{data.fund_label}</td>
                                    <td>
                                        <input
                                            value={data.distribution}
                                            onChange={(event) => updateFunds(event, data)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>{t('_TOTAL')}</td>
                                <td className={total === 100 ? 'success' : 'error'}>{total} %</td>
                            </tr>
                        </DxcTable>
                    </div>
                    <div className="col-12">
                        <DxcButton label={t('_SUBMIT')} onClick={() => submitData()} margin="xxsmall" />
                    </div>
                </>
            )}
        </>
    );
};
export default UnsolicitedPayment;
