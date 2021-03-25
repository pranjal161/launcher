import React from 'react';
import useDeskTickets from "../../../../../data/hooks/useDeskTickets";
import {DxcButton} from "@dxc-technology/halstack-react"

const LatestPage = (props) => {
    const {addRelatedClients, removeRelatedClients} = useDeskTickets()
    const handleAddRelatedClient = () => {
        addRelatedClients('cFJCLyR9Al3EB1iZYdfP', 'titi')
    }

    const handleRemoveRelatedClient = () => {
        removeRelatedClients('cFJCLyR9Al3EB1iZYdfP', 'toto')
    }

    return (
        <div>
            <DxcButton
                mode="primary"
                label="Add related client"
                onClick={handleAddRelatedClient}
                margin="medium"
            />
            <DxcButton
                mode="primary"
                label="Remove related client"
                onClick={handleRemoveRelatedClient}
                margin="medium"
            />
        </div>
    );
}

export default LatestPage;
