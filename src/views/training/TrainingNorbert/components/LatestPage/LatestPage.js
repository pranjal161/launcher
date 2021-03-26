import React from 'react';
import useDeskTickets from "../../../../../data/hooks/useDeskTickets";
import {DxcButton} from "@dxc-technology/halstack-react"

const LatestPage = () => {
    const {addRelatedClients, removeRelatedClients} = useDeskTickets()
    const handleAddRelatedClient = () => {
        addRelatedClients('6OhFlgtodm43dP4wM1ez', 'toto')
    }

    const handleRemoveRelatedClient = () => {
        removeRelatedClients('6OhFlgtodm43dP4wM1ez', 'toto')
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
