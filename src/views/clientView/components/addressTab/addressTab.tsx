import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "context/applicationContext";
import Table from "components/table/table";
import { getLink } from 'util/functions';

const AddressTab = (props: { clientData: Array<Object>; }) => {
    const { clientData } = props;
    const [clientAddressData, setClientAddressData] = useState([]);
    const { t } = useTranslation();
    const applicationContext = useContext(ApplicationContext);
    const postalAddressColumn = [
        { label: 'ID', property: 'postal_address:display_id' }
    ];
    const bankAccountColumns = [
        { label: '_NAME', property: 'bank_account:bank_name' },
        { label: '_IBAN', property: 'bank_account:i_b_a_n' }
    ];
    const phoneAddressColumns = [
        { label: '_PHONE_NUMBER', property: 'phone_address:phone_number' },
        { label: '_CONTACT_TYPE', property: 'phone_address:phone_type_label' }
    ];
    const emailAddressColumns = [
        { label: '_EMAIL', property: 'e_mail_address:text' },
        { label: '_CONTACT_TYPE', property: 'e_mail_address:type' },
        { label: '_PREFERRED', property: 'e_mail_address:preferred' }
    ];

    useEffect(() => {
        populateAddressData(clientData);
    }, [applicationContext]);

    const populateAddressData = (data: any) => {
        const addressList: any = [];
        addressList.push({url: getLink(data, 'person:postal_address_list') ? getLink(data, 'person:postal_address_list') : getLink(data, 'organization:postal_address_list'), id: 'postal-address'});
        addressList.push({url: getLink(data, 'person:bank_account_list') ? getLink(data, 'person:bank_account_list') : getLink(data, 'organization:bank_account_list'), id: 'bank-account'});
        addressList.push({url: getLink(data, 'person:phone_address_list') ? getLink(data, 'person:phone_address_list') : getLink(data, 'organization:phone_address_list'), id: 'telecom-address'});
        addressList.push({url: getLink(data, 'person:e_mail_address_list') ? getLink(data, 'person:e_mail_address_list') : getLink(data, 'organization:e_mail_address_list'), id: 'electronic-address'});
        setClientAddressData(addressList);
    }

    const renderTable = (heading: string, columns: Array<Object>, id: string) => {
        const index = clientAddressData.findIndex((x: any) => x['id'] === id);
        const url = clientAddressData && clientAddressData[index] && clientAddressData[index]['url'];

        return (
            <>
                {url && 
                    <div className="row">
                        <div className="col-12">
                            <h5 className="pl-5">{t(heading)}</h5>
                            <Table url={url} columnId={columns} showPaginator = {true}/>
                        </div>
                    </div>
                }
            </>
        );
    };

    return (
        <>
            <section className="pt-3">
                <div className="pb-4">
                    {renderTable('_POSTAL_ADDRESS', postalAddressColumn, 'postal-address')}
                </div>
                <div className="pb-4">
                    {renderTable('_BANK_ACCOUNTS', bankAccountColumns, 'bank-account')}
                </div>
                <div className="pb-4">
                    {renderTable('_PHONE_ADDRESS', phoneAddressColumns, 'telecom-address')}
                </div>
                <div className="pb-4">
                    {renderTable('_EMAIL_ADDRESS', emailAddressColumns, 'electronic-address')}
                </div>
            </section>
        </>
    )
}
export default AddressTab;