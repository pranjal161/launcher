import { DxcSelect } from "@dxc-technology/halstack-react";
import React from 'react';

const StatusSelection = (props: any) => {

    const usersOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'done', label: 'Done' },
        { value: 'error', label: 'Error' },
        { value: 'created', label: 'Created' }
    ]

    return (
        <DxcSelect
            options={usersOptions}
            {...props}
        />
    );
}

export default StatusSelection;
