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

const RelatedContract = (props: any) => {
    const { addRelatedContract } = useDeskTickets();
    const { ticketId, relatedContract } = props;
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

    const Display = () => (
        <>
            {relatedContract && relatedContract.length > 0 && Object.values(relatedContract).map((contract: any, index) => (
                <div className="row" key={index}>
                    <div className="col-5">Contract</div>
                    <div className="col-7 pl-0"><DisplayValue>{contract.title}</DisplayValue></div>
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
                <SearchDialog selectedEntity={'contract'} getSelectedData={selectedData} dataList={tableStats} />
            </DxcDialog>}
        </>
    )
}

RelatedContract.propTypes = {
    ticketId: PropTypes.string,
    onClick: PropTypes.any,
    relatedContract: PropTypes.any
}

export default RelatedContract
