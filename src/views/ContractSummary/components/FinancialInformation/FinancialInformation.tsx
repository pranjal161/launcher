import React, { useContext, useEffect } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import { Axios } from 'data/hooks/useLoader';
import Label from "components/Label/Label";
import { getLink } from 'util/functions';
import useAia from 'data/hooks/useAia';

//import { useTranslation } from 'react-i18next';

const FinancialInformation = (props: { contractResponse: any }) => {
    //const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [scheduledPayment, setScheduledPayment] = React.useState<undefined | any>();
    const [billingItem, setBillingItem] = React.useState<undefined | any>();
    const [scheduledSurrender, setScheduledSurrender] = React.useState<undefined | any>();
    const [bankAccountDetails, setScheduledSurrenderBankAccountDetails] = React.useState<undefined | any>();
    const [beneficiaryPerson, setBeneficiaryPerson] = React.useState<undefined | any>();
    const [billingList, setBillingList] = React.useState<undefined | any>();
    const { fetch } = useAia();

    useEffect(() => {
        getData();
    }, [applicationContext, props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            const scheduledPaymentListUrl = getLink(props.contractResponse, 'contract:billing_list-scheduled_payment');
            const contractExtensionList = getLink(props.contractResponse, 'contract:extension_list');
            const scheduledSurrenderList = getLink(props.contractResponse, 'contract:billing_list-scheduled_surrender');
            const billingListItem = getLink(props.contractResponse, 'contract:billing_list');

            // to add 'contract:billing_list'
            // need to check how to split this component
            fetch(scheduledPaymentListUrl).then((itemsList:any) => {
                if (itemsList && itemsList.data['_links'] && itemsList.data['_links'].item) {
                    setScheduledPayment(itemsList.data['_links'].item[0]);
                }
            });

            fetch(contractExtensionList).then((response: any) => {
                if (
                    response &&
                    response.data['_links'] &&
                    response.data['_links'].item &&
                    response.data['_links'].item[0] &&
                    response.data['_links'].item[0].href
                ) {
                    fetch(response.data['_links'].item[0].href)
                        .then((res:any) => {
                            setBillingItem(res.data);
                        });
                }
            });

            fetch(scheduledSurrenderList).then((res:any) => {
                if (res && res.data['_links'] && res.data['_links'].item) {
                    const scheduledSurrender = !Array.isArray(res.data['_links'].item)
                        ? [res.data['_links'].item][0]
                        : res.data['_links'].item[0];
                    fetch(scheduledSurrender.href).then((response:any) => {
                        setScheduledSurrender(response.data);
                        const bankAccountLink = getLink(response.data, 'billing:bank_account');
                        const beneficiaryPersonLink = getLink(response.data, 'billing:beneficiary_person');
                        fetch(bankAccountLink).then((response:any) => {
                            setScheduledSurrenderBankAccountDetails(response.data);
                        });
                        fetch(beneficiaryPersonLink).then((res:any) => {
                            setBeneficiaryPerson(res.data);
                        });
                    });
                }
            });

            Axios.get(billingListItem, { headers: applicationContext.headers }).then((response) => {
                if (
                    response &&
                    response.data &&
                    response.data['_links'] &&
                    response.data['_links'].item &&
                    response.data['_links'].item[0] &&
                    response.data['_links'].item[0].href
                ) {
                    Axios
                        .get(response.data['_links'].item[0].href, { headers: applicationContext.headers })
                        .then((res) => {
                            setBillingList(res.data);
                        });
                } else if (response && response.data && response.data['_links'] && response.data['_links'].item) {
                    Axios
                        .get(response.data['_links'].item.href, { headers: applicationContext.headers })
                        .then((res) => {
                            setBillingList(res.data);
                        });
                }
            });
        }
    };

    return (
        <>
            {scheduledPayment && (
                <>
                    <h6>
                        <div>
                            <Label propertyName="billing:type" label="" data={scheduledPayment} />
                        </div>
                    </h6>
                    <div>
                        <Label propertyName="billing:status" label="_STATUS" data={scheduledPayment} />

                        <Label propertyName="billing:payment_type" label="_PAYMENT_MODE" data={scheduledPayment} />

                        <Label propertyName="billing:frequency" label="_PERIODICITY" data={scheduledPayment} />

                        <Label propertyName="billing:amount" label="_AMOUNT" data={scheduledPayment} />

                        <Label propertyName="billing:next_due_date" label="_NEXT_DUE_DATE" data={scheduledPayment} />

                        <Label propertyName="billing:indexation_enabled" label="_INDEXATION" data={scheduledPayment} />
                    </div>
                </>
            )}
            {billingItem && (
                <>
                    <h6>
                        <Label propertyName="billing:type" label="" data={billingItem} />
                    </h6>
                    <div>
                        <Label propertyName="billing:status" label="_STATUS" data={billingItem} />

                        <Label propertyName="billing:payment_type" label="_PAYMENT_MODE" data={billingItem} />

                        <Label propertyName="billing:frequency" label="_PERIODICITY" data={billingItem} />

                        <Label propertyName="billing:amount" label="_AMOUNT" data={billingItem} />

                        <Label propertyName="billing:next_due_date" label="_NEXT_DUE_DATE" data={billingItem} />
                    </div>
                </>
            )}
            {scheduledSurrender && (
                <>
                    <h6>
                        <Label propertyName="billing:type" label="" data={scheduledSurrender} />
                    </h6>
                    <div className="row col-12">
                        {beneficiaryPerson && (
                            <div className="col-4">
                                <Label
                                    propertyName="person:display_id1"
                                    label="_BENEFICIARY"
                                    data={beneficiaryPerson}
                                />
                            </div>
                        )}
                        <div className="col-4">
                            <Label propertyName="billing:status" label="_STATUS" data={scheduledSurrender} />
                        </div>
                        <div className="col-4">
                            <Label
                                propertyName="billing:payment_type"
                                label="_PAYMENT_MODE"
                                data={scheduledSurrender}
                            />
                        </div>
                        <div className="col-4">
                            <Label propertyName="billing:frequency" label="_PERIODICITY" data={scheduledSurrender} />
                        </div>
                        <div className="col-4">
                            <Label
                                propertyName="billing:amount"
                                label="_AMOUNT"
                                data={scheduledSurrender}
                                type="currency"
                            />
                        </div>
                        {bankAccountDetails && (
                            <div className="col-4">
                                <Label propertyName="bank_account:i_b_a_n" label="_IBAN" data={bankAccountDetails} />
                            </div>
                        )}
                        <div className="col-4">
                            <Label
                                propertyName="billing:next_due_date"
                                label="_NEXT_DUE_DATE"
                                data={scheduledSurrender}
                                type="date"
                            />
                        </div>
                    </div>
                </>
            )}
            {billingList && (
                <>
                    <h6>
                        <Label propertyName="billing:type" label="" data={billingList} />
                    </h6>
                    <div className="row col-12">
                        <div className="col-6">
                            <Label propertyName="billing:payment_type" label="_PAYMENT_MODE" data={billingList} />
                        </div>
                        <div className="col-6">
                            <Label propertyName="billing:frequency" label="_PERIODICITY" data={billingList} />
                        </div>
                        <div className="col-6">
                            <Label
                                propertyName="billing:next_due_date"
                                label="_NEXT_DUE_DATE"
                                data={billingList}
                                type="date"
                            />
                        </div>
                        <div className="col-6">
                            <Label propertyName="billing:main_due_day" label="_PRIMARY_DUE_DATE" data={billingList} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FinancialInformation;
