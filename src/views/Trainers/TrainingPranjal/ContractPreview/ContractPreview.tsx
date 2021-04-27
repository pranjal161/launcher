import './ContractPreview.scss';

import React, { useEffect, useState } from 'react';

import ConsultationPanels from 'components/ConsultationPanels/ConsultationPanels';
import Label from 'components/Label/Label';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { aia } from 'util/functions';

const ContractPreview = (props: any) => {
    const { contractUrl } = props;
    const [contractData, setData] = useState<undefined | any>();

    useEffect(() => {
        getData(contractUrl);
    }, [contractUrl]);

    const getData = (contractUrl: string) => {
        aia.get(contractUrl).then((contractRes) => {
            setData(contractRes.data);
        })
    }

    const Content = () => (
        <ContractDetails />
    )

    const ContractDetails = () => (
        <div className="contract-preview">
            <div>
                <Label propertyName="contract:number" label="_CONTRACT_NUMBER" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="contract:product_label" label="_PRODUCT" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="contract:status_motive" label="_STATUS_REASON" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="contract:start_date" label="_EFFECTIVE_DATE" data={contractData} type="date" width={150} />
            </div>
            <div>
                <Label propertyName="contract:renewal_date" label="_RENEWAL_DATE" data={contractData} type="date" width={150} />
            </div>
            <div>
                <Label propertyName="contract:status" label="_CONTRACT_STATUS" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="contract:product_type" label="_PRODUCT_TYPE" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="contract:currency_code" label="_CURRENCY" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="duration:value" label="_CONTRACT_DURATION" data={contractData} width={150} />
            </div>
            <div>
                <Label propertyName="contract:end_validity_date" label="_END_DATE" data={contractData} type="date" width={150} />
            </div>
        </div>
    )

    return (
        <div>
            {contractData &&
                <ConsultationPanels header={<SectionHeader title="CONTRACT DETAILS" />} content={<Content />} />
            }
            {!contractData &&
                <ConsultationPanels header={<SectionHeader title="CONTRACT DETAILS" />} content={"No Contract Selected"} />
            }
        </div>
    )

};
export default ContractPreview;
