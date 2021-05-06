import { DxcDialog } from '@dxc-technology/halstack-react';
import LinkedClient from 'components/Tickets/TicketPreview/components/LinkedClient/LinkedClient';
import PropTypes from 'prop-types'
import React from 'react'
import SearchDialog from '../SearchDialog/SearchDialog';
import { StyledButton } from 'styles/global-style';
import styled from "styled-components";
import useDeskTickets from "data/hooks/useDeskTickets";

const DisplayValue = styled.h6`
    font-size: 14px;
    color: #243b53;
`;

const RelatedClient = (props: any) => {
    const { addRelatedClients } = useDeskTickets();
    const { ticketId, relatedClient } = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const tableStats = {
        "Person Details": 'person:display_id',
        "Birthdate": 'person:birth_date'
    }

    const selectedData = (data: any) => {
        const client = {
            id: data.summary['person:client_number'],
            hRef: data.href,
            title: data.title
        };
        addRelatedClients(ticketId, client);
        setOpenDialog(false);
    }

    const Display = () => (
        <>
            {relatedClient && relatedClient.length > 0 && Object.values(relatedClient).map((client: any, index) => (
                <div className="row" key={index}>
                    <div className="col-5">Client</div>
                    <div className="col-7 pl-0"><DisplayValue>{client.title}</DisplayValue></div>
                </div>)
            )}
        </>
    )

    return (
        <>
            <ul className={"list-group"} >
                <LinkedClient display={<Display />} />
                <StyledButton className="border" onClick={() => setOpenDialog(true)}>+</StyledButton>
            </ul>
            {openDialog && <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={() => setOpenDialog(false)}>
                <SearchDialog selectedEntity={'person'} getSelectedData={selectedData} dataList={tableStats} />
            </DxcDialog>}
        </>
    )
}

RelatedClient.propTypes = {
    ticketId: PropTypes.string,
    onClick: PropTypes.any,
    relatedClient: PropTypes.any
}

export default RelatedClient
