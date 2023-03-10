import { DxcDialog } from '@dxc-technology/halstack-react';
import PropTypes from 'prop-types'
import React from 'react'
import SearchDialog from '../SearchDialog/SearchDialog';
import { StyledButton } from 'styles/global-style';
import useDeskTickets from "data/hooks/useDeskTickets";

const AddRelatedContract = (props: any) => {
    const { addRelatedContract } = useDeskTickets();
    const { ticketId } = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const tableStats = {
        "Contract Details": 'membership:display_id',
        "Person Associated": 'person:display_id'
    }

    const selectedData = (data: any) => {
        const client = {
            id: data.summary['contract:number'],
            hRef: data.href,
            title: data.summary['contract:number'] + '/' + data.summary['contract:product_label']
        };
        addRelatedContract(ticketId, client);
        setOpenDialog(false);
    }

    return (
        <>
            <StyledButton className="border w-100" onClick={() => setOpenDialog(true)}>+</StyledButton>
            {openDialog && <DxcDialog padding="medium" isCloseVisible={true} onCloseClick={() => setOpenDialog(false)}>
                <SearchDialog selectedEntity={'contract'} getSelectedData={selectedData} dataList={tableStats} />
            </DxcDialog>}
        </>
    )
}

AddRelatedContract.propTypes = {
    ticketId: PropTypes.string
}

export default AddRelatedContract