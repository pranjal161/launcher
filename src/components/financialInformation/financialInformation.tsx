import React from 'react';
import { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getLink } from '../../util/functions';
import { get } from "../../util/api-caller";
import Label from '../../components/label/label';
import { ApplicationContext } from '../../context/applicationContext';
const FinancialInformation = (props: { contractResponse: any }) => {

    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const [scheduledPayment, setScheduledPayment] = React.useState< undefined| any>();
    const [billingItem, setBillingItem] = React.useState<undefined| any>();
    const [scheduledSurrender, setScheduledSurrender] = React.useState<undefined| any>();
    const [bankAccountDetails, setScheduledSurrenderBankAccountDetails] = React.useState<undefined| any>();
    const [beneficiaryPerson, setBeneficiaryPerson] = React.useState<undefined| any>();

    useEffect(() => {
        getData();
    }, [applicationContext, props.contractResponse]);

    const getData = () => {
        if (props.contractResponse) {
            const scheduledPaymentListUrl = getLink(props.contractResponse, 'contract:billing_list-scheduled_payment');
            const contractExtensionList = getLink(props.contractResponse, 'contract:extension_list');
            const scheduledSurrenderList = getLink(props.contractResponse, 'contract:billing_list-scheduled_surrender');

            get(scheduledPaymentListUrl).then(itemsList => {
                if (itemsList && itemsList['_links'] && itemsList['_links'].item) {
                    setScheduledPayment(itemsList['_links'].item[0]);
                }
            })

            get(contractExtensionList).then(response => {
                if (response && response['_links'] && response['_links'].item && response['_links'].item[0] &&
                    response['_links'].item[0].href) {
                    get(response['_links'].item[0].href).then(res => {
                        setBillingItem(res);
                    });
                }
            })

            get(scheduledSurrenderList).then(res => {
                if (res && res['_links'] && res['_links'].item) {
                    const scheduledSurrender = !Array.isArray(res['_links'].item) ? [res['_links'].item][0] : res['_links'].item[0];
                    get(scheduledSurrender.href).then(response => {
                        setScheduledSurrender(response);
                        const bankAccountLink = getLink(response, 'billing:bank_account');
                        const beneficiaryPersonLink = getLink(response, 'billing:beneficiary_person');
                        get(bankAccountLink).then((response) => {
                            setScheduledSurrenderBankAccountDetails(response);
                        });
                        get(beneficiaryPersonLink).then((res) => {
                            setBeneficiaryPerson(res);
                        });
                    });
                }
            });

        }

    }

    return (
        <>
            {scheduledPayment && (
                <>
                    <h6>
                        <Label propertyName="billing:type" label="" data={scheduledPayment} />
                    </h6>
                    <div className="col-4">
                        <Label propertyName="billing:status" label="_STATUS" data={scheduledPayment} />

                        <Label propertyName="billing:payment_type" label="_PAYMENT_MODE" data={scheduledPayment} />

                        <Label propertyName="billing:frequency" label="_PERIODICITY" data={scheduledPayment} />

                        <Label propertyName="billing:amount" label="_PRIMARY_DUE_DATE" data={scheduledPayment} />

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
                    <div className="col-4">
                        <Label propertyName="billing:status" label="_STATUS" data={billingItem} />

                        <Label propertyName="billing:payment_type" label="_PAYMENT_MODE" data={billingItem} />

                        <Label propertyName="billing:frequency" label="_PERIODICITY" data={billingItem} />

                        <Label propertyName="billing:amount" label="_PRIMARY_DUE_DATE" data={billingItem} />

                        <Label propertyName="billing:next_due_date" label="_NEXT_DUE_DATE" data={billingItem} />
                    </div>
                </>
            )}
            {scheduledSurrender && (
                <>
                    <h6>
                        <Label propertyName="billing:type" label="" data={scheduledSurrender} />
                    </h6>
                    {beneficiaryPerson && (
                        <Label propertyName="person:display_id1" label="_BENEFICIARY" data={beneficiaryPerson} />
                    )}
                    <div className="col-4">
                        <Label propertyName="billing:status" label="_STATUS" data={scheduledSurrender} />

                        <Label propertyName="billing:payment_type" label="_PAYMENT_MODE" data={scheduledSurrender} />

                        <Label propertyName="billing:frequency" label="_PERIODICITY" data={scheduledSurrender} />

                        <Label propertyName="billing:amount" label="_PRIMARY_DUE_DATE" data={scheduledSurrender} />

                        <Label propertyName="billing:next_due_date" label="_NEXT_DUE_DATE" data={scheduledSurrender} />


                        {bankAccountDetails && (
                            <Label propertyName="bank_account:i_b_a_n" label="_IBAN" data={bankAccountDetails} />
                        )}
                    </div>
                </>
            )}
        </>
    );

}

export default FinancialInformation;



