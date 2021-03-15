import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../context/applicationContext";
import { DxcTable, DxcButton, DxcInput } from "@dxc-technology/halstack-react";
import { getStatusReport } from "../../util/functions";
import Alert from '../../components/alert/alert';

const UnsolicitedPayment = (props: { response: any; onClickDialog: () => void; }) => {
	const url = props.response._links.self.href;
	const applicationContext = useContext(ApplicationContext);
	const [funddata, setFundData] = useState<any>([]);
	const [amount, setOperationAmount] = useState(props.response['operation:amount']);
	const [total, setTotal] = useState(0);
	const [investmentSplitPayload, setInvestmentSplitPayload] = useState<any>([])
	const { t } = useTranslation();
	const [list, setList] = useState([]);

	useEffect(() => {

		investmentSplitData();
	}, [applicationContext, props.response]);

	const investmentSplitData = () => {
		const requestArray: any[] = [];

		let data = props.response['investment_split'];
		data.forEach((element: { [x: string]: any; }) => {
			if (element['allocation:coverage_fund']) {
				requestArray.push(axios.get(element['allocation:coverage_fund'], { headers: applicationContext.headers }));
			}
		});
		Promise.all(requestArray).then((response: any[]) => {
			response.map((res) => {
				const resHref = res.data['_links']['self'].href;
				const currentItem = data.find((item: { [x: string]: any; }) => item['allocation:coverage_fund'] === resHref);
				if (currentItem) {
					let result: any = {
						allocation_fund: currentItem['allocation:coverage_fund'],
						fund_label: res.data['coverage_fund:label'],
						value: res.data['interest_fund:net_cash_value'] ? res.data['interest_fund:net_cash_value'] : res.data['unit_linked_fund:net_cash_value'],
						distribution: currentItem['allocation:rate']
					}
					let payload = {
						'allocation:coverage_fund': currentItem['allocation:coverage_fund'],
						'allocation:rate': currentItem['allocation:rate']
					}
					investmentSplitPayload.push(payload)
					funddata.push(result);
				}
			})
			setFundData(funddata);
			setInvestmentSplitPayload(investmentSplitPayload)
			calculateTotal(investmentSplitPayload);
		})
	}

	const calculateTotal = (investmentSplitPayload: { [x: string]: number; }[]) => {
		let total = 0;
		investmentSplitPayload.forEach((element: { [x: string]: number; }) => {
			total = total + element['allocation:rate'];
		});
		setTotal(total);
	}

	const updateFunds = (change: any, data: any) => {
		if (change.target.value) {
			investmentSplitPayload.map((element: { [x: string]: any; }) => {
				if (element['allocation:coverage_fund'] === data['allocation_fund']) {
					element['allocation:rate'] = parseInt(change.target.value);
				}
			})
			funddata.map((element: { [x: string]: any; }) => {
				if (element.allocation_fund === data['allocation_fund']) {
					element.distribution = parseInt(change.target.value);
				}
			})

		}
		setFundData(funddata);
		setInvestmentSplitPayload(investmentSplitPayload)
		calculateTotal(investmentSplitPayload)
	}

	const submitData = () => {
		const payload = {
			'investment_split': investmentSplitPayload
		}
		axios.patch(url, payload, { headers: applicationContext.headers }).then((res) => {
			const status_report = getStatusReport(res);
			setList(status_report);
			if (res && res.data._embedded['cscaia:status_report'] && res.data._embedded['cscaia:status_report'].consistent) {
				if (res.data._embedded['cscaia:execute']) {
					const transferUrl = url + '/execute';
					axios.post(transferUrl, {}, { headers: applicationContext.headers }).then(res => {
						props.onClickDialog();
					})
				}
			} // show errors
		})
	}

	const updateAmount = (value: string) => {
		const payload = {
			'operation:amount': parseInt(value)
		}
		axios.patch(url, payload, { headers: applicationContext.headers }).then(() => {
			setOperationAmount(parseInt(value));
		})
	}

	return (
		<>
			{funddata.length > 0 && (
				<>
					<Alert toastList={list} />
					<div className="col-12 pb-4">
						<DxcInput
							label={t('_GROSS_AMOUNT')}
							value={amount}
							onBlur={updateAmount}
							margin="xxsmall"
						/>
					</div>
					<div className="col-12 table">
						<DxcTable>
							<tr>
								<th>{t('_FUND_LABEL')}</th>
								<th>{t('_DISTRIBUTION')} %</th>
							</tr>
							{funddata.map((data: any, i: number) => (
								<tr key={i}>
									<td>{data.fund_label}</td>
									<td><input value={data.distribution} onChange={(event) => updateFunds(event, data)} /></td>
								</tr>
							))}
							<tr>
								<td>{t('_TOTAL')}</td>
								<td className={total === 100 ? 'success' : 'error'} >{total} %</td>
							</tr>
						</DxcTable>
					</div>
					<div className="col-12">
						<DxcButton
							label={t(
								"_SUBMIT"
							)}
							onClick={() => submitData()}
							margin="xxsmall"
						/>
					</div>
				</>
			)}
		</>
	)

}
export default UnsolicitedPayment;