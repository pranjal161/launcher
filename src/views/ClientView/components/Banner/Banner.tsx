import {StyledBanner} from "styles/global-style";
import {CallIcon, CreditCardIcon, EmailIcon, HomeIcon, LanguageIcon, PersonIcon} from "assets/svg";
import Label from "components/Label/Label";
import React, {useContext, useEffect} from "react";
import useActivity from "hooks/useActivity";
import {useSelector} from "react-redux";
import baContext from "context/baContext";


const Banner = (props: { url: string }) => {
    const {fetch} = useActivity()
    const context: any = useContext(baContext)
    const response = useSelector((state: any) => state.aia.ba[context.baId] && state.aia.ba[context.baId][props.url])
    const clientData = response && response.data
    useEffect(() => {
        fetch(props.url, 'get')
    }, [props.url])


    const getClientData = (params:any) => (<div>ERTYU</div>)
    /*
    const getClientData = (id: string) => {
        const index = clientDetailData.findIndex((x: any) => x['id'] === id);
        return clientDetailData && clientDetailData[index] && clientDetailData[index]['data'];
    };

    const postalAddress = getClientData('postal-address');
    */

    return (
        <StyledBanner>
            <div className="row">
                <div className="col-2 align-center">
                    <PersonIcon/>
                    <div className="col-12 pt-2">
                        {clientData && clientData['person:client_number'] && (
                            <Label propertyName="person:display_id1" data={clientData}></Label>
                        )}
                        {clientData && clientData['organization:client_number'] && (
                            <Label propertyName="organization:display_id1" data={clientData}></Label>
                        )}
                    </div>
                </div>
                <div className="col-4">
                    {clientData && clientData['person:client_number'] && (
                        <>
                            <div className="col-12 pt-1">
                                <Label
                                    propertyName="person:client_number"
                                    label="_CLIENT_NUMBER"
                                    data={clientData}
                                ></Label>
                            </div>
                            <div className="col-12 pt-1">
                                <Label
                                    propertyName="person:professional_status"
                                    label="_PROF_STATUS"
                                    data={clientData}
                                ></Label>
                            </div>
                            <div className="col-12 pt-1">
                                <Label
                                    propertyName="person:birth_date"
                                    label="_DATE_OF_BIRTH"
                                    data={clientData}
                                ></Label>
                            </div>
                            <div className="col-12 pt-1">
                                <Label propertyName="person:age" label="_AGE" data={clientData}></Label>
                            </div>
                            <div className="col-12 pt-1">
                                <Label
                                    propertyName="person:marital_status"
                                    label="_MARITAL_STATUS"
                                    data={clientData}
                                ></Label>
                            </div>
                        </>
                    )}
                    {clientData && clientData['organization:client_number'] && (
                        <Label
                            propertyName="organization:client_number"
                            label="_CLIENT_NUMBER"
                            data={clientData}
                        ></Label>
                    )}
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-2 icon">
                            <CallIcon/>
                        </div>
                        <div className="col-10">
                            <Label
                                propertyName="phone_address:phone_number"
                                data={getClientData('telecom-address')}
                            ></Label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2 icon">
                            <HomeIcon/>
                        </div>
                        <div className="col-10">
                            <label>{postalAddress ? postalAddress['_links']['self']['title'] : ''}</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2 icon">
                            <EmailIcon/>
                        </div>
                        <div className="col-10">
                            <Label
                                propertyName="e_mail_address:text"
                                data={getClientData('electronic-address')}
                            ></Label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 icon">
                            <CreditCardIcon/>
                        </div>
                        <div className="col-10">
                            <Label propertyName="bank_account:i_b_a_n" data={getClientData('bank-account')}></Label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 icon">
                            <LanguageIcon/>
                        </div>
                        <div className="col-10">
                            <Label propertyName="person:language" data={clientData}></Label>
                            <Label propertyName="organization:language" data={clientData}></Label>
                        </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </StyledBanner>
    );
};

export default Banner
