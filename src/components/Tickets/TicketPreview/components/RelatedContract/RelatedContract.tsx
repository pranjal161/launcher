import { DxcDialog } from '@dxc-technology/halstack-react';
import PropTypes from 'prop-types'
import React from 'react'
import SearchDialog from '../SearchDialog/SearchDialog';
import { StyledButton } from 'styles/global-style';
import useDeskTickets from "data/hooks/useDeskTickets";

const RelatedContract = (props: any) => {
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
            title: data.title
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

RelatedContract.propTypes = {
    ticketId: PropTypes.string
}

export default RelatedContract