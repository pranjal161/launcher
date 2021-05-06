import { DxcDialog } from '@dxc-technology/halstack-react';
import PropTypes from 'prop-types'
import React from 'react'
import SearchDialog from '../SearchDialog/SearchDialog';
import { StyledButton } from 'styles/global-style';
import useDeskTickets from "data/hooks/useDeskTickets";

const AddRelatedClient = (props: any) => {
    const { addRelatedClients } = useDeskTickets();
    const { ticketId } = props;
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

    return (
        <>
            <StyledButton className="border w-100" onClick={() => setOpenDialog(true)}>+</StyledButton>
            {openDialog && <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={() => setOpenDialog(false)}>
                <SearchDialog selectedEntity={'person'} getSelectedData={selectedData} dataList={tableStats} />
            </DxcDialog>}
        </>
    )
}

AddRelatedClient.propTypes = {
    ticketId: PropTypes.string
}

export default AddRelatedClient
