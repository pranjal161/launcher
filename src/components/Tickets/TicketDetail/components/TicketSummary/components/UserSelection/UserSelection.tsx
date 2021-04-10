import {DxcSelect} from "@dxc-technology/halstack-react";
import React from 'react';
import useDeskUsers from "data/hooks/useDeskUsers";


const UserSelection = (props:any) => {
    const { getAll } = useDeskUsers()
    const allUsers = getAll()
    const usersOptions = allUsers && allUsers.map((user: { id: any; displayName: any; }) => (
        { value: user.id, label: user.displayName }
    ))
    return (
        <DxcSelect
            options={usersOptions}
            {...props}
        ></DxcSelect>
    );
}

export default UserSelection;
