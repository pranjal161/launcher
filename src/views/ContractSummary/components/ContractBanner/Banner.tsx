import React, { useState } from 'react';

import ContractStates from './ContractStates/ContractStates';
import { DxcSelect } from '@dxc-technology/halstack-react';
import Label from 'components/Label/Label';
import { PersonIcon } from 'assets/svg';
import { StyledBanner } from 'styles/global-style';
import { useTranslation } from 'react-i18next';

const Banner = (props: any) => {

    const { owner, contractData, stateUrl, onActionChange, onHistoryChange } = props;
    const { t } = useTranslation();
    const [action, changeAction] = useState('');

    const actionOptions = [
        {
            value: 'claim',
            label: t('_DECLARE_CLAIM'),
        },
        {
            value: 'contract',
            label: t('_AMENDMENT'),
        },
        {
            value: 'unsolicitedPayment',
            label: t('_UNSOLICITED_PAYMENT'),
        },
    ];
    
    const onSelectOperation = (newValue: string) => {
        changeAction(newValue);
        onActionChange(newValue)
    };

    return (
        <>
            <StyledBanner>
                <div className="row">
                    <div className="col-2 align-center">
                        <PersonIcon />
                        {owner}
                    </div>
                    <div className="col-4">
                        <div className="col-12">
                            <Label propertyName="contract:number" label="_CONTRACT_NUMBER" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:product_label" label="_PRODUCT" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:status_motive" label="_STATUS_REASON" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:start_date" label="_EFFECTIVE_DATE" data={contractData} type="date" />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:renewal_date" label="_RENEWAL_DATE" data={contractData} type="date" />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="col-12">
                            <Label propertyName="contract:status" label="_CONTRACT_STATUS" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:product_type" label="_PRODUCT_TYPE" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:currency_code" label="_CURRENCY" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="duration:value" label="_CONTRACT_DURATION" data={contractData} />
                        </div>
                        <div className="col-12">
                            <Label propertyName="contract:end_validity_date" label="_END_DATE" data={contractData} type="date" />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="select-box">
                            <DxcSelect
                                options={actionOptions}
                                onChange={onSelectOperation}
                                label={t('_ACTIONS')}
                                value={action}
                            ></DxcSelect>
                        </div>
                        <div className="select-box">
                            {stateUrl &&
                                < ContractStates stateUrl={stateUrl} onHistoryChange={onHistoryChange} />
                            }
                        </div>
                    </div>
                </div>
            </StyledBanner>
        </>
    )
}

export default Banner