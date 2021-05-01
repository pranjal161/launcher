import {AppConfig} from "config/appConfig";
import {DxcButton} from "@dxc-technology/halstack-react";
import React from 'react';
import {aia} from "util/functions";
import useDeskTickets from "data/hooks/useDeskTickets";


const AssignRelatedToTickets = (props) => {
    const {getAll, addRelatedContract} = useDeskTickets()
    const tickets = getAll()
    const initialURL = tickets && AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=PCM*&_num=' + tickets.length;


    const handleAssignedClick = () => {
        if (!initialURL)
            return
        aia.get(initialURL).then((response) => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
            }
            tickets.forEach((ticket, index) => {
                const contractResponse = response.data['_links']['item'][index]
                const contract = {
                    id: contractResponse.summary['contract:number'],
                    hRef: contractResponse.href,
                    title: contractResponse.title
                }
                addRelatedContract(ticket.id, contract)
            })
        })
    }

    return (
        <div className="row">
            <div className="col-6">
                {initialURL && <DxcButton label={"Assign contract for " + tickets.length + " tickets"}
                    onClick={handleAssignedClick}/>}
                {initialURL}
            </div>
        </div>
    )
    ;
}

export default AssignRelatedToTickets;
